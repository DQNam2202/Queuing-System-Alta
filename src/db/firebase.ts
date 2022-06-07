import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: 'AIzaSyAY0QFgxfEmO1lZMASVJwpp_PFrdlzHR_M',
//   authDomain: 'queuing-system-alta.firebaseapp.com',
//   projectId: 'queuing-system-alta',
//   storageBucket: 'queuing-system-alta.appspot.com',
//   messagingSenderId: '85726622639',
//   appId: '1:85726622639:web:5d0186937ae3c95b86b55a',
//   measurementId: 'G-CLXR4NLTXC',
// };
const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APPID,
  measurementId: process.env.REACT_APP_MEASUREMENTID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;
export const storage = getStorage(app);
