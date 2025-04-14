// auth.js
import React, { useState, useContext, createContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const signIn = (username) => {
        setUser({ name: username });
    };

    const signOut = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={ { user, signIn, signOut } }>
            { children }
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
