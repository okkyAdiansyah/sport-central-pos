import React, { createContext, useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import type { User } from "firebase/auth";

interface AuthProviderProps{
    children : React.ReactNode
}

type AuthContextType = {
    user : User | null
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * User state observer
 * @returns 
 */
export const AuthProvider = ({children} : AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            setUser(user);
        })

        return () => unsub()
    }, []);

    return (
        <AuthContext.Provider value={{user}}>
            {children}
        </AuthContext.Provider>
    )
}