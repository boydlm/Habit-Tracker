import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore"
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "habit-tracker-d43a7.firebaseapp.com",
  projectId: "habit-tracker-d43a7",
  storageBucket: "habit-tracker-d43a7.appspot.com",
  messagingSenderId: "91693745225",
  appId: "1:91693745225:web:239e7a1b655e0f033deb98",
  measurementId: "G-WMTJJE10XK"
};

const app = initializeApp(firebaseConfig);

console.log(process.env.REACT_APP_API_KEY)

export const auth = getAuth(app)
export const firestore = getFirestore(app)

