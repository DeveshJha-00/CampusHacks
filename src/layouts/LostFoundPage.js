// // src/layouts/LostFoundPage.js
// import React, { useEffect, useState } from 'react';
// import { collection, getDocs } from 'firebase/firestore';
// import { db } from '../utils/firebase';
// import AddLostFoundItem from '../components/lostfound/AddLostFoundItem';


// const LostFoundPage = () => {
//     const [items, setItems] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {

//         const fetchItems = async () => {
//             try {
//                 const itemsCollection = collection(db, 'lostFoundItems');
//                 const itemsSnapshot = await getDocs(itemsCollection);
//                 const itemsList = itemsSnapshot.docs.map((doc) => ({
//                     id: doc.id,
//                     ...doc.data(),
//                 }));
//                 setItems(itemsList);
//             } catch (error) {
//                 console.error('Error fetching items:', error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchItems();
//     }, []);

//     return (
//         <div className="max-w-4xl mx-auto p-6 space-y-8">
//             <h1 className="text-3xl font-bold text-center text-gray-800">Lost & Found</h1>

//             <AddLostFoundItem />

//             {loading ? (
//                 <p className="text-center text-lg text-gray-500">Loading items...</p>
//             ) : items.length === 0 ? (
//                 <p className="text-center text-lg text-gray-500">No items have been reported yet.</p>
//             ) : (
//                 <ul className="space-y-4">
//                     {items.map((item) => (
//                         <li key={item.id} className="p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition duration-300">
//                             <h2 className="text-xl font-semibold text-gray-800">{item.title}</h2>
//                             <p className="text-gray-600">{item.description}</p>
//                         </li>
//                     ))}
//                 </ul>
//             )}
//         </div>
//     );
// };

// export default LostFoundPage;


// src/layouts/LostFoundPage.js
import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { db, auth } from '../utils/firebase';
import AddLostFoundItem from '../components/lostfound/AddLostFoundItem';

const LostFoundPage = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
            } else {
                console.error('User is not authenticated');
                setUser(null);
                setLoading(false); // Stop loading since no fetch will occur
            }
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (!user) return; // Don't fetch items if the user is not authenticated

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
    }, [user]);

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-8">
            <h1 className="text-3xl font-bold text-center text-gray-800">Lost & Found</h1>

            {user ? (
                <>
                    <AddLostFoundItem />

                    {loading ? (
                        <p className="text-center text-lg text-gray-500">Loading items...</p>
                    ) : items.length === 0 ? (
                        <p className="text-center text-lg text-gray-500">No items have been reported yet.</p>
                    ) : (
                        <ul className="space-y-4">
                            {items.map((item) => (
                                <li
                                    key={item.id}
                                    className="p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition duration-300"
                                >
                                    <h2 className="text-xl font-semibold text-gray-800">{item.title}</h2>
                                    <p className="text-gray-600">{item.description}</p>
                                </li>
                            ))}
                        </ul>
                    )}
                </>
            ) : (
                <p className="text-center text-lg text-gray-500">Please log in to view and add items.</p>
            )}
        </div>
    );
};

export default LostFoundPage;

