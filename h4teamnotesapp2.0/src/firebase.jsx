
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { getStorage } from "firebase/storage"
import { getMessaging, getToken } from "firebase/messaging"
import "firebase/messaging"
import { getFirestore, collection, addDoc, doc, deleteDoc, updateDoc, getDocs, getDoc, query, orderBy, Timestamp } from "firebase/firestore"


// my web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCUSMQjhU9byPCscrsLoq4IXv55H-SASZk",
  authDomain: "h4teamnotesapp.firebaseapp.com",
  projectId: "h4teamnotesapp",
  storageBucket: "h4teamnotesapp.appspot.com",
  messagingSenderId: "532955235095",
  appId: "1:532955235095:web:b86b2785a110548d522d52"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// references
export const auth = getAuth(app)
const db = getFirestore(app)
export const storage = getStorage(app)
export const clientNotes = collection(db, "clientnotes")
export const workoutNotes = collection(db, "workoutnotes")
export const gymNotes = collection(db, "gymnotes")
export const coachingCards = collection(db, "coachingcards")
export const users = collection(db, "users")
export const messaging = getMessaging(app)

// requesting to send notifications
export function requestingPermission() {
    console.log("requesting permission...")
    Notification.requestPermission().then((permission) => {
        if(permission === "granted") {
            // retrieving token
            getToken(messaging, { vapidKey: "BPL0X0u0PoOB_38lTQESg8ICbv2wkkc8quEZvJx27oWKimwAUOmMUjqD_ppCLU97VMK4LGT-i2KH0P3wCI5CqjQ" }).then((currentToken) => {
                if(currentToken) {
                    console.log(currentToken)
                } else {
                    console.log("no token")
                }
            }).catch((err) => {
                console.log("error occurred: ", err)
            })
        }
    })
}


// sign in app
export async function signIn(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
    }
    catch(e) {
        alert("error logging in: ", e)
    }
}

// sign out app
export const logout = async () => {
    await signOut(auth)
}

// add user info to firestore
export async function addUser(users, userData) {
    try {
        const docRef = await addDoc(users, userData)
    } catch(e) {
        console.error("error adding user: ", e)
    }
}

// add to collection in firestore
export async function addToCollection(title, date, text, collectionType) {
    try {
        const docRef = await addDoc(collectionType, {
            title: title,
            date: date,
            text: text
        })
    } catch(e) {
        console.error("error adding doc: ", e)
    }
}

// get collections from firestore
export async function getFromCollection(collectionType) {
    const q = query(collectionType, orderBy("date"))
    const snapshot = await getDocs(q)
    const collections = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))
    return collections
}

// get single doc from firestore
export async function retrieveDoc(collectionType, itemId) {
    const docRef = doc(collectionType, itemId)
    const docSnap = await getDoc(docRef)
    if(docSnap.exists()) {
         console.log(docSnap.data())
    }
    return docSnap
}

// edit item fron collection in firestore
export async function editItem(collectionType, itemId, newUpdate) {
    try {
        const itemRef = doc(collectionType, itemId)
        await updateDoc(itemRef, {
            text: newUpdate
        })
    } catch(e) {
        console.log(e)
    }
}

// delete item from collection in firestore
export async function deleteItem(collectionType, itemId) {
    try {
        const itemRef = doc(collectionType, itemId)
        await deleteDoc(itemRef)
    } catch(e) {
        console.log("error deleting item: ", e)
    }
}