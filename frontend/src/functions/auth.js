import React, { useState, useContext, createContext, useEffect } from "react";
import { auth, provider } from "./firebase";
import {
    signInWithPopup,
    signOut as firebaseSignOut,
    onAuthStateChanged
} from "firebase/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const baseUrl = "https://notes-app-1037276530414.us-central1.run.app";

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            setUser(firebaseUser);
        });
        return () => unsubscribe();
    }, []);

    const signIn = async () => {
        try {
            const result = await signInWithPopup(auth, provider);


            setUser(await result.user);

            // get if user exists
            const response = await fetch(`${baseUrl}/api/users/${result.user.uid}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            // if user does not exist, add new user
            if (!response.ok) {
                // adding new user
                try {
                    const response = await fetch(`${baseUrl}/api/users`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            user_id: result.user.uid,
                            email: result.user.email,
                            creeated_at: new Date().toISOString(),
                            num_notes: 0,
                        }),
                    });

                    if (!response.ok) {
                        throw new Error("Failed to add new user");
                    }

                } catch (error) {
                    console.error("Error adding user:", error);
                }
            }
        } catch (error) {
            console.error("Google Sign-In Error:", error);
        }
    };

    const signOut = async () => {
        await firebaseSignOut(auth);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={ { user, signIn, signOut } }>
            { children }
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
