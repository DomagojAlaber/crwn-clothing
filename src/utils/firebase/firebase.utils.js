import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import {
  getAuth,
  signInWtihRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyChoOVvHA3lrd3ge3XEzUXn9kXvNhdva0U",
  authDomain: "crwn-clothing-db-815a5.firebaseapp.com",
  projectId: "crwn-clothing-db-815a5",
  storageBucket: "crwn-clothing-db-815a5.appspot.com",
  messagingSenderId: "699065848857",
  appId: "1:699065848857:web:78f952bda22849026a8688",
};

const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, { displayName, email, createdAt });
    } catch (error) {
      console.log('error creating the user', error.message)
    }


  }

  return userDocRef;
};
