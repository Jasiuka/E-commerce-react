import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  writeBatch,
  collection,
  query,
  getDocs,
} from "firebase/firestore";

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

// ADDING PRODUCTS TO DB

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const colletcionRef = collection(dataBase, collectionKey);
  const batch = writeBatch(dataBase);

  objectsToAdd.forEach((object) => {
    const docRef = doc(colletcionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log("DONE");
};

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(dataBase, "categories");
  const Query = query(collectionRef);
  const querySnapshot = await getDocs(Query);
  return querySnapshot.docs.map((docSnapshot) => docSnapshot.data());

  // .reduce((acc, docSnapshot) => {
  //   const { title, items } = docSnapshot.data();
  //   acc[title.toLowerCase()] = items;
  //   return acc;
  // }, {});

  // return categoryMap;
};

export const CreateUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  const userDocReference = doc(dataBase, "users", userAuth.uid); // Duomenu bazė, kolekcijos pav (duomenu bazėj), id
  // userDocReference, yra skirtas tik patikrint ar egzistuoja toks reference duomenu bazėj, jis nera skirtas gauti info ar keisti
  // console.log(userDocReference);

  const userData = await getDoc(userDocReference);
  // console.log(userData.exists()); // patikrina ar egzistuoja vartotojo duomenys duomenu bazėj

  //   if user data does not exist
  //   create / set the document with data from userAuth in my collection
  if (!userData.exists()) {
    let displayName;
    if (additionalInformation && !userAuth.displayName) {
      displayName = additionalInformation.displayName;
    } else {
      displayName = userAuth.displayName;
    }
    const { email } = userAuth;
    if (displayName.includes(" ")) {
      displayName = displayName.substring(0, displayName.indexOf(" "));
    }
    const createdAt = new Date();
    const imageUrl = "https://i.ibb.co/VYjmWqD/guest-User.jpg";

    try {
      await setDoc(userDocReference, {
        displayName,
        email,
        createdAt,
        imageUrl,
        ...additionalInformation,
      });
    } catch (error) {
      console.log("Error creating the user", error);
    }

    return {
      displayName,
      email,
      createdAt,
      imageUrl,
      ...additionalInformation,
    };
  }

  // if user data exist --> return userDocReference
  return userData;
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

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);
