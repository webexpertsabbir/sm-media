import React, { createContext, useEffect, useState } from 'react';
import {createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile} from 'firebase/auth';
import app from '../firebase/firebase.config';


export const AuthContext = createContext();
const auth = getAuth(app)

const AuthProvider = ({children}) => {
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);
    
    const createUser = (email, password) =>{
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const login = (email, password) =>{
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const updateUser = (userInfo) =>{
        return updateProfile(auth.currentUser, userInfo);
    }

    const logOut = () =>{
        setLoading(true)
        return signOut(auth)
    }

    const signIn =(email, password) =>{
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    const providerLogin = (provider) => {
        setLoading(true)
        return signInWithPopup(auth, provider);
    }



    useEffect( () => {

        const unsubscribe = onAuthStateChanged(auth, currentUser =>{
            console.log('user observer');
            setUser(currentUser);
            setLoading(false)
        })

        return () => unsubscribe();
    }, [])


    const authInfo = {
        createUser,
        login,
        user,
        updateUser,
        logOut,
        loading,
        signIn,
        providerLogin,


    }
    return (
        <div>
            <AuthContext.Provider value={authInfo}>
                {children}
            </AuthContext.Provider>
        </div>
    );
};

export default AuthProvider;