import React, { createContext, useContext, useState, useEffect } from 'react';
import {
    onAuthStateChange,
    getUserProfile,
    loginUser,
    registerUser,
    logoutUser,
} from '../services/authService';

const AuthContext = createContext(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChange(async (firebaseUser) => {
            if (firebaseUser) {
                setUser(firebaseUser);
                // Fetch user profile from Firestore
                try {
                    const profile = await getUserProfile(firebaseUser.uid);
                    setUserProfile(profile);
                } catch (error) {
                    console.error('Error fetching user profile:', error);
                    setUserProfile(null);
                }
            } else {
                setUser(null);
                setUserProfile(null);
            }
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const login = async (email, password) => {
        const firebaseUser = await loginUser(email, password);
        const profile = await getUserProfile(firebaseUser.uid);
        setUserProfile(profile);
        return firebaseUser;
    };

    const register = async (email, password, name, college) => {
        const firebaseUser = await registerUser(email, password, name, college);
        const profile = await getUserProfile(firebaseUser.uid);
        setUserProfile(profile);
        return firebaseUser;
    };

    const logout = async () => {
        await logoutUser();
        setUser(null);
        setUserProfile(null);
    };

    const value = {
        user,
        userProfile,
        loading,
        login,
        register,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
