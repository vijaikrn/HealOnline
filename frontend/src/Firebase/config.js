import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {  RecaptchaVerifier } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyA90iRO94DpnFYHfraBL9Xl01XqdbaMuwk",
  authDomain: "healonline-36e86.firebaseapp.com",
  projectId: "healonline-36e86",
  storageBucket: "healonline-36e86.appspot.com",
  messagingSenderId: "719839128317",
  appId: "1:719839128317:web:d440ac8a6c06d25040ac94",
  measurementId: "G-M043K7RTV2"
};


const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);