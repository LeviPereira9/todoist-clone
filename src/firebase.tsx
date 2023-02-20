import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyB0yjmndmjYoHfE9UadjHHA_HAUkZjkOis',
  authDomain: 'todoist-clo-cc9e7.firebaseapp.com',
  projectId: 'todoist-clo-cc9e7',
  storageBucket: 'todoist-clo-cc9e7.appspot.com',
  messagingSenderId: '953578945642',
  appId: '1:953578945642:web:254491af47eed18db81e13',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
