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

  firebase.initializeApp(config);
  
  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account"}); //google popub for login with google

  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase