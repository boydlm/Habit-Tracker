import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "@firebase/firestore"


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
const analytics = getAnalytics(app);
export const firestore = getFirestore(app)

