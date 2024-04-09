import { initializeApp } from "firebase/app";
import {getFirestore, doc, setDoc, getDocs, collection, addDoc} from 'firebase/firestore'
import { Expense } from "../components/Dashboard/types";


const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const setDocHandle = async(collectionName:string, data:Omit<Expense, 'id'>) => {
    const docRef = await addDoc(collection(db, collectionName), data);
    // await setDoc(doc(db, collectionName), data);
}

export const getExpenseHandle = async(collectionName:string) => {
    const expenseSnapshot = await getDocs(collection(db, collectionName));
    const expenses = expenseSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as Expense);
    return expenses
}