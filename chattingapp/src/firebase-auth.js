// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth";
import {getFirestore} from 'firebase/firestore'
// TODO:  Add SDKs for Firebase products that you want to use

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.API_KEY,
  authDomain: import.meta.env.AUTH_DOMAIN,
  projectId: import.meta.env.Project_ID,
  storageBucket: import.meta.env.Storage_Bucket,
  messagingSenderId: import.meta.env.MSG_SEND_ID,
  appId: "1:461587565463:web:192a2c1b0c3a10e84fd2d2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth=getAuth(app)
export const provider = new GoogleAuthProvider()
export const db=getFirestore(app)