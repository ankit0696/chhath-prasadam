
// src/firebase/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBFFRyc-_BYlJ9ZNkQxeTOpuTNSNn34P6k",
  authDomain: "chhath-prasadam.firebaseapp.com",
  projectId: "chhath-prasadam",
  storageBucket: "chhath-prasadam.firebasestorage.app",
  messagingSenderId: "487888277768",
  appId: "1:487888277768:web:4ef19e86ec942c4f601cbd",
  measurementId: "G-29MWDWCR8K"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
