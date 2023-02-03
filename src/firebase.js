import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDg8IyR2NZqrZSdikcykLsGO_4aAtUNrwo",
  authDomain: "instareels-4559a.firebaseapp.com",
  projectId: "instareels-4559a",
  storageBucket: "instareels-4559a.appspot.com",
  messagingSenderId: "180090912654",
  appId: "1:180090912654:web:ebf5a54e55c085c802aedf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
