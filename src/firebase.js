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
  apiKey: "AIzaSyAJtmjAsCfzf8rtfyMzYuzPGZ5HdtqU6Pw",
  authDomain: "pr14-foodorderingsystem.firebaseapp.com",
  projectId: "pr14-foodorderingsystem",
  storageBucket: "pr14-foodorderingsystem.appspot.com",
  messagingSenderId: "1010906301899",
  appId: "1:1010906301899:web:6b0cd9721eb7c3e611624e",
  measurementId: "G-5NHBDS52D5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app)