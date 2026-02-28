import { initializeApp, getApps, getApp } from 'firebase/app';
import { initializeAuth, getAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
    apiKey: "AIzaSyBmU205-2CeX39HOJAj4DaZYaX41hfQcV8",
    authDomain: "foundit-app-lostfound.firebaseapp.com",
    projectId: "foundit-app-lostfound",
    storageBucket: "foundit-app-lostfound.firebasestorage.app",
    messagingSenderId: "634141076662",
    appId: "1:634141076662:web:742bdf0fb8be75fa4f0a17",
};

let app;
let auth;

// Check if app is already initialized to prevent errors during Fast Refresh in Expo
if (getApps().length === 0) {
    app = initializeApp(firebaseConfig);
    auth = initializeAuth(app, {
        persistence: getReactNativePersistence(AsyncStorage),
    });
} else {
    app = getApp();
    auth = getAuth(app);
}

export { auth };
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
