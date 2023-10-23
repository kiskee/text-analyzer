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
      <h1 className="text-5xl text-center text-white font-bold">TEXT ANALYZER</h1>
      <div className="flex justify-center mt-4">
        <form onSubmit={handleSubmit} className="flex flex-col content-center">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows="7"
            cols="80"
            className="bg-stone-600 rounded text-white p-4 text-lg"
          ></textarea>
          <button type="submit"
          className="mt-4 text-stone-400 hover:text-stone-950 border border-stone-400 hover:bg-stone-400 focus:ring-4 focus:outline-none focus:ring-stone-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 w-fit"
          >Submit</button>
        </form>
      </div>
      {data && (
        <>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </>
      )}
    </>
  );
}
