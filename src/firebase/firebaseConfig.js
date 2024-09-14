// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCNvtIsoDwn5lW0uYTpTgGecszMCQvFL1c",
  authDomain: "skillmate-e5727.firebaseapp.com",
  projectId: "skillmate-e5727",
  storageBucket: "skillmate-e5727.appspot.com",
  messagingSenderId: "1018773587980",
  appId: "1:1018773587980:web:36a58a1cf1f814ababc629"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getFirestore(app);