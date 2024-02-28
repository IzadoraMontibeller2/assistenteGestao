import firebase from "@firebase/app-compat";
import "firebase/compat/auth";
import { getFirestore } from "firebase/firestore";
import "firebase/compat/storage"; // Importe o módulo do Firebase Storage



const firebaseConfig = {
  apiKey: "AIzaSyAAqHBKO9MnKJLORIB7U5yRFGwg-zWr_NM",
  authDomain: "projetogestao-b3b2a.firebaseapp.com",
  projectId: "projetogestao-b3b2a",
  storageBucket: "projetogestao-b3b2a.appspot.com",
  messagingSenderId: "224327494796",
  appId: "1:224327494796:web:fc7d38aebfece4c4b29fa9"
};

const app = firebase.initializeApp(firebaseConfig);

export default firebase;  
export const db = getFirestore(app);
export const storage = firebase.storage(); // Crie a instância do Firebase Storage

