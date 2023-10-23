import '@/styles/globals.css'
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Text Analizer</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content=""
          key="desc"
        />
        <meta name="robots" content="all" />
      </Head>
      <div className="py-12 px-16 bg-indigo-950">
        <Component {...pageProps} />
      </div>
      
    </>
  )
  }
