// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDlEpXq0us5C058Vu5Z8Yuuy-owF0pBvtY",
  authDomain: "mavenmarketing-93029.firebaseapp.com",
  projectId: "mavenmarketing-93029",
  storageBucket: "mavenmarketing-93029.appspot.com",
  messagingSenderId: "86110568334",
  appId: "1:86110568334:web:afda5a889d080604cdeedf",
  measurementId: "G-PR2FPVQL4G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const storage = getStorage(app)