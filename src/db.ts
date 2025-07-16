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
        await setDoc(userRef, { points: 0, completedStops: 0 });
    }
}

export const updateUserPoints = async (user: { name: string, points: number, index: number }) => {
    //update user points
    const userRef = doc(db, "users", user.name);
    let totalPoints = 0;
    await setDoc(userRef, { points: user.points }, { merge: true });
    //then update completed stops if index not already in array
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
        const completedStops = userDoc.data()?.completedStops || [];
        totalPoints = userDoc.data()?.points || 0;
        if (!completedStops.includes(user.index)) {
            await setDoc(userRef, { completedStops: arrayUnion(user.index) }, { merge: true });
        }
    }
    //return user points
    return totalPoints;
}