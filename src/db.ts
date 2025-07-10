import { set } from "firebase/database";
import { db } from "./firebase.ts";
import { collection, addDoc, getDocs, getDoc, setDoc, doc, arrayUnion, deleteDoc } from "firebase/firestore";


export const saveUser = async (user: { name: string, points: number }) => {
    //first check if returning user
    const userRef = doc(db, "users", user.name);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
        //user already exists
        return
    } else {
        //else create new user
        await setDoc(userRef, { points: 0 });
    }
}

export const updateUserPoints = async (user: { name: string, points: number }) => {
    //update user points
    const userRef = doc(db, "users", user.name);
    await setDoc(userRef, { points: user.points }, { merge: true });
}