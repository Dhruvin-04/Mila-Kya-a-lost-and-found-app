import {
    collection,
    addDoc,
    doc,
    getDoc,
    query,
    orderBy,
    onSnapshot,
    serverTimestamp,
} from 'firebase/firestore';

import { db } from './firebaseConfig';
import { uploadImageToCloudinary } from './cloudinaryService';

/**
 * Subscribe to items collection with real-time updates
 * Returns an unsubscribe function
 */
export const subscribeToItems = (callback) => {
    const q = query(collection(db, 'items'), orderBy('createdAt', 'desc'));
    return onSnapshot(q, (snapshot) => {
        const items = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
            // Convert Firestore timestamp to JS Date for display
            timestamp: doc.data().createdAt?.toDate?.() || new Date(),
        }));
        callback(items);
    }, (error) => {
        console.error('Error subscribing to items:', error);
        callback([]);
    });
};

/**
 * Get a single item by ID
 */
export const getItemById = async (itemId) => {
    const docRef = doc(db, 'items', itemId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        const data = docSnap.data();
        return {
            id: docSnap.id,
            ...data,
            timestamp: data.createdAt?.toDate?.() || new Date(),
        };
    }
    return null;
};

/**
 * Upload an image to Cloudinary and return the secure URL.
 * Accepts the local image URI from ImagePicker.
 */
export const uploadImage = async (imageUri) => {
    return uploadImageToCloudinary(imageUri, { folder: 'foundit/items' });
};

/**
 * Create a new item in Firestore
 */
export const createItem = async (itemData, imageUri) => {
    let imageUrl = null;

    if (imageUri) {
        imageUrl = await uploadImage(imageUri);
    }

    const docRef = await addDoc(collection(db, 'items'), {
        title: itemData.title,
        description: itemData.description,
        type: itemData.type,
        location: itemData.location,
        category: itemData.category || '',
        imageUri: imageUrl || '',
        reportedBy: itemData.reportedBy,
        createdAt: serverTimestamp(),
    });

    return docRef.id;
};

/**
 * Fetch user info by UID (for showing reporter details)
 */
export const getUserById = async (uid) => {
    if (!uid) return null;
    const docRef = doc(db, 'users', uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
    }
    return null;
};
