import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBiRUH03c_EyNM1eIhSmTgieg3Kv7F35bU",
    authDomain: "kakaotalk-clone.firebaseapp.com",
    databaseURL: "https://kakaotalk-clone.firebaseio.com",
    projectId: "kakaotalk-clone",
    storageBucket: "kakaotalk-clone.appspot.com",
    messagingSenderId: "805892241572",
    appId: "1:805892241572:web:4765a3db5f83085562ce31",
    measurementId: "G-6W9GEGR0YK"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
  const db = firebaseApp.firestore();

  export {db, auth};