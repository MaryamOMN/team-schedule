// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCQq8-ETXPLEC5ME0w9UwqU3LOhsO5MksU",
  authDomain: "team-scheduler-62bfe.firebaseapp.com",
  projectId: "team-scheduler-62bfe",
  storageBucket: "team-scheduler-62bfe.firebasestorage.app",
  messagingSenderId: "374767629811",
  appId: "1:374767629811:web:d0ce5416ad25f843ba8e86",
  measurementId: "G-3EBB3SK8YV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);