import { useEffect, useState } from "react";

export default function Home() {
  const [text, setText] = useState("");
  const [data, setData] = useState(null);

  useEffect(() => {
    const init = async () => {
      const { ScrollSpy, initTE } = await import("tw-elements");
      initTE({ ScrollSpy });
    };
    init();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        "https://qhxlujzmsf.execute-api.us-east-1.amazonaws.com/dev/sentiment-analysis",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: text,
          }),
        }
      );

      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  // <pre>{JSON.stringify(data, null, 2)}</pre>
  /*
{data.sintax.SyntaxTokens.map((token, index)=>(
            
          ))}
*/

  return (
    <>
      <h1 className="text-5xl text-center text-white font-bold">
        TEXT ANALYZER
      </h1>
      <div className="flex justify-center mt-4">
        <form onSubmit={handleSubmit} className="flex flex-col content-center">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows="7"
            cols="80"
            className="bg-indigo-600 rounded text-white p-4 text-lg border border-yellow-600"
          ></textarea>
          <button
            type="submit"
            className="mt-4 text-stone-400 hover:text-stone-950 border border-stone-400 hover:bg-stone-400 focus:ring-4 focus:outline-none focus:ring-stone-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 w-fit"
          >
            Submit
          </button>
        </form>
      </div>
      {data && (
        <>
          <div className="grid grid-cols-3 justify-items-center gap-4">
            <div className="block max-w-[18rem] rounded-lg bg-primary shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] text-center">
              <div className="border-b-2 border-[#0000002d] px-6 py-3 text-white dark:text-neutral-50">
                Language
              </div>
              <div className="p-6">
                <h5 className="mb-2 text-xl font-medium leading-tight text-white dark:text-neutral-50">
                  {data.language.Languages[0].LanguageCode}
                </h5>
              </div>
            </div>
            <div className="block max-w-[18rem] rounded-lg bg-primary shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] text-center">
              <div className="border-b-2 border-[#0000002d] px-6 py-3 text-white dark:text-neutral-50">
                Sentiment
              </div>
              <div className="p-6">
                <h5 className="mb-2 text-xl font-medium leading-tight text-white dark:text-neutral-50">
                  {data.result.Sentiment}
                </h5>
              </div>
            </div>
            <div className="block max-w-[18rem] rounded-lg bg-primary shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] text-center">
              <div className="border-b-2 border-[#0000002d] px-6 py-3 text-white dark:text-neutral-50">
                Sentiment Status
              </div>
              <div className="p-6">
                <ul>
                  <li>Mixed: {data.result.SentimentScore.Mixed.toFixed(2)}</li>
                  <li>
                    Negative: {data.result.SentimentScore.Negative.toFixed(2)}
                  </li>
                  <li>
                    Neutral: {data.result.SentimentScore.Neutral.toFixed(2)}
                  </li>
                  <li>
                    Positive: {data.result.SentimentScore.Positive.toFixed(2)}
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div
            data-te-spy="scroll"
            data-te-target="#scrollspy1"
            data-te-offset="200"
            className="relative h-[38rem]  overflow-auto"
          >
            <table className="min-w-full text-center text-sm font-light mt-4">
              <thead className="border-b bg-neutral-50 font-medium dark:border-neutral-500 dark:text-neutral-800 ">
                <tr>
                  <th scope="col" className=" px-6 py-4">
                    #
                  </th>
                  <th scope="col" className=" px-6 py-4">
                    Word
                  </th>
                  <th scope="col" className=" px-6 py-4">
                    Tag
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.sintax.SyntaxTokens.map((token, index) => (
                  <tr
                    className="border-b dark:border-neutral-500 text-white"
                    key={index}
                  >
                    <td className="whitespace-nowrap  px-6 py-4 font-medium">
                      {index}
                    </td>
                    <td className="whitespace-nowrap  px-6 py-4">
                      {token.Text}
                    </td>
                    <td className="whitespace-nowrap  px-6 py-4">
                      {token.PartOfSpeech.Tag}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-center gap-8">
            {data.keyPhrases.KeyPhrases.length > 0 && (
              <>
                <div>
                  <h1 className="text-3xl text-indigo-600 mt-8 font-semibold">
                    key Phrases:
                  </h1>
                  <ul class="w-48 text-sm font-medium text-gray-900 bg-indigo-800 border border-gray-200 rounded-lg mt-4">
                    {data.keyPhrases.KeyPhrases.map((keyPrahs, index) => (
                      <li
                        className="w-full px-4 py-2 border text-white  border-gray-200 "
                        key={index}
                      >
                        {keyPrahs.Text}
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}
            {data.response.Entities.length > 0 && (
              <>
                <div>
                  <h1 className="text-3xl text-indigo-600 mt-8 font-semibold">
                    Entities:
                  </h1>
                  <ul className="w-48 text-sm font-medium text-gray-900 bg-indigo-800 border border-gray-200 rounded-lg mt-4">
                    {data.response.Entities.map((entiti, index) => (
                      <li
                        className="w-full px-4 py-2 border text-white  border-gray-200 "
                        key={index}
                      >
                        {entiti.Text} = {entiti.Type}
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </>
  );
}
