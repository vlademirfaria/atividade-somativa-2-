// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDPKp-b1EMJ3VVvYpcH07ocqRoMI-iIdi0",
  authDomain: "atividade-somativa-2-47a6a.firebaseapp.com",
  projectId: "atividade-somativa-2-47a6a",
  storageBucket: "atividade-somativa-2-47a6a.firebasestorage.app",
  messagingSenderId: "850318016204",
  appId: "1:850318016204:web:897af1d36aace3e4ce0c69",
  measurementId: "G-1696H0QL1L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);