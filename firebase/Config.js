
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBDqTc-WHxxG53QDce_hkYCVkDv6pcY3NE",
  authDomain: "fir-task-430c7.firebaseapp.com",
  projectId: "fir-task-430c7",
  storageBucket: "fir-task-430c7.appspot.com",
  messagingSenderId: "207342557459",
  appId: "1:207342557459:web:2d91a9e48fb7cf90b822e6"
};

// Initialize Firebase
initializeApp(firebaseConfig);

const firestore = getFirestore();

export {
    firestore
};