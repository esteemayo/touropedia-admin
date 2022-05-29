import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyCPeO4dc4A_jOWyj0Vxs7fmL1Vb8mkK2hU',
  authDomain: 'touropedia-350023.firebaseapp.com',
  projectId: 'touropedia-350023',
  storageBucket: 'touropedia-350023.appspot.com',
  messagingSenderId: '616492793975',
  appId: '1:616492793975:web:e79106f4732ed85b398672',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
