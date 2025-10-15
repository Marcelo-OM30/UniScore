// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCnb0VQ02_1vT8Rvog597t3n6xY3OFoRLk",
    authDomain: "uniscore-51208.firebaseapp.com",
    projectId: "uniscore-51208",
    storageBucket: "uniscore-51208.firebasestorage.app",
    messagingSenderId: "808977508595",
    appId: "1:808977508595:web:2350a1e7497973913d2f86",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
