import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyBbMg5niBCc8X2vJb0C2oq4DLlDZw4cIsI",
  authDomain: "deploy-me-5bf85.firebaseapp.com",
  databaseURL: "https://deploy-me-5bf85-default-rtdb.firebaseio.com",
  projectId: "deploy-me-5bf85",
  storageBucket: "deploy-me-5bf85.firebasestorage.app",
  messagingSenderId: "172717097043",
  appId: "1:172717097043:web:5155d30c11e5a9c770c6a6",
  measurementId: "G-0YKYC2RT22"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { app, database };
