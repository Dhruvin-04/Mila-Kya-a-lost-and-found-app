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

import { db, storage } from './firebaseConfig';

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
    try {
        // TODO: Replace with your actual Cloudinary details
        // You can find these in your Cloudinary Dashboard under Settings -> Upload
        const CLOUDINARY_CLOUD_NAME = 'YOUR_CLOUD_NAME';
        const CLOUDINARY_UPLOAD_PRESET = 'YOUR_UNSIGNED_UPLOAD_PRESET';

        // Create form data for the upload
        const data = new FormData();

        // Extract filename from the URI
        const filename = imageUri.substring(imageUri.lastIndexOf('/') + 1);

        // In React Native, append a file to FormData with this specific structure
        data.append('file', {
            uri: imageUri,
            type: 'image/jpeg',
            name: filename || 'upload.jpg',
        });

        data.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
        // Optional: you can specify a folder name
        // data.append('folder', 'foundit_items'); 

        const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, {
            method: 'POST',
            body: data,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
            },
        });

        const result = await response.json();

        if (result.secure_url) {
            return result.secure_url; // Return the Cloudinary URL
        } else {
            console.error('Cloudinary upload error payload:', result);
            throw new Error(result.error?.message || 'Failed to upload image to Cloudinary');
        }
    } catch (error) {
        console.error('Exception uploading to Cloudinary:', error.message);
        throw error;
    }
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
