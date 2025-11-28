// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE,
  authDomain: "mern-blog-bf808.firebaseapp.com",
  projectId: "mern-blog-bf808",
  storageBucket: "mern-blog-bf808.appspot.com",
  messagingSenderId: "551328642106",
  appId: "1:551328642106:web:831cd621e69ce0a3fe7103",
  measurementId: "G-D9X37FY6HW"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// eslint-disable-next-line no-unused-vars
const analytics = getAnalytics(app);