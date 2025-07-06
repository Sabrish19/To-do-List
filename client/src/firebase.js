import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCfXqg9ZKJuwoUZi2ecGOWBabgJ5Df9cK0",
  authDomain: "todo-list-b6963.firebaseapp.com",
  projectId: "todo-list-b6963",
  storageBucket: "todo-list-b6963.firebasestorage.app",
  messagingSenderId: "269556498482",
  appId: "1:269556498482:web:2d656b40fe76aefd9b3c2b",
  measurementId: "G-2J7DZ98JQH"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
