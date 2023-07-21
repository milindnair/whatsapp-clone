import {User} from "firebase/auth";
import {getFirestore, doc, setDoc, serverTimestamp, collection, DocumentData, getDoc} from "firebase/firestore";
import { firestoreApp } from ".";

export const firestore = getFirestore(firestoreApp);

export const usersCollection = collection(firestore, "users");
export const addUserToFirestore = async (user: User) => {
    const userRef = doc(firestore , "users" , user.uid);
    // const db = getFirestore();
    // const docRef = doc(db, "users", user.uid);
    await setDoc(userRef, {
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
        lastSeen: serverTimestamp(),
        uid: user.uid,
    } , {merge: true});
    }

export const getSnapshotDoc = (doc :DocumentData) =>{
    return {
        id: doc.id,
        ...doc.data(),
    };
} 

export const getSingleUserFromFirestore = async (userId: string) => {
    if (!userId) return;
    const userRef = doc(firestore, `users/${userId}`);
    const userSnap = await getDoc(userRef);
    const user = userSnap.data();
    return user;
  };