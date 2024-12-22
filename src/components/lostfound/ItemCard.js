
import React from 'react';
import { format } from 'date-fns';
import { useLostFound } from './LostFoundContext';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../auth/AuthContext';

const ItemCard = ({ item }) => {
    const { isDarkMode } = useTheme();
    const { updateItemStatus } = useLostFound();
    const { user } = useAuth();

    const categoryIcons = {
        electronics: '📱',
        clothing: '👕',
        accessories: '👜',
        documents: '📄',
        other: '📦'
    };

    const statusColors = {
        open: 'bg-green-100 text-green-800',
        closed: 'bg-gray-100 text-gray-800',
        inProgress: 'bg-yellow-100 text-yellow-800'
    };

    return (
        <div className={`${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} 
            rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300`}>
            <div className="p-6">
                {/* Status Badge */}
                <div className="flex justify-between items-start mb-4">
          <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${statusColors[item.status]}`}>
            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
          </span>
                    <span className="text-2xl">
            {categoryIcons[item.category]}
          </span>
                </div>

                {/* Title */}
                <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {item.title}
                </h3>


                <span className={`inline-block mt-2 px-2 py-1 text-sm rounded ${
                    item.type === 'lost' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                }`}>
          {item.type === 'lost' ? 'Lost Item' : 'Found Item'}
        </span>


                <div className={`mt-4 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    <p>
                        <span className="font-medium">Date:</span>{' '}
                        {format(item.createdAt, 'MMM d, yyyy')}
                    </p>
                    <p>
                        <span className="font-medium">Location:</span>{' '}
                        {item.location}
                    </p>
                </div>


                <p className={`mt-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {item.description}
                </p>


                <div className={`mt-6 pt-4 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                    <p className="text-sm text-gray-600">
                        <span className="font-medium">Contact:</span>{' '}
                        {item.userEmail}
                    </p>
                </div>


                {(user?.email === item.userEmail || user?.role === 'admin') && (
                    <div className="mt-4 flex space-x-2">
                        {item.status === 'open' && (
                            <button
                                onClick={() => updateItemStatus(item.id, 'closed')}
                                className="px-3 py-1 text-sm bg-primary-600 text-white rounded-md hover:bg-primary-700"
                            >
                                Mark as Resolved
                            </button>
                        )}
                        {item.status === 'closed' && (
                            <button
                                onClick={() => updateItemStatus(item.id, 'open')}
                                className="px-3 py-1 text-sm bg-gray-600 text-white rounded-md hover:bg-gray-700"
                            >
                                Reopen
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ItemCard;