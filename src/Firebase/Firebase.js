import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import {Api_key,Auth_Domain,Project_Id,Storage_Bucket,Messaging_SenderId,App_Id} from '../config'

const firebaseConfig = {
  apiKey: Api_key,
  authDomain: Auth_Domain,
  projectId: Project_Id,
  storageBucket: Storage_Bucket,
  messagingSenderId: Messaging_SenderId,
  appId: App_Id
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export { auth, db , googleProvider};