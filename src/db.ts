import { db } from "./firebase.ts";
import { getDoc, setDoc, doc, arrayUnion, collection, getDocs } from "firebase/firestore";


export const saveUser = async (user: { name: string }) => {
    //first check if returning user
    const userRef = doc(db, "users", user.name);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
        //user already exists
        console.log("Returning user:", user.name);
        //set in local storage
        localStorage.setItem("user", user.name);
        return
    } else {
        //else create new user
        await setDoc(userRef, { points: 0, completedStops: [] });
    }
}

export const updateUserPoints = async (user: { name: string, points: number, index: number }) => {
  const userRef = doc(db, "users", user.name);
  const userDoc = await getDoc(userRef);

  if (!userDoc.exists()) {
    console.warn("User not found:", user.name);
    return 0;
  }

  const data = userDoc.data();
  const currentPoints = data.points || 0;
  const completedStops = data.completedStops || [];

  let newPoints = currentPoints;

  if (!completedStops.includes(user.index)) {
    newPoints += user.points;

    // Update both points and add to completedStops atomically
    await setDoc(
      userRef,
      {
        points: newPoints,
        completedStops: arrayUnion(user.index),
      },
      { merge: true }
    );
  }

  return newPoints;
};

export const updateDrinkPoints = async (user: { name: string, points: number }) => {
    //update user points for drinks only
    //this is used when user drinks a drink and gets points for it
    const userRef = doc(db, "users", user.name);
    const userDoc = await getDoc(userRef);
    if (!userDoc.exists()) {
        console.warn("User not found:", user.name);
        return 0;
    }
    const data = userDoc.data();
    const currentPoints = data.points || 0;
    const newPoints = currentPoints + user.points;
    //update points in firestore
    await setDoc(userRef, { points: newPoints }, { merge: true });
    return newPoints;
}

export const getUser = async (userName: string) => {
    //get user from firestore
    const userRef = doc(db, "users", userName);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
        return userDoc.data();
    } else {
        console.log("No such user!");
        return null;
    }
}

export const getAllUsers = async () => {
  const usersRef = collection(db, "users"); // ✅ Get the whole collection
  const querySnapshot = await getDocs(usersRef);

  if (querySnapshot.empty) {
    console.log("No users found!");
    return [];
  }

  const users = querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));

  return users;
};