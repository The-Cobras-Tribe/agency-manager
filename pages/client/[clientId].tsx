import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
    getAuth
} from "firebase/auth";
import { getFirestore, query, collection, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import Account from '../../components/account';
import Button from '../../components/button';
import FAB from '../../components/fab';

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

function ClientPage() {

    const [user] = useAuthState(auth)

    const router = useRouter();
    const { clientId } = router.query;

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
            <main className='min-h-screen bg-hero dark:bg-hero-dark'>
                {user && <ActualStuff clientId={String(clientId)} userId={user.uid} />}
                {!user && <Account />}
            </main>
        </>
    );
}


function ActualStuff({ clientId, userId }: { clientId: string, userId: string }) {

    const [clientDoc, loading, error] = useDocument(
        doc(db, 'users', userId, 'clients', clientId)
    )

    const [notesDoc] = useDocument(
        doc(db, 'users', userId, 'clients', clientId, 'cards', 'notes')
    )

    const [todoDoc] = useDocument(
        doc(db, 'users', userId, 'clients', clientId, 'cards', 'todo')
    )



    const [clientName, setClientName] = useState(clientDoc?.data()?.clientName);
    const [contractorName, setContractorName] = useState(clientDoc?.data()?.contractorName);
    const [projectDescription, setProjectDescription] = useState(clientDoc?.data()?.projectDescription);
    const [clientInformation, setClientInformation] = useState(clientDoc?.data()?.clientInformation);
    const [contractorInformation, setContractorInformation] = useState(clientDoc?.data()?.contractorInformation);

    const [notes, setNotes] = useState(notesDoc?.data()?.notes);
    const [todo, setTodo] = useState<any[]>([]);
    const [todoInput, setTodoInput] = useState<string>('');

    useEffect(() => {
        setClientName(clientDoc?.data()?.clientName);
        setContractorName(clientDoc?.data()?.contractorName);
        setProjectDescription(clientDoc?.data()?.projectDescription);
        setClientInformation(clientDoc?.data()?.clientInformation);
        setContractorInformation(clientDoc?.data()?.contractorInformation);
    }, [clientDoc])

    useEffect(() => {
        if (notesDoc) {
            setNotes(notesDoc?.data()?.notes);
        }
    }, [notesDoc])

    useEffect(() => {
        if (typeof todoDoc?.data()?.todo === typeof []) {
            setTodo(todoDoc?.data()?.todo);
        } else {
            setTodo(todoDoc?.data()?.todo.split(','));
        }

    }, [todoDoc])

    return <>

        <section className='flex flex-col w-screen min-h-screen text-slate-900 dark:text-slate-200'>
            <header className='flex items-center justify-between gap-2 p-4 bg-slate-300 dark:bg-slate-900'>
                <div className='flex gap-2 grow'>
                    <input className="text-2xl bg-transparent border-none text-slate-900 dark:text-slate-100 focus:outline-none" type="text" value={clientName} onChange={
                        (e) => {
                            setClientName(e.target.value);
                            setDoc(doc(db, 'users', userId, 'clients', clientId), {
                                clientName: e.target.value,
                                lastUpdated: serverTimestamp()
                            }, { merge: true })
                        }
                    }
                    />
                </div>
                <Button
                    onClick={async () => {
                        await setDoc(doc(db, 'users', userId, 'clients', clientId), {
                            projectDescription: String(projectDescription),
                            clientInformation: String(clientInformation),
                            contractorInformation: String(contractorInformation),
                            lastUpdated: serverTimestamp()
                        }, { merge: true })
                        await setDoc(doc(db, 'users', userId, 'clients', clientId, 'cards', 'notes'), {
                            notes: String(notes),
                            lastUpdated: serverTimestamp()
                        })

                        await setDoc(doc(db, 'users', userId, 'clients', clientId, 'cards', 'todo'), {
                            todo: String(todo),
                            lastUpdated: serverTimestamp()
                        })

                    }}

                >Save Changes</Button>

                <Button onClick={async () => {
                    // mark as complete
                    await setDoc(doc(db, 'users', userId, 'clients', clientId), {
                        status: 'Complete',
                        lastUpdated: serverTimestamp()
                    }, { merge: true })
                }}>Mark as Complete</Button>

                <Button onClick={async () => {
                    // mark as incomplete
                    await setDoc(doc(db, 'users', userId, 'clients', clientId), {
                        status: 'Incomplete',
                        lastUpdated: serverTimestamp()
                    }, { merge: true })
                }}>Mark as Incomplete</Button>

                <Button onClick={() => {
                    window.open(`/`, '_self')
                }}>Home</Button>


            </header>
            <div className='flex flex-col gap-2 p-4 grow'>
                <div className='grid grid-cols-1 gap-2 md:grid-cols-3 xl:grid-cols-4' >
                    <div className="block max-w-lg p-6 border grow border-slate-200 dark:border-slate-700 ">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Project</h5>
                        <textarea className="w-full h-24 font-normal bg-transparent border-none focus:outline-none text-slate-700 dark:text-slate-400 wrap"
                            value={projectDescription} onChange={
                                (e) => {
                                    setProjectDescription(e.target.value);
                                }
                            }
                        />
                    </div>
                    <div className="block max-w-lg p-6 border grow border-slate-200 dark:border-slate-700">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Client </h5>
                        <textarea className="w-full h-24 font-normal bg-transparent border-none focus:outline-none text-slate-700 dark:text-slate-400 wrap"
                            value={
                                clientInformation
                            } onChange={
                                (e) => {
                                    setClientInformation(e.target.value);
                                }
                            }

                        />
                    </div>
                    <div className="block max-w-lg p-6 border grow border-slate-200 dark:border-slate-700">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Contractor </h5>
                        <input className="w-full font-normal bg-transparent border-b border-slate-300 dark:border-slate-600 h-14 focus:outline-none text-slate-700 dark:text-slate-400 wrap " type="text" value={contractorName} onChange={
                            (e) => {
                                setContractorName(e.target.value);
                                setDoc(doc(db, 'users', userId, 'clients', clientId), {
                                    contractorName: e.target.value,
                                    lastUpdated: serverTimestamp()
                                }, { merge: true })

                            }
                        } />
                        <textarea className="w-full font-normal bg-transparent border-none h-14 focus:outline-none text-slate-700 dark:text-slate-400 wrap"
                            value={
                                contractorInformation
                            } onChange={
                                (e) => {
                                    setContractorInformation(e.target.value);
                                }
                            }

                        />
                    </div>
                </div>
                <div className='relative grid grid-cols-1 gap-2 grow md:grid-cols-3 xl:grid-cols-4 ' >

                    <div className="flex flex-col h-full max-w-lg gap-2 p-6 border grow border-slate-200 dark:border-slate-700">
                        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">To Do</h1>
                        <ul>
                            <li className="flex flex-row items-center justify-between gap-2">
                                <input className="w-full font-normal bg-transparent border-b border-slate-300 dark:border-slate-600 h-14 focus:outline-none text-slate-700 dark:text-slate-400 wrap " type="text" value={todoInput} onChange={
                                    (e) => {
                                        setTodoInput(e.target.value);
                                    }
                                } />
                                <button className="flex items-center justify-center w-8 h-8 transition-colors duration-150 bg-transparent text-slate-900 dark:text-slate-300 focus:shadow-outline " onClick={
                                    async () => {
                                        const newTodo: string[] = [...todo];
                                        newTodo.push(todoInput);
                                        setTodo(newTodo);
                                        setTodoInput('');

                                        await setDoc(doc(db, 'users', userId, 'clients', clientId, 'cards', 'todo'), {
                                            todo: String(newTodo),
                                            lastUpdated: serverTimestamp()
                                        })
                                    }
                                }>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                    </svg>

                                </button>
                            </li>
                            {
                                todo &&
                                todo.map &&
                                todo.map((todoItem: string, index: number) => {
                                    return (
                                        <>{todoItem !== '' &&
                                            <li key={index} className="flex flex-row items-center justify-between gap-2">
                                                <input className="w-full font-normal bg-transparent border-b border-slate-300 dark:border-slate-600 h-14 focus:outline-none text-slate-700 dark:text-slate-400 wrap " type="text" value={todoItem} onChange={
                                                    async (e) => {
                                                        const newTodo: any[] = [...todo];
                                                        newTodo[index] = e.target.value;
                                                        setTodo(newTodo);

                                                        await setDoc(doc(db, 'users', userId, 'clients', clientId, 'cards', 'todo'), {
                                                            todo: String(newTodo),
                                                            lastUpdated: serverTimestamp()
                                                        })
                                                    }
                                                } />

                                                <button className="flex items-center justify-center w-8 h-8 text-red-900 transition-colors duration-150 bg-transparent dark:text-red-300 focus:shadow-outline " onClick={
                                                    async () => {
                                                        const newTodo = [...todo];
                                                        newTodo.splice(index, 1);
                                                        setTodo(newTodo);

                                                        await setDoc(doc(db, 'users', userId, 'clients', clientId, 'cards', 'todo'), {
                                                            todo: String(newTodo),
                                                            lastUpdated: serverTimestamp()
                                                        })

                                                    }}
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                    </svg>

                                                </button>

                                            </li>}</>
                                    )
                                })


                            }
                        </ul>
                    </div>
                    <div className="flex flex-col w-full h-full col-span-1 gap-2 p-6 border md:col-span-2 xl:col-span-3 border-slate-200 dark:border-slate-700 ">
                        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Notes</h1>
                        <div className='flex flex-row items-center justify-between gap-2 grow'>
                            <textarea className="box-border w-[100%] h-screen md:h-full xl:h-full font-normal prose bg-transparent border-none dark:prose-invert grow focus:outline-none max-w-none "
                                value={notes} onChange={
                                    (e) => {
                                        setNotes(e.target.value);
                                    }
                                }
                            />
                        </div>

                    </div>
                </div>
            </div>
        </section>

    </>
}

export default ClientPage;