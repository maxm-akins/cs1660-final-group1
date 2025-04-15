import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

var config = {
    apiKey: "AIzaSyA2YaOgNC86C7og5c0jXw1NtAuEMiX0jDM",
    authDomain: "cs1660-final-group1.firebaseapp.com",
};
const app = initializeApp(config);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
