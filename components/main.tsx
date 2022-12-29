import FAB from "./fab";
import Grid from "./grid";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth
} from "firebase/auth";
import { getFirestore, query, collection, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { useCollection } from 'react-firebase-hooks/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';

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
const db = getFirestore(app);
const auth = getAuth();

function Main() {

  const [user] = useAuthState(auth)

  return (
    <div>
      <div className='absolute bottom-8 right-8'>
        {user &&
          <FAB
            onClick={async () => {
              const newClient = doc(collection(db, 'users', user.uid, 'clients'));
              const client = await setDoc(newClient, {
                clientName: 'Unknown',
                contractorName: 'Unknown',
                date: serverTimestamp(),
                status: 'Pending'
              });

              const userId = user.uid;
              const clientId = newClient.id;


              await setDoc(doc(db, 'users', userId, 'clients', clientId), {
                projectDescription: String(undefined),
                clientInformation: String(undefined),
                contractorInformation: String(undefined),
                lastUpdated: serverTimestamp()
              }, { merge: true })
              await setDoc(doc(db, 'users', userId, 'clients', clientId, 'cards', 'notes'), {
                notes: String(undefined),
                lastUpdated: serverTimestamp()
              })

              await setDoc(doc(db, 'users', userId, 'clients', clientId, 'cards', 'todo'), {
                todo: String(undefined),
                lastUpdated: serverTimestamp()
              })


              console.log(client);

              window.open(`/client/${newClient.id}`, '_self');

            }}
            icon={
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-6 h-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M12 4.5v15m7.5-7.5h-15'
                />
              </svg>
            }
          />}
      </div>
      <Grid />
    </div>
  );
}

export default Main;
