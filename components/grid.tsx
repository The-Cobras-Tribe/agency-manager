import Card from './card';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
    getAuth
} from "firebase/auth";
import { getFirestore, query, collection } from "firebase/firestore";
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

function Grid() {

    const [user, loading] = useAuthState(auth)

    return <section className='grid h-screen grid-cols-1 gap-4 p-8 overflow-auto  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {user && <Clients userId={user.uid} />}
    </section>
}

function Clients({ userId }: { userId: string }) {
    const [clients, loading] = useCollection(
        query(collection(db, 'users', userId, 'clients')),
    );

    return <>
        {loading && <h1 className='text-2xl text-slate-900 dark:text-slate-200'>Loading...</h1>}
        {
            clients?.docs.map((client) => {
                return <Card key={client.id}
                    id={client.id}
                    clientName={client.data().clientName}
                    contractorName={client.data().contractorName}
                    date={new Date(client.data().date.seconds * 1000).toLocaleDateString()}
                    status={client.data().status}
                    onClick={() => { }}
                />
            })
        }</>;
}


export default Grid;