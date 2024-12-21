// src/components/lostfound/AddLostFoundItem.js
import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../utils/firebase';
import { toast } from 'react-hot-toast';

const AddLostFoundItem = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !description) {
            toast.error('Please fill out all fields.');
            return;
        }

        setLoading(true);

        try {
            const docRef = await addDoc(collection(db, 'lostFoundItems'), {
                title,
                description,
                timestamp: new Date(),
            });
            toast.success('Item added successfully!');
            console.log('Document written with ID: ', docRef.id);

            // Clear the form
            setTitle('');
            setDescription('');
        } catch (error) {
            console.error('Error adding document: ', error);
            toast.error('Failed to add item. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg space-y-6">
            <h2 className="text-2xl font-semibold text-center">Add Lost/Found Item</h2>
            
            <div className="space-y-2">
                <label htmlFor="title" className="block text-lg font-medium">Title</label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter the item title"
                    required
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
            </div>
            
            <div className="space-y-2">
                <label htmlFor="description" className="block text-lg font-medium">Description</label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter a brief description"
                    required
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                ></textarea>
            </div>
            
            <div className="flex justify-center">
                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-3 px-4 text-white font-semibold rounded-lg ${loading ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700'} focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                >
                    {loading ? 'Adding...' : 'Add Item'}
                </button>
            </div>
        </form>
    );
};

export default AddLostFoundItem;

