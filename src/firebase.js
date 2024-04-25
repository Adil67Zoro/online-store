import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/storage'

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyA5brIhS9zv8S9o5DM4wmwIi2W7oS9nKZY",
    authDomain: "store-7d996.firebaseapp.com",
    projectId: "store-7d996",
    storageBucket: "store-7d996.appspot.com",
    messagingSenderId: "902803064708",
    appId: "1:902803064708:web:8890c3e8f1700e6263bfd1",
    measurementId: "G-4GVN28E3TZ"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
