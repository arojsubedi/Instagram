import firebase from 'firebase';

const firebaseApp=firebase.initializeApp({
    apiKey: "AIzaSyCP-hyIQ7Z1bFCOeKmj9ApauWRjJylfMvY",
    authDomain: "instagram-1ebb7.firebaseapp.com",
    databaseURL: "https://instagram-1ebb7.firebaseio.com",
    projectId: "instagram-1ebb7",
    storageBucket: "instagram-1ebb7.appspot.com",
    messagingSenderId: "324025943978",
    appId: "1:324025943978:web:5fc2c637d7f199236a8dd3",
    measurementId: "G-E576KZNXZL"
});

const db=firebaseApp.firestore(); //access to db
const auth=firebase.auth(); //access to authentication
const storage=firebase.storage(); //access to storage like upload

export {db,auth,storage};