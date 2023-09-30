import { createContext, useContext, useEffect, useState } from "react";
import { auth, onAuthStateChanged } from "./firebase"

const userContext = createContext()

export function useUser() {
    return useContext(userContext)
}

export function UserProvider({children}) {
    cosnt [user, setUser] = useState(null)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (onAuthUser) => {

        })
    }, [])
}


