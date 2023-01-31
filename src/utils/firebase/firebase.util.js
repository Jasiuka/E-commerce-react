import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBhhrXbg_UfqSRgcAy-Ykm-81eQEzWPivw",

  authDomain: "e-commerce-react-ccd36.firebaseapp.com",

  projectId: "e-commerce-react-ccd36",

  storageBucket: "e-commerce-react-ccd36.appspot.com",

  messagingSenderId: "39859308588",

  appId: "1:39859308588:web:6f83696544942c40212989",
};

const FirebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const SignInWithGooglePopUp = () =>
  signInWithPopup(auth, googleProvider);
export const SignInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

export const dataBase = getFirestore();
export const CreateUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  const userDocReference = doc(dataBase, "users", userAuth.uid); // Duomenu bazė, kolekcijos pav (duomenu bazėj), id
  // userDocReference, yra skirtas tik patikrint ar egzistuoja toks reference duomenu bazėj, jis nera skirtas gauti info ar keisti
  console.log(userDocReference);

  const userData = await getDoc(userDocReference);
  // console.log(userData.exists()); // patikrina ar egzistuoja vartotojo duomenys duomenu bazėj

  //   if user data does not exist
  //   create / set the document with data from userAuth in my collection
  if (!userData.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocReference, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log("Error creating the user", error);
    }
  }

  // if user data exist --> return userDocReference
  return userDocReference;
};

export const UserCreateWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const SignInUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);
