// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA9eh0oty-q3CodFtvWGCtlb2EM8Ssb7nA",
  authDomain: "whatsapp-clone-c9998.firebaseapp.com",
  projectId: "whatsapp-clone-c9998",
  storageBucket: "whatsapp-clone-c9998.appspot.com",
  messagingSenderId: "35160347530",
  appId: "1:35160347530:web:e9b3fdf1a329f2dbab2e73",
  measurementId: "G-ZLX3T6NHQ5"
};

// Initialize Firebase
const firestoreApp = initializeApp(firebaseConfig);
const googleProvider = new GoogleAuthProvider();
const auth = getAuth();
export {firestoreApp,auth,googleProvider};