// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBzheukl1HoxPBY8zxiurLZN6wAJ6DYOGY",
  authDomain: "e-commerce-3fa24.firebaseapp.com",
  projectId: "e-commerce-3fa24",
  storageBucket: "e-commerce-3fa24.appspot.com",
  messagingSenderId: "343484503296",
  appId: "1:343484503296:web:9dbc0e5379c4af052d0fe5",
  measurementId: "G-MCV0VH7MEH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
