
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAl85luI377sPdho37zWEhvzkwQ-xnIO2E",
  authDomain: "roninmom-fc5b4.firebaseapp.com",
  databaseURL: "https://roninmom-fc5b4-default-rtdb.firebaseio.com",
  projectId: "roninmom-fc5b4",
  storageBucket: "roninmom-fc5b4.appspot.com",
  messagingSenderId: "896374812072",
  appId: "1:896374812072:web:9f7c8dfddacbedec8ec19d",
  measurementId: "G-ER6VM479RR"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };