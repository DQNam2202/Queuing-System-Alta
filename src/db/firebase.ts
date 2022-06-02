import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAY0QFgxfEmO1lZMASVJwpp_PFrdlzHR_M',
  authDomain: 'queuing-system-alta.firebaseapp.com',
  projectId: 'queuing-system-alta',
  storageBucket: 'queuing-system-alta.appspot.com',
  messagingSenderId: '85726622639',
  appId: '1:85726622639:web:5d0186937ae3c95b86b55a',
  measurementId: 'G-CLXR4NLTXC',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;
export const storage = getStorage(app);
