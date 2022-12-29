import Head from "next/head";
import Account from "../components/account";
import Main from "../components/main";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAB8PyE3iTHddEjSs1yJikJz-Prz1_5bDs",
  authDomain: "agency-manager-woof.firebaseapp.com",
  projectId: "agency-manager-woof",
  storageBucket: "agency-manager-woof.appspot.com",
  messagingSenderId: "840857154091",
  appId: "1:840857154091:web:dbfb9b90007d8c0159f06e",
  measurementId: "G-0FG1J0F6RE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth()

function App() {

  const [user, setUser] = useAuthState(auth);
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
      <main className='min-h-screen bg-graph-paper dark:bg-graph-paper-dark'>
        <div
          className='hidden md:block xl:block 2xl:block'
        >
          {
            user ? <Main /> : <Account />
          }</div>
        <div className="block md:hidden xl:hidden 2xl:hidden">
          <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Agency Manager</h1>
            <p className="text-xl font-medium text-center text-slate-700 dark:text-slate-300">This app is not yet optimized for mobile devices.</p>
            <p className="text-xl font-medium text-center text-slate-700 dark:text-slate-300">Please use a desktop or laptop computer.</p>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
