import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import { getAuth } from "firebase/auth";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyADWUlEpQSb8iWvYFEVPDkKZxWPYmJ2D5A",
  authDomain: "smart-e-commerce-app-1463c.firebaseapp.com",
  projectId: "smart-e-commerce-app-1463c",
  storageBucket: "smart-e-commerce-app-1463c.firebasestorage.app",
  messagingSenderId: "1058378613913",
  appId: "1:1058378613913:web:5aeec08321a7a20c37a408",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const auth = getAuth(app);

export { auth, db };
