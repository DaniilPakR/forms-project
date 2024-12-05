// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBKHQq88ZbZayPQBZ4opc5UtypLKoF7UKg",
  authDomain: "forms-project-c77c1.firebaseapp.com",
  projectId: "forms-project-c77c1",
  storageBucket: "forms-project-c77c1.firebasestorage.app",
  messagingSenderId: "332932186400",
  appId: "1:332932186400:web:6fe83d1b01aa8aa2195745",
  measurementId: "G-JRD2BF98HN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);