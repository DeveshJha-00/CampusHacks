// src/components/events/AddEvent.js
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useEvents } from './EventContext';
import toast from 'react-hot-toast';

const AddEvent = ({ onClose }) => {
    const { addEvent, userRole } = useEvents();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        date: new Date(),
        location: '',
        registrationUrl: '',
        category: 'general'
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (userRole !== 'admin') {
            toast.error('Only admins can add events');
            return;
        }

        try {
            await addEvent(formData);
            onClose();
        } catch (error) {
            console.error('Error adding event:', error);
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-xl max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-primary-900 mb-6">Add New Event</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Event Title
                    </label>
                    <input
                        type="text"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                        value={formData.title}
                        onChange={(e) => setFormData(prev => ({
                            ...prev,
                            title: e.target.value
                        }))}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                    </label>
                    <textarea
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                        rows="4"
                        value={formData.description}
                        onChange={(e) => setFormData(prev => ({
                            ...prev,
                            description: e.target.value
                        }))}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Date and Time
                    </label>
                    <DatePicker
                        selected={formData.date}
                        onChange={(date) => setFormData(prev => ({
                            ...prev,
                            date
                        }))}
                        showTimeSelect
                        dateFormat="MMMM d, yyyy h:mm aa"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Location
                    </label>
                    <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                        value={formData.location}
                        onChange={(e) => setFormData(prev => ({
                            ...prev,
                            location: e.target.value
                        }))}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Registration URL
                    </label>
                    <input
                        type="url"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                        value={formData.registrationUrl}
                        onChange={(e) => setFormData(prev => ({
                            ...prev,
                            registrationUrl: e.target.value
                        }))}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Category
                    </label>
                    <select
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                        value={formData.category}
                        onChange={(e) => setFormData(prev => ({
                            ...prev,
                            category: e.target.value
                        }))}
                    >
                        <option value="general">General</option>
                        <option value="hackathon">Hackathon</option>
                        <option value="workshop">Workshop</option>
                        <option value="seminar">Seminar</option>
                        <option value="conference">Conference</option>
                    </select>
                </div>

                <div className="flex justify-end space-x-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                        Add Event
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddEvent;