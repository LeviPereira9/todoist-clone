import { initializeApp } from 'firebase/app';
import { getFirestore, collection, deleteDoc } from 'firebase/firestore';

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDFU7QMNFGdVCjHhEH1LMtGATUHvHdD2Qk",
  authDomain: "todo-tut-308eb.firebaseapp.com",
  projectId: "todo-tut-308eb",
  storageBucket: "todo-tut-308eb.appspot.com",
  messagingSenderId: "981785915146",
  appId: "1:981785915146:web:69c6917692638275efd4f3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db, collection, deleteDoc };
