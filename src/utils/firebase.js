// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBtTjo0fWyOTkvNB6IHKtbJqrQqJJ27cuU",
  authDomain: "awesome-resume-builder-911b4.firebaseapp.com",
  projectId: "awesome-resume-builder-911b4",
  storageBucket: "awesome-resume-builder-911b4.firebasestorage.app",
  messagingSenderId: "557292338652",
  appId: "1:557292338652:web:0860b933f3726350c66319",
  measurementId: "G-FZZ5LDPFVG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);