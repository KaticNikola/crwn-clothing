import firebase from 'firebase/app';

import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyDquovXsOCfmdxq-oQ-7Nx7Lfv2wms4wY8",
  authDomain: "crwn-db-c5e8d.firebaseapp.com",
  databaseURL: "https://crwn-db-c5e8d.firebaseio.com",
  projectId: "crwn-db-c5e8d",
  storageBucket: "",
  messagingSenderId: "53064544801",
  appId: "1:53064544801:web:af9676c4dbdfc17e"
};

export const creteUserProfileDocument = async (userAuth, additionalData )=>{
  if(!userAuth) return;
  //check if user exist in firebase
  
  const userRef =  firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get()
  
  if(!snapShot.exists) {  //if user doesent exits > create one
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      //.set > create method
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });  
    } catch (error) {
      console.log("error creating user", error.message)
    }
  }
  return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account"
}); //google popub for login with google

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase