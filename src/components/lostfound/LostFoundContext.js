// src/components/lostfound/LostFoundContext.js
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
    where
} from 'firebase/firestore';
import toast from 'react-hot-toast';

const LostFoundContext = createContext();

export const LostFoundProvider = ({ children }) => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            const itemsQuery = query(
                collection(db, 'lostItems'),
                orderBy('createdAt', 'desc')
            );
            const querySnapshot = await getDocs(itemsQuery);
            const itemsData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                createdAt: doc.data().createdAt.toDate()
            }));
            setItems(itemsData);
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

    return (
        <LostFoundContext.Provider value={{
            items,
            loading,
            addItem,
            updateItemStatus,
            refreshItems: fetchItems
        }}>
            {children}
        </LostFoundContext.Provider>
    );
};

export const useLostFound = () => useContext(LostFoundContext);