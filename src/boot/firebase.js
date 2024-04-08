// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA1mT1hthrqiIYidKQWYlkcns6ZUQ99ACQ",
  authDomain: "xcodeassist.firebaseapp.com",
  projectId: "xcodeassist",
  storageBucket: "xcodeassist.appspot.com",
  messagingSenderId: "851986552100",
  appId: "1:851986552100:web:de6971601a1a6e4cf90fb1",
  measurementId: "G-V60GQTXHXC",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
