import { useEffect, useState } from "react";

export default function Home() {
  const [text, setText] = useState("");
  const [data, setData] = useState(null);
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

  return (
    <>
      <h1 className="text-5xl text-center text-black">TEXT ANALYZER</h1>
      <div className="flex justify-center mt-4">
        <form onSubmit={handleSubmit} className="flex-col">
          <label>
            Introduce un texto:
           
           
          </label>
          <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows="4"
              cols="50"
            ></textarea>
          
          <button type="submit">Enviar</button>
        </form>
      </div>
      {data && (
        <>
        <pre>
          {JSON.stringify(data, null, 2)}
        </pre>
        </>
      )}
    </>
  );
}
