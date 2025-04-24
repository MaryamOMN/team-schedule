// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// 🔁 Replace with your actual config:
const firebaseConfig = {
  apiKey: "AIzaSyCQq8-ETXPLEC5ME0w9UwqU3LOhsO5MksU",
  authDomain: "team-scheduler-62bfe.firebaseapp.com",
  projectId: "team-scheduler-62bfe",
  storageBucket: "team-scheduler-62bfe.firebasestorage.app",
  messagingSenderId: "374767629811",
  appId: "1:374767629811:web:d0ce5416ad25f843ba8e86"
};

const app = initializeApp(firebaseConfig);

// ✅ Export these exactly:
export const auth = getAuth(app);
export const db = getFirestore(app);
