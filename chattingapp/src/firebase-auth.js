// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth";
import {getFirestore} from 'firebase/firestore'
// TODO:  Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBOBKLmDEs_k-wnLl8o6bc4zhX0YpVvLPQ",
  authDomain: "mychatapp-ea14c.firebaseapp.com",
  projectId: "mychatapp-ea14c",
  storageBucket: "mychatapp-ea14c.appspot.com",
  messagingSenderId: "461587565463",
  appId: "1:461587565463:web:192a2c1b0c3a10e84fd2d2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth=getAuth(app)
export const provider = new GoogleAuthProvider()
export const db=getFirestore(app)