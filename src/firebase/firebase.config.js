// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
//   apiKey: "AIzaSyDxpQUi1V_hmy-qGyliAjonWMRmXtLDg8U",
//   authDomain: "sm-media-8efbf.firebaseapp.com",
//   projectId: "sm-media-8efbf",
//   storageBucket: "sm-media-8efbf.appspot.com",
//   messagingSenderId: "473563420579",
//   appId: "1:473563420579:web:f3bff9813c0e22a287ec16"

  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;