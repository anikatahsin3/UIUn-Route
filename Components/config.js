import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA6Rvb_jwxj6pJL_GteS7d8D8xAeAAJ01E",
    authDomain: "uiu-nroute.firebaseapp.com",
    projectId: "uiu-nroute",
    storageBucket: "uiu-nroute.appspot.com",
    messagingSenderId: "801802769824",
    appId: "1:801802769824:web:2ab62422df5de5c390c0c5",
    measurementId: "G-SVCEN6EZL8"
};
  
if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}

export { firebase };