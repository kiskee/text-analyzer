"use strict";
//import { ComprehendClient, DetectSentimentCommand } from "@aws-sdk/client-comprehend"
const {
  ComprehendClient,
  DetectSentimentCommand,
  DetectEntitiesCommand,
  DetectDominantLanguageCommand,
  DetectSyntaxCommand,
  DetectKeyPhrasesCommand
} = require("@aws-sdk/client-comprehend");
//const ComprehendClient = require("aws-sdk/client-comprehend");
//const DetectSentimentCommand = require("aws-sdk/client-comprehend");

const comprehendClient = new ComprehendClient({ region: "us-east-1" });

module.exports.sentimentAnalysis = async (event) => {
  try {
    const body = JSON.parse(event.body);

    const { text } = body;
    console.log(text, "en el body");

    if (!text) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: "body requires a fiel 'text' to be valid",
        }),
      };
    }

    const response = await analyseSentiment(text);

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify(response),
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify(
        {
          message: e.message,
        },
        null,
        2
      ),
    };
  }
};

const analyseSentiment = async (text) => {
  // Detect language
  const inputLanguage = {
    Text: text,
  };
  const commandLanguage = new DetectDominantLanguageCommand(inputLanguage);
  const language = await comprehendClient.send(commandLanguage);

  // Set the actual Language
  const acutalLanguage = language.Languages[0].LanguageCode;

  // Dectec sentiment
  const params = {
    LanguageCode: acutalLanguage,
    Text: text,
  };

  const command = new DetectSentimentCommand(params);
  const result = await comprehendClient.send(command);

  // Detec Entities
  const input = {
    Text: text,
    LanguageCode: acutalLanguage,
    DocumentReaderConfig: {
      DocumentReadAction: "TEXTRACT_DETECT_DOCUMENT_TEXT",
      DocumentReadMode: "SERVICE_DEFAULT",
    },
  };
  const commandEntities = new DetectEntitiesCommand(input);
  const response = await comprehendClient.send(commandEntities);

  // Detect Sintax
  const inputSintax = {
    Text: text,
    LanguageCode: acutalLanguage,
  };
  const commandSintax = new DetectSyntaxCommand(inputSintax);
  const sintax = await comprehendClient.send(commandSintax);

  // Detect keyPhrases
  const inputkeyPhrases = {
    Text: text,
    LanguageCode: acutalLanguage,
  };
  const commandkeyPhrases = new DetectKeyPhrasesCommand(inputkeyPhrases);
  const keyPhrases = await comprehendClient.send(commandkeyPhrases);

  return {
    textAnalyzed: text,
    result,
    response,
    language,
    sintax,
    keyPhrases,
  };
};
