import { initializeApp, getApps, getApp } from 'firebase/app';
import { initializeAuth, getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

const firebaseConfig = {
    apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
};

let app;
let auth;

const initializeFirebaseAuth = (firebaseApp) => {
    if (Platform.OS === 'web') {
        return getAuth(firebaseApp);
    }

    try {
        const { getReactNativePersistence } = require('firebase/auth/react-native');
        return initializeAuth(firebaseApp, {
            persistence: getReactNativePersistence(AsyncStorage),
        });
    } catch (error) {
        console.warn('Falling back to default Firebase Auth initialization:', error?.message || error);
        return getAuth(firebaseApp);
    }
};

// Check if app is already initialized to prevent errors during Fast Refresh in Expo
if (getApps().length === 0) {
    app = initializeApp(firebaseConfig);
    auth = initializeFirebaseAuth(app);
} else {
    app = getApp();
    auth = getAuth(app);
}

export { auth };
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
