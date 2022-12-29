import Button from "./button";
import { useState } from "react";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
    getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword
} from "firebase/auth";
import { doc, getFirestore, serverTimestamp, setDoc } from "firebase/firestore";

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

function Account() {

    const [login, setLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const postCreation = async (uid: string, email: any) => {
        const userDocumentRef = doc(db, 'users', uid);

        const userDocument = await setDoc(userDocumentRef, {
            email: email,
            uid: uid,
            created: serverTimestamp()
        });

        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setError('');
    }

    const createNewAccount = async () => {
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            console.log(error);
            return;
        }
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        postCreation(userCredential.user.uid, email);
    }

    const createGoogleAccount = async () => {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        postCreation(result.user.uid, result.user.email);
    }

    const signInExistingAccount = async () => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password
            );
            postCreation(userCredential.user.uid, email);
        } catch (error) {
            console.log(error);
        }
    }

    return (<section className="h-screen bg-hero dark:bg-hero-dark"
    >
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">

            {login && <div className="w-full md:mt-0 sm:max-w-md xl:p-0">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-slate-900 md:text-2xl dark:text-white">
                        Login to your account
                    </h1>
                    <div className="space-y-4 md:space-y-6">
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-slate-900 dark:text-white">Your email</label>
                            <input type="email" name="email" id="email" className="bg-slate-50 border border-gray-300 text-gray-900 sm:text-sm rounded-md block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white " placeholder="name@company.com" required={true}

                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value)
                                }}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-slate-900 dark:text-white">Password</label>
                            <input type="password" name="password" id="password" placeholder="••••••••" className="bg-slate-50 border border-gray-300 text-gray-900 sm:text-sm rounded-md block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white " required={true}

                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value)
                                }}
                            />
                        </div>
                        <div className="flex gap-2">
                            <Button
                                onClick={signInExistingAccount}
                            >Sign In</Button>
                            <Button
                                onClick={createGoogleAccount}
                            >Sign In With Google</Button>
                        </div>
                        <p className="text-sm font-light text-slate-500 dark:text-gray-400">
                            {"Don't "} have an account? <a onClick={
                                () => {
                                    setLogin(false)
                                }

                            } className="font-medium cursor-pointer text-primary-600 hover:underline dark:text-primary-500">Sign up here</a>
                        </p>
                    </div>
                </div>
            </div>}

            {!login && <div className="w-full md:mt-0 sm:max-w-md xl:p-0">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-slate-900 md:text-2xl dark:text-white">
                        Create an account
                    </h1>
                    <div className="space-y-4 md:space-y-6">
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-slate-900 dark:text-white">Your email</label>
                            <input type="email" name="email" id="email" className="bg-slate-50 border border-gray-300 text-gray-900 sm:text-sm rounded-md block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white " placeholder="name@company.com" required={true}
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value)
                                }}

                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-slate-900 dark:text-white">Password</label>
                            <input type="password" name="password" id="password" placeholder="••••••••" className="bg-slate-50 border border-gray-300 text-gray-900 sm:text-sm rounded-md block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white " required={true}
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value)
                                }}
                            />
                        </div>
                        <div>
                            <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-slate-900 dark:text-white">Confirm password</label>
                            <input type="password" name="confirm-password" id="confirm-password" placeholder="••••••••" className="bg-slate-50 border border-gray-300 text-gray-900 sm:text-sm rounded-md block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white " required={true}
                                value={confirmPassword}
                                onChange={(e) => {
                                    setConfirmPassword(e.target.value)
                                }}
                            />
                        </div>
                        <div className="flex gap-2">
                            <Button onClick={
                                createNewAccount
                            }>Create An Account</Button>
                            <Button
                                onClick={createGoogleAccount}
                            >Sign In With Google</Button>
                        </div>
                        <p className="text-sm font-light cursor-pointer text-slate-500 dark:text-gray-400">
                            Already have an account? <a
                                onClick={
                                    () => {
                                        setLogin(true)

                                    }
                                }
                                className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</a>
                        </p>
                    </div>
                </div>
            </div>}
        </div>
    </section >
    );
}

export default Account;