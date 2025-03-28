import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD43NozwC8FSS6nSJDq-7okUkWbPzcpTwU",
  authDomain: "whatsapp-clone-30e14.firebaseapp.com",
  projectId: "whatsapp-clone-30e14",
  storageBucket: "whatsapp-clone-30e14.appspot.com",
  messagingSenderId: "686284037711",
  appId: "1:686284037711:web:cc683df159658d9163d43a",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
