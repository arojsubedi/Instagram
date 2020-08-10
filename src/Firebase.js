import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const firebaseApp=firebase.initializeApp({
    apiKey: "AIzaSyDUJCPa3h4xy9JFJeO_-fjZUhvglZKppuM",
    authDomain: "instagram-clone-fa27a.firebaseapp.com",
    databaseURL: "https://instagram-clone-fa27a.firebaseio.com",
    projectId: "instagram-clone-fa27a",
    storageBucket: "instagram-clone-fa27a.appspot.com",
    messagingSenderId: "891233337136",
    appId: "1:891233337136:web:b21bc6a50889c684d012f5",
    measurementId: "G-NYP82878SS"
});

// firebase.firestore.setLogLevel('debug');
firebase.firestore().settings({ experimentalForceLongPolling: true });
const db=firebaseApp.firestore(); //access to db
const auth=firebase.auth(); //access to authentication
const storage=firebase.storage(); //access to storage like upload

export {db,auth,storage};