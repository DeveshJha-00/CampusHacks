
// import React, { createContext, useContext, useState, useEffect } from 'react';
// import { db, auth } from '../../utils/firebase';
// import {
//     collection,
//     query,
//     getDocs,
//     addDoc,
//     updateDoc,
//     doc,
//     orderBy,
//     Timestamp,
//     where
// } from 'firebase/firestore';
// import toast from 'react-hot-toast';

// const LostFoundContext = createContext();

// export const LostFoundProvider = ({ children }) => {
//     const [items, setItems] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         fetchItems();
//     }, []);

//     const fetchItems = async () => {
//         try {
//             const itemsQuery = query(
//                 collection(db, 'lostItems'),
//                 orderBy('createdAt', 'desc')
//             );
//             const querySnapshot = await getDocs(itemsQuery);
//             const itemsData = querySnapshot.docs.map(doc => ({
//                 id: doc.id,
//                 ...doc.data(),
//                 createdAt: doc.data().createdAt.toDate()
//             }));
//             setItems(itemsData);
//             setLoading(false);
//         } catch (error) {
//             console.error('Error fetching items:', error);
//             toast.error('Failed to load items');
//             setLoading(false);
//         }
//     };

//     const addItem = async (itemData) => {
//         try {
//             const itemRef = await addDoc(collection(db, 'lostItems'), {
//                 ...itemData,
//                 createdAt: Timestamp.now(),
//                 createdBy: auth.currentUser.uid,
//                 status: 'open',
//                 userEmail: auth.currentUser.email
//             });
//             toast.success('Item added successfully');
//             fetchItems();
//             return itemRef.id;
//         } catch (error) {
//             console.error('Error adding item:', error);
//             toast.error('Failed to add item');
//             throw error;
//         }
//     };

//     const updateItemStatus = async (itemId, status) => {
//         try {
//             const itemRef = doc(db, 'lostItems', itemId);
//             await updateDoc(itemRef, {
//                 status,
//                 updatedAt: Timestamp.now()
//             });
//             toast.success('Item status updated');
//             fetchItems();
//         } catch (error) {
//             console.error('Error updating item:', error);
//             toast.error('Failed to update item status');
//         }
//     };

//     return (
//         <LostFoundContext.Provider value={{
//             items,
//             loading,
//             addItem,
//             updateItemStatus,
//             refreshItems: fetchItems
//         }}>
//             {children}
//         </LostFoundContext.Provider>
//     );
// };

// export const useLostFound = () => useContext(LostFoundContext);

// import React, { createContext, useContext, useState, useEffect } from 'react';
// import { db, auth } from '../../utils/firebase';
// import {
//     collection,
//     query,
//     getDocs,
//     addDoc,
//     updateDoc,
//     doc,
//     orderBy,
//     Timestamp
// } from 'firebase/firestore';
// import toast from 'react-hot-toast';

// const LostFoundContext = createContext();

// export const LostFoundProvider = ({ children }) => {
//     const [items, setItems] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         fetchItems();
//     }, []);

//     const fetchItems = async () => {
//         try {
//             const itemsQuery = query(
//                 collection(db, 'lostItems'),
//                 orderBy('createdAt', 'desc')
//             );
//             const querySnapshot = await getDocs(itemsQuery);
//             const itemsData = querySnapshot.docs.map(doc => ({
//                 id: doc.id,
//                 ...doc.data(),
//                 createdAt: doc.data().createdAt.toDate()
//             }));
//             setItems(itemsData);
//             setLoading(false);
//         } catch (error) {
//             console.error('Error fetching items:', error);
//             toast.error('Failed to load items');
//             setLoading(false);
//         }
//     };

//     const addItem = async (itemData) => {
//         try {
//             const itemRef = await addDoc(collection(db, 'lostItems'), {
//                 ...itemData,
//                 createdAt: Timestamp.now(),
//                 createdBy: auth.currentUser.uid,
//                 status: 'open',
//                 userEmail: auth.currentUser.email,
//                 isAnswerApproved: false, // Default is not approved
//                 phoneNumber: itemData.contactMethod === 'phone' ? itemData.phoneNumber : null, // Store phone if phone is chosen
//                 verificationQuestion: itemData.type === 'found' ? itemData.verificationQuestion : null, // Store verification question for found items
//                 verificationAnswer: itemData.type === 'found' ? itemData.verificationAnswer : null // Store verification answer for found items
//             });
//             toast.success('Item added successfully');
//             fetchItems();
//             return itemRef.id;
//         } catch (error) {
//             console.error('Error adding item:', error);
//             toast.error('Failed to add item');
//             throw error;
//         }
//     };

//     const updateItemStatus = async (itemId, status, isAnswerApproved = null) => {
//         try {
//             const itemRef = doc(db, 'lostItems', itemId);
//             const updateData = { status, updatedAt: Timestamp.now() };
//             if (isAnswerApproved !== null) {
//                 updateData.isAnswerApproved = isAnswerApproved; // If we're updating answer approval status
//             }
//             await updateDoc(itemRef, updateData);
//             toast.success('Item status updated');
//             fetchItems();
//         } catch (error) {
//             console.error('Error updating item:', error);
//             toast.error('Failed to update item status');
//         }
//     };

//     const approveAnswer = async (itemId) => {
//         try {
//             const itemRef = doc(db, 'lostItems', itemId);
//             await updateDoc(itemRef, {
//                 isAnswerApproved: true, // Mark the verification answer as approved
//             });
//             toast.success('Answer approved');
//             fetchItems();
//         } catch (error) {
//             console.error('Error approving answer:', error);
//             toast.error('Failed to approve answer');
//         }
//     };

