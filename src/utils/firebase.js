/**
 * @license
 * Copyright (c) 2024 Manjunath Patil, Devesh Jha, Ninad Hebbar
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Helper function to create user document
// In firebase.js
export const createUserDocument = async (user, additionalData = {}) => {
    if (!user) return;

    const userRef = doc(db, 'users', user.uid);
    const snapshot = await getDoc(userRef);

    if (!snapshot.exists()) {
        const { email } = user;
        const createdAt = new Date();

        try {
            console.log('Creating user document for:', user.uid); // Debug log
            await setDoc(userRef, {
                uid: user.uid,
                email,
                role: 'user', // Default role for new users
                createdAt,
                ...additionalData
            });
            console.log('User document created successfully'); // Debug log
        } catch (error) {
            console.error('Error creating user document:', error);
            throw error; // Rethrow to handle in the component
        }
    }

    return userRef;
};
