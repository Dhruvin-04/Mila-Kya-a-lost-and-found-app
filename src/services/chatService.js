import {
    collection,
    addDoc,
    doc,
    getDoc,
    getDocs,
    query,
    where,
    orderBy,
    onSnapshot,
    serverTimestamp,
    updateDoc,
    limit,
} from 'firebase/firestore';
import { db } from './firebaseConfig';

/**
 * Get or create a chat between two users about a specific item
 */
export const getOrCreateChat = async (itemId, userId, otherUserId) => {
    // Try to find existing chat between these users for this item
    const q = query(
        collection(db, 'chats'),
        where('itemId', '==', itemId),
        where('participants', 'array-contains', userId)
    );

    const snapshot = await getDocs(q);

    // Check if any of these chats include the other user
    for (const chatDoc of snapshot.docs) {
        const data = chatDoc.data();
        if (data.participants.includes(otherUserId)) {
            return { id: chatDoc.id, ...data };
        }
    }

    // Create new chat
    const chatRef = await addDoc(collection(db, 'chats'), {
        itemId,
        participants: [userId, otherUserId],
        createdAt: serverTimestamp(),
        lastMessage: '',
        lastMessageAt: serverTimestamp(),
    });

    const newChatSnap = await getDoc(chatRef);
    return { id: newChatSnap.id, ...newChatSnap.data() };
};

/**
 * Subscribe to messages in a chat (real-time)
 */
export const subscribeToMessages = (chatId, callback) => {
    const q = query(
        collection(db, 'chats', chatId, 'messages'),
        orderBy('createdAt', 'asc')
    );

    return onSnapshot(q, (snapshot) => {
        const messages = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
            timestamp: doc.data().createdAt?.toDate?.()
                ? doc.data().createdAt.toDate().toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                })
                : '',
        }));
        callback(messages);
    }, (error) => {
        console.error('Error subscribing to messages:', error);
        callback([]);
    });
};

/**
 * Send a message in a chat
 */
export const sendMessage = async (chatId, senderId, text) => {
    // Add message to subcollection
    await addDoc(collection(db, 'chats', chatId, 'messages'), {
        senderId,
        text,
        createdAt: serverTimestamp(),
    });

    // Update last message on chat document
    const chatRef = doc(db, 'chats', chatId);
    await updateDoc(chatRef, {
        lastMessage: text,
        lastMessageAt: serverTimestamp(),
    });
};