//     return (
//         <LostFoundContext.Provider value={{
//             items,
//             loading,
//             addItem,
//             updateItemStatus,
//             approveAnswer,
//             refreshItems: fetchItems
//         }}>
//             {children}
//         </LostFoundContext.Provider>
//     );
// };

// export const useLostFound = () => useContext(LostFoundContext);



import React, { createContext, useContext, useState, useEffect } from 'react';
import { db, auth } from '../../utils/firebase';
import {
    collection,
    query,
    getDocs,
    addDoc,
    updateDoc,
    doc,
    orderBy,
    Timestamp,
    where,
    getDoc
} from 'firebase/firestore';
import toast from 'react-hot-toast';

const LostFoundContext = createContext();

export const LostFoundProvider = ({ children }) => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchAnswers = async (itemId) => {
        try {
            const answersQuery = query(
                collection(db, 'itemAnswers'),
                where('itemId', '==', itemId)
            );
            const querySnapshot = await getDocs(answersQuery);
            return querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
        } catch (error) {
            console.error('Error fetching answers:', error);
            return [];
        }
    };

    const fetchItems = async () => {
        try {
            const itemsQuery = query(
                collection(db, 'lostItems'),
                orderBy('createdAt', 'desc')
            );
            const querySnapshot = await getDocs(itemsQuery);
            
            // Fetch answers for each item
            const itemsWithAnswers = await Promise.all(
                querySnapshot.docs.map(async (doc) => {
                    const answers = await fetchAnswers(doc.id);
                    return {
                        id: doc.id,
                        ...doc.data(),
                        createdAt: doc.data().createdAt.toDate(),
                        answers
                    };
                })
            );

            setItems(itemsWithAnswers);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching items:', error);
            toast.error('Failed to load items');
            setLoading(false);
        }
    };

    const addItem = async (itemData) => {
        try {
            const itemRef = await addDoc(collection(db, 'lostItems'), {
                ...itemData,
                createdAt: Timestamp.now(),
                createdBy: auth.currentUser.uid,
                status: 'open',
                userEmail: auth.currentUser.email
            });
            toast.success('Item added successfully');
            fetchItems();
            return itemRef.id;
        } catch (error) {
            console.error('Error adding item:', error);
            toast.error('Failed to add item');
            throw error;
        }
    };

    const updateItemStatus = async (itemId, status) => {
        try {
            const itemRef = doc(db, 'lostItems', itemId);
            await updateDoc(itemRef, {
                status,
                updatedAt: Timestamp.now()
            });
            toast.success('Item status updated');
            fetchItems();
        } catch (error) {
            console.error('Error updating item:', error);
            toast.error('Failed to update item status');
        }
    };

    const submitAnswer = async (itemId, answer) => {
        try {
            // Check if user has already submitted an answer
            const existingAnswersQuery = query(
                collection(db, 'itemAnswers'),
                where('itemId', '==', itemId),
                where('userEmail', '==', auth.currentUser.email)
            );
            const existingAnswers = await getDocs(existingAnswersQuery);

            if (!existingAnswers.empty) {
                // Update existing answer if it was rejected
                const existingAnswer = existingAnswers.docs[0];
                if (existingAnswer.data().rejected) {
                    await updateDoc(doc(db, 'itemAnswers', existingAnswer.id), {
                        answer,
                        updatedAt: Timestamp.now(),
                        approved: false,
                        rejected: false
                    });
                } else {
                    throw new Error('You have already submitted an answer');
                }
            } else {
                // Create new answer
                await addDoc(collection(db, 'itemAnswers'), {
                    itemId,
                    answer,
                    userEmail: auth.currentUser.email,
                    createdAt: Timestamp.now(),
                    approved: false,
                    rejected: false
                });
            }

            toast.success('Answer submitted successfully');
            fetchItems();
        } catch (error) {
            console.error('Error submitting answer:', error);
            toast.error(error.message || 'Failed to submit answer');
            throw error;
        }
    };

    const approveAnswer = async (itemId, answerId, isApproved) => {
        try {
            // First verify that the current user is the item owner
            const itemRef = doc(db, 'lostItems', itemId);
            const itemDoc = await getDoc(itemRef);
            
            if (!itemDoc.exists()) {
                throw new Error('Item not found');
            }

            const itemData = itemDoc.data();
            if (itemData.userEmail !== auth.currentUser.email && auth.currentUser.role !== 'admin') {
                throw new Error('Unauthorized to approve answers');
            }

            // Update the answer
            const answerRef = doc(db, 'itemAnswers', answerId);
            await updateDoc(answerRef, {
                approved: isApproved,
                rejected: !isApproved,
                reviewedAt: Timestamp.now(),
                reviewedBy: auth.currentUser.email
            });

            toast.success(`Answer ${isApproved ? 'approved' : 'rejected'} successfully`);
            fetchItems();
        } catch (error) {
            console.error('Error processing answer:', error);
            toast.error(error.message || 'Failed to process answer');
            throw error;
        }
    };

    // Helper function to check if a user has approved access to an item
    const hasApprovedAccess = (item) => {
        if (!auth.currentUser) return false;
        
        // Item owner or admin always has access
        if (item.userEmail === auth.currentUser.email || auth.currentUser.role === 'admin') {
            return true;
        }

        // Check if user has an approved answer
        return item.answers?.some(
            answer => answer.userEmail === auth.currentUser.email && answer.approved
        );
    };

    return (
        <LostFoundContext.Provider value={{
            items,
            loading,
            addItem,
            updateItemStatus,
            refreshItems: fetchItems,
            submitAnswer,
            approveAnswer,
            hasApprovedAccess
        }}>
            {children}
        </LostFoundContext.Provider>
    );
};

export const useLostFound = () => useContext(LostFoundContext);
