// // src/components/auth/AuthContext.js
// import React, { createContext, useState, useContext, useEffect } from 'react';
// import { auth } from '../../utils/firebase';
// import { onAuthStateChanged } from 'firebase/auth';
//
// const AuthContext = createContext({});
//
// export const AuthProvider = ({ children }) => {
//     const [user, setUser] = useState(null);
//     const [loading, setLoading] = useState(true);
//
//     useEffect(() => {
//         const unsubscribe = onAuthStateChanged(auth, (user) => {
//             setUser(user);
//             setLoading(false);
//         });
//
//         return unsubscribe;
//     }, []);
//
//     return (
//         <AuthContext.Provider value={{ user, loading }}>
//             {!loading && children}
//         </AuthContext.Provider>
//     );
// };
//
// export const useAuth = () => useContext(AuthContext);


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