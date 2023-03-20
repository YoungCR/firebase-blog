// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// this allows you to connect to your db
import { getFirestore } from 'firebase/firestore';
// this allows you to connect to firebase auth
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyC7YmdEcROzJoNAWI5ZNpAA87xoQ9KF-V0',
  authDomain: 'mimo-firebase-blog.firebaseapp.com',
  projectId: 'mimo-firebase-blog',
  storageBucket: 'mimo-firebase-blog.appspot.com',
  messagingSenderId: '516180299719',
  appId: '1:516180299719:web:b65804e1ea13a48bc493e2',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// set up database and export it
export const db = getFirestore(app);

// set up auth and export it
export const auth = getAuth(app);
