import Head from "next/head";
import Main from "../components/main";

function App() {
  return (
    <>
      <Head>
        <title>Agency Manager</title>
        <meta
          name='description'
          content='Manage your clients and contractors using workflows'
        />
        <link rel='icon' href='https://github.com/acutewoof.png' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Head>
      <main className='h-screen bg-hero dark:bg-hero-dark'>
        <Main />
      </main>
    </>
  );
}

export default App;
