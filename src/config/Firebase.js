import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBMyByfTQNWxTtDuPUD4d0rzGiSubsHhZo",
    authDomain: "processo-seletivo-sisagron.firebaseapp.com",
    projectId: "processo-seletivo-sisagron",
    storageBucket: "processo-seletivo-sisagron.firebasestorage.app",
    messagingSenderId: "52977134307",
    appId: "1:52977134307:web:90f5ff535b71d68d6433d6",
    measurementId: "G-38K0Z7B5CH"
  };

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
