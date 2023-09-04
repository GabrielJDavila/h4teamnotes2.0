// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { getFirestore, collection, addDoc, doc, deleteDoc, getDocs, query, orderBy, Timestamp } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
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
export const clientNotes = collection(db, "clientnotes")
export const workoutNotes = collection(db, "workoutnotes")
export const gymNotes = collection(db, "gymnotes")
export const coachingCards = collection(db, "coachingcards")

// create new user
// export async function createUser(email, password) {
//     try {
//         const userCredential = await createUserWithEmailAndPassword(auth, email, password)
//         console.log(userCredential.user)
//     }
//     catch(e) {
//         console.log("error creating account: ", e)
//     }
// }

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

// delete item from collection in firestore
export async function deleteItem(collectionType, itemId) {
    try {
        const itemRef = doc(collectionType, itemId)
        await deleteDoc(itemRef)
    } catch(e) {
        console.log("error deleting item: ", e)
    }
}