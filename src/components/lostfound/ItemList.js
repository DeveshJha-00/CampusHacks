/**
 * @license
 * Copyright (c) 2024 Manjunath Patil, Devesh Jha, Ninad Hebbar, Ramya Cherukupalli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useState } from 'react';
import { useLostFound } from './LostFoundContext';
import ItemCard from './ItemCard';
import AddItem from './AddItem';
import { useTheme } from '../../contexts/ThemeContext';

const ItemList = () => {
    const { isDarkMode } = useTheme();
    const { items, loading } = useLostFound();
    const [showAddItem, setShowAddItem] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedType, setSelectedType] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    const inputStyles = isDarkMode ? {
        backgroundColor: '#374151',
        color: '#e2e8f0',
        borderColor: '#4b5563'
    } : {
        backgroundColor: '#ffffff',
        color: '#000000',
        borderColor: '#e5e7eb'
    };

    const filteredItems = items.filter(item => {
        const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
        const matchesType = selectedType === 'all' || item.type === selectedType;
        const matchesSearch =
            item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesType && matchesSearch;
    });

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500" />
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header Section */}
            <div className="flex justify-between items-center mb-8">
                <h1 className={`text-2xl font-bold mb-6 ${
                    isDarkMode ? 'text-gray-100' : 'text-gray-900'
                }`}>Lost & Found Items</h1>
                <button
                    onClick={() => setShowAddItem(true)}
                    className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
                >
                    Report Item
                </button>
            </div>


            <div className="mb-8 space-y-4 sm:space-y-0 sm:flex sm:gap-4">
                <div className="flex-1">
                    <input
                        type="text"
                        placeholder="Search items..."
                        className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                            isDarkMode ? 'placeholder-gray-400' : 'placeholder-gray-500'
                        }`}
                        style={inputStyles}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <select
                    className="w-full sm:w-auto px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    style={inputStyles}
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    <option value="all">All Categories</option>
                    <option value="electronics">Electronics</option>
                    <option value="clothing">Clothing</option>
                    <option value="accessories">Accessories</option>
                    <option value="documents">Documents</option>
                    <option value="other">Other</option>
                </select>
                <select
                    className="w-full sm:w-auto px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    style={inputStyles}
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                >
                    <option value="all">All Types</option>
                    <option value="lost">Lost Items</option>
                    <option value="found">Found Items</option>
                </select>
            </div>


            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.map(item => (
                    <ItemCard key={item.id} item={item} />
                ))}
            </div>


            {showAddItem && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className={`rounded-lg p-6 max-w-2xl w-full mx-4 ${
                        isDarkMode ? 'bg-gray-800' : 'bg-white'
                    }`}>
                        <AddItem onClose={() => setShowAddItem(false)} />
                    </div>
                </div>
            )}


            {filteredItems.length === 0 && (
                <div className="text-center py-12">
                    <h3 className={`text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        No items found
                    </h3>
                    <p className={`mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        Try adjusting your filters or search query
                    </p>
                </div>
            )}
        </div>
    );
};

export default ItemList;


// import React, { useState } from 'react';
// import { useLostFound } from './LostFoundContext';
// import ItemCard from './ItemCard';
// import AddItem from './AddItem';
// import { useTheme } from '../../contexts/ThemeContext';

// const ItemList = () => {
//     const { isDarkMode } = useTheme();
//     const { items, loading, approveAnswer } = useLostFound();  // Added approveAnswer function
//     const [showAddItem, setShowAddItem] = useState(false);
//     const [selectedCategory, setSelectedCategory] = useState('all');
//     const [selectedType, setSelectedType] = useState('all');
//     const [searchQuery, setSearchQuery] = useState('');

//     const inputStyles = isDarkMode ? {
//         backgroundColor: '#374151',
//         color: '#e2e8f0',
//         borderColor: '#4b5563'
//     } : {
//         backgroundColor: '#ffffff',
//         color: '#000000',
//         borderColor: '#e5e7eb'
//     };

//     const filteredItems = items.filter(item => {
//         const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
//         const matchesType = selectedType === 'all' || item.type === selectedType;
//         const matchesSearch =
//             item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//             item.description.toLowerCase().includes(searchQuery.toLowerCase());
//         return matchesCategory && matchesType && matchesSearch;
//     });

//     if (loading) {
//         return (
//             <div className="flex justify-center items-center h-64">
//                 <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500" />
//             </div>
//         );
//     }

//     return (
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//             {/* Header Section */}
//             <div className="flex justify-between items-center mb-8">
//                 <h1 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
//                     Lost & Found Items
//                 </h1>
//                 <button
//                     onClick={() => setShowAddItem(true)}
//                     className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
//                 >
//                     Report Item
//                 </button>
//             </div>

//             {/* Filter Section */}
//             <div className="mb-8 space-y-4 sm:space-y-0 sm:flex sm:gap-4">
//                 <div className="flex-1">
//                     <input
//                         type="text"
//                         placeholder="Search items..."
//                         className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 ${isDarkMode ? 'placeholder-gray-400' : 'placeholder-gray-500'}`}
//                         style={inputStyles}
//                         value={searchQuery}
//                         onChange={(e) => setSearchQuery(e.target.value)}
//                     />
//                 </div>
//                 <select
//                     className="w-full sm:w-auto px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
//                     style={inputStyles}
//                     value={selectedCategory}
//                     onChange={(e) => setSelectedCategory(e.target.value)}
//                 >
//                     <option value="all">All Categories</option>
//                     <option value="electronics">Electronics</option>
//                     <option value="clothing">Clothing</option>
//                     <option value="accessories">Accessories</option>
//                     <option value="documents">Documents</option>
//                     <option value="other">Other</option>
//                 </select>
//                 <select
//                     className="w-full sm:w-auto px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
//                     style={inputStyles}
//                     value={selectedType}
//                     onChange={(e) => setSelectedType(e.target.value)}
//                 >
//                     <option value="all">All Types</option>
//                     <option value="lost">Lost Items</option>
//                     <option value="found">Found Items</option>
//                 </select>
//             </div>

//             {/* Items List */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {filteredItems.map(item => (
//                     <div key={item.id} className="relative">
//                         <ItemCard item={item} />
                        
//                         {/* If it's a found item and the answer isn't approved, show the approve button */}
//                         {item.type === 'found' && !item.isAnswerApproved && (
//                             <button
//                                 onClick={() => approveAnswer(item.id)}
//                                 className="absolute top-0 right-0 bg-yellow-500 text-white py-1 px-4 rounded-md hover:bg-yellow-600"
//                             >
//                                 Approve Answer
//                             </button>
//                         )}
//                     </div>
//                 ))}
//             </div>

//             {/* Add Item Modal */}
//             {showAddItem && (
//                 <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//                     <div className={`rounded-lg p-6 max-w-2xl w-full mx-4 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
//                         <AddItem onClose={() => setShowAddItem(false)} />
//                     </div>
//                 </div>
//             )}

//             {/* No items found */}
//             {filteredItems.length === 0 && (
//                 <div className="text-center py-12">
//                     <h3 className={`text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
//                         No items found
//                     </h3>
//                     <p className={`mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
//                         Try adjusting your filters or search query
//                     </p>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default ItemList;
