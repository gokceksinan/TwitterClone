// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
import { getFirestore } from "firebase/firestore";



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBYENGRMzaEL1W5HMrYNSVCHI36R3-hlMM",
  authDomain: "twitter-7cd64.firebaseapp.com",
  projectId: "twitter-7cd64",
  storageBucket: "twitter-7cd64.firebasestorage.app",
  messagingSenderId: "932699979705",
  appId: "1:932699979705:web:fc9d20a5b49973f077c068"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// auth referansını al 
export const auth = getAuth(app);

// google sağlayıcısını kur
export const provider = new GoogleAuthProvider();

// veritabanının referansını al
export const db = getFirestore(app)