// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDbQoi3lQuUXKje5N2m1Jo8BW8qy5OShXU",
  authDomain: "summative-c39e2.firebaseapp.com",
  projectId: "summative-c39e2",
  storageBucket: "summative-c39e2.appspot.com",
  messagingSenderId: "662232559979",
  appId: "1:662232559979:web:e96abc7341052ca7439c2e",
  measurementId: "G-J0Z1R2CHP2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();
const firestore = getFirestore();
const storage = getStorage();

export { auth, firestore, storage };
