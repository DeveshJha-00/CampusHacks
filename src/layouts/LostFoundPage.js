// src/layouts/LostFoundPage.js
import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../utils/firebase';
import AddLostFoundItem from '../components/lostfound/AddLostFoundItem';

const LostFoundPage = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const itemsCollection = collection(db, 'lostFoundItems');
                const itemsSnapshot = await getDocs(itemsCollection);
                const itemsList = itemsSnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setItems(itemsList);
            } catch (error) {
                console.error('Error fetching items:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchItems();
    }, []);

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-8">
            <h1 className="text-3xl font-bold text-center text-gray-800">Lost & Found</h1>

            <AddLostFoundItem />

            {loading ? (
                <p className="text-center text-lg text-gray-500">Loading items...</p>
            ) : items.length === 0 ? (
                <p className="text-center text-lg text-gray-500">No items have been reported yet.</p>
            ) : (
                <ul className="space-y-4">
                    {items.map((item) => (
                        <li key={item.id} className="p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition duration-300">
                            <h2 className="text-xl font-semibold text-gray-800">{item.title}</h2>
                            <p className="text-gray-600">{item.description}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default LostFoundPage;
