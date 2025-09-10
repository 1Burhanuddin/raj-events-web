import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCnVq1U6jDCefIfB3aLMD_si7o407RRavE",
  authDomain: "rajevents-93daa.firebaseapp.com",
  projectId: "rajevents-93daa",
  storageBucket: "rajevents-93daa.appspot.com",
  messagingSenderId: "1005088046439",
  appId: "1:1005088046439:web:3ac311e30b4e05c5b0c3c2",
  measurementId: "G-EKGK2LM995"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);