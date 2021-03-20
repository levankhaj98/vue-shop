import firebase from '@firebase/app'
import 'firebase/firestore'
import 'firebase/firebase-auth'
import 'firebase/storage'

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDEIFQp2y7fZkZKGBCAiIlXujnIJSjg28A",
    authDomain: "vue-shop-10079.firebaseapp.com",
    projectId: "vue-shop-10079",
    storageBucket: "vue-shop-10079.appspot.com",
    messagingSenderId: "308426087293",
    appId: "1:308426087293:web:2f5761faaadcb7536e4a14"
  };
  // Initialize Firebase
 const fb = firebase.initializeApp(firebaseConfig);
 const db = firebase.firestore();

 export {fb,db}