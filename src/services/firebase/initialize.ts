import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCmaYqDKiTLmsdjfayCfn1ljjSMWhrPmrU",
  authDomain: "charltops-ecommerce.firebaseapp.com",
  projectId: "charltops-ecommerce",
  storageBucket: "charltops-ecommerce.appspot.com",
  messagingSenderId: "258733256274",
  appId: "1:258733256274:web:13af221ad663898cd3b98b",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
export { auth };
