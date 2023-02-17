import { initializeApp } from "firebase/app";
import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAPUSvuaGyZGYkV-QLhwwpKOT3R5IMPiP0",
  authDomain: "snapchat-clone-c555d.firebaseapp.com",
  projectId: "snapchat-clone-c555d",
  storageBucket: "snapchat-clone-c555d.appspot.com",
  messagingSenderId: "807861548013",
  appId: "1:807861548013:web:bff56224da7a70710cade4"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider(auth);
const storage = getStorage(app);

export {auth, db, provider,storage}