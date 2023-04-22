import React, { useContext, useEffect, useState } from "react";
import { auth } from "../firebase";


const AuthContext = React.createContext();

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
    
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const signup = (email, password) => {
        return auth.createUserWithEmailAndPassword(email, password);    
    }

    const login = (email, password) => {
        return auth.signInWithEmailAndPassword(email, password);    
    }

    const logout = () => {
        return auth.signOut();   
    }

    const updateEmail = (email) => {
        return currentUser.updateEmail(email);    
    }

    const updatePassword = (password) => {
        return currentUser.updatePassword(password);   
    }

    const resetPassword = (email) => {
        return auth.sendPasswordResetEmail(email);   
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            setLoading(false);
        });
        
        return unsubscribe;
    },[]);
    
    const value = {
        currentUser,
        signup,
        login,
        logout,
        resetPassword,
        updateEmail,
        updatePassword
    }

    return (
        <AuthContext.Provider value={value} >
            {!loading && children}
        </AuthContext.Provider>
    );  
}

export default AuthContext;
