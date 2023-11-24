// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

  apiKey: "AIzaSyBYsSSfFyCqM6iesvwUHMzKaPg7Vifanbo",

  authDomain: "heartread-ecg.firebaseapp.com",

  projectId: "heartread-ecg",

  storageBucket: "heartread-ecg.appspot.com",

  messagingSenderId: "1067405566003",

  appId: "1:1067405566003:web:136df1b60dc603b09ec346",

  measurementId: "G-9X36M6BW0Z"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);
