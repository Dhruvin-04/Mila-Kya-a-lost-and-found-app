import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from './firebaseConfig';

/**
 * Validates that the email ends with .edu
 */
export const isCollegeEmail = (email) => {
    return email && email.trim().toLowerCase().endsWith('.edu');
};

/**
 * Register a new user with email/password and create Firestore profile
 */
export const registerUser = async (email, password, name, college) => {
    if (!isCollegeEmail(email)) {
        throw new Error('Please use a valid college email address ending with .edu');
    }

    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Create user profile in Firestore
    await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        name: name.trim(),
        email: email.trim().toLowerCase(),
        college: college.trim(),
        createdAt: serverTimestamp(),
    });

    return user;
};

/**
 * Login with email/password
 */
export const loginUser = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
};

/**
 * Sign out the current user
 */
export const logoutUser = async () => {
    await signOut(auth);
};

/**
 * Listen for auth state changes
 */
export const onAuthStateChange = (callback) => {
    return onAuthStateChanged(auth, callback);
};

/**
 * Get the current authenticated user
 */
export const getCurrentUser = () => {
    return auth.currentUser;
};

/**
 * Fetch user profile from Firestore
 */
export const getUserProfile = async (uid) => {
    const docRef = doc(db, 'users', uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
    }
    return null;
};
