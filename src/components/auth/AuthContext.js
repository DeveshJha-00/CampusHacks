/**
 * @license
 * Copyright (c) 2024 Manjunath Patil, Devesh Jha, Ninad Hebbar, Ramya Cherukupalli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { createContext, useState, useContext, useEffect } from 'react';
import { auth, db } from '../../utils/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userRole, setUserRole] = useState(null);

    // In AuthContext.js
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            console.log('Auth state changed:', user?.uid); // Debug log
            if (user) {
                const userRef = doc(db, 'users', user.uid);
                const userSnap = await getDoc(userRef);
                console.log('User document exists:', userSnap.exists()); // Debug log
                console.log('User data:', userSnap.data()); // Debug log
                if (userSnap.exists()) {
                    setUserRole(userSnap.data().role);
                }
            } else {
                setUserRole(null);
            }
            setUser(user);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading, userRole }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);