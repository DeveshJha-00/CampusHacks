
// import React, { useState } from 'react';
// import { useLostFound } from './LostFoundContext';
// import { useTheme } from '../../contexts/ThemeContext';
// import toast from 'react-hot-toast';

// const AddItem = ({ onClose }) => {
//     const { addItem } = useLostFound();
//     const { isDarkMode } = useTheme();
//     const [formData, setFormData] = useState({
//         title: '',
//         description: '',
//         location: '',
//         category: 'electronics',
//         type: 'lost', // lost or found
//         contactMethod: 'email'
//     });

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             await addItem(formData);
//             onClose();
//         } catch (error) {
//             console.error('Error adding item:', error);
//             toast.error('Failed to add item');
//         }
//     };

//     return (
//         <div className={`${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} p-6 rounded-lg shadow-xl max-w-2xl mx-auto`}>
//             <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-primary-900'} mb-6`}>
//                 Report {formData.type === 'lost' ? 'Lost' : 'Found'} Item
//             </h2>

//             <form onSubmit={handleSubmit} className="space-y-6">
//                 {/* Type Selection */}
//                 <div>
//                     <label className="block text-sm font-medium mb-1">
//                         Report Type
//                     </label>
//                     <div className="flex space-x-4">
//                         <button
//                             type="button"
//                             className={`px-4 py-2 rounded-md ${
//                                 formData.type === 'lost'
//                                     ? 'bg-primary-600 text-white'
//                                     : isDarkMode
//                                     ? 'bg-gray-700 text-white'
//                                     : 'bg-gray-100 text-gray-700'
//                             }`}
//                             onClick={() => setFormData(prev => ({ ...prev, type: 'lost' }))}
//                         >
//                             Lost Item
//                         </button>
//                         <button
//                             type="button"
//                             className={`px-4 py-2 rounded-md ${
//                                 formData.type === 'found'
//                                     ? 'bg-primary-600 text-white'
//                                     : isDarkMode
//                                     ? 'bg-gray-700 text-white'
//                                     : 'bg-gray-100 text-gray-700'
//                             }`}
//                             onClick={() => setFormData(prev => ({ ...prev, type: 'found' }))}
//                         >
//                             Found Item
//                         </button>
//                     </div>
//                 </div>

//                 {/* Item Title */}
//                 <div>
//                     <label className="block text-sm font-medium mb-1">
//                         Item Title
//                     </label>
//                     <input
//                         type="text"
//                         required
//                         className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
//                             isDarkMode
//                                 ? 'bg-gray-700 text-white border-gray-600 focus:ring-gray-500'
//                                 : 'border-gray-300 focus:ring-primary-500'
//                         }`}
//                         value={formData.title}
//                         onChange={(e) => setFormData(prev => ({
//                             ...prev,
//                             title: e.target.value
//                         }))}
//                         placeholder="e.g., Blue iPhone 13 Pro"
//                     />
//                 </div>

//                 {/* Description */}
//                 <div>
//                     <label className="block text-sm font-medium mb-1">
//                         Description
//                     </label>
//                     <textarea
//                         required
//                         className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
//                             isDarkMode
//                                 ? 'bg-gray-700 text-white border-gray-600 focus:ring-gray-500'
//                                 : 'border-gray-300 focus:ring-primary-500'
//                         }`}
//                         rows="4"
//                         value={formData.description}
//                         onChange={(e) => setFormData(prev => ({
//                             ...prev,
//                             description: e.target.value
//                         }))}
//                         placeholder="Please provide as many details as possible..."
//                     />
//                 </div>

//                 {/* Location */}
//                 <div>
//                     <label className="block text-sm font-medium mb-1">
//                         Location
//                     </label>
//                     <input
//                         type="text"
//                         required
//                         className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
//                             isDarkMode
//                                 ? 'bg-gray-700 text-white border-gray-600 focus:ring-gray-500'
//                                 : 'border-gray-300 focus:ring-primary-500'
//                         }`}
//                         value={formData.location}
//                         onChange={(e) => setFormData(prev => ({
//                             ...prev,
//                             location: e.target.value
//                         }))}
//                         placeholder="e.g., Library Second Floor"
//                     />
//                 </div>

//                 {/* Category */}
//                 <div>
//                     <label className="block text-sm font-medium mb-1">
//                         Category
//                     </label>
//                     <select
//                         className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
//                             isDarkMode
//                                 ? 'bg-gray-700 text-white border-gray-600 focus:ring-gray-500'
//                                 : 'border-gray-300 focus:ring-primary-500'
//                         }`}
//                         value={formData.category}
//                         onChange={(e) => setFormData(prev => ({
//                             ...prev,
//                             category: e.target.value
//                         }))}
//                     >
//                         <option value="electronics">Electronics</option>
//                         <option value="clothing">Clothing</option>
//                         <option value="accessories">Accessories</option>
//                         <option value="documents">Documents</option>
//                         <option value="other">Other</option>
//                     </select>
//                 </div>

//                 {/* Contact Method */}
//                 <div>
//                     <label className="block text-sm font-medium mb-1">
//                         Preferred Contact Method
//                     </label>
//                     <select
//                         className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
//                             isDarkMode
//                                 ? 'bg-gray-700 text-white border-gray-600 focus:ring-gray-500'
//                                 : 'border-gray-300 focus:ring-primary-500'
//                         }`}
//                         value={formData.contactMethod}
//                         onChange={(e) => setFormData(prev => ({
//                             ...prev,
//                             contactMethod: e.target.value
//                         }))}
//                     >
//                         <option value="email">Email</option>
//                         <option value="phone">Phone</option>
//                     </select>
//                 </div>

//                 {/* Buttons */}
//                 <div className="flex justify-end space-x-4">
//                     <button
//                         type="button"
//                         onClick={onClose}
//                         className={`px-4 py-2 text-sm font-medium rounded-md focus:outline-none focus:ring-2 ${
//                             isDarkMode
//                                 ? 'text-gray-300 hover:text-white focus:ring-gray-500'
//                                 : 'text-gray-700 hover:text-gray-900 focus:ring-primary-500'
//                         }`}
//                     >
//                         Cancel
//                     </button>
//                     <button
//                         type="submit"
//                         className={`px-4 py-2 text-sm font-medium rounded-md focus:outline-none focus:ring-2 ${
//                             isDarkMode
//                                 ? 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-gray-500'
//                                 : 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500'
//                         }`}
//                     >
//                         Submit Report
//                     </button>
//                 </div>
//             </form>
//         </div>
//     );
// };

// export default AddItem;


// // import React, { useState } from 'react';
// // import { useLostFound } from './LostFoundContext';
// // import { useTheme } from '../../contexts/ThemeContext';
// // import toast from 'react-hot-toast';

// // const AddItem = ({ onClose }) => {
// //     const { addItem } = useLostFound();
// //     const { isDarkMode } = useTheme();
// //     const [formData, setFormData] = useState({
// //         title: '',
// //         description: '',
// //         location: '',
// //         category: 'electronics',
// //         type: 'lost', // lost or found
// //         contactMethod: 'email',
// //         phoneNumber: '', // New field for phone number
// //         verificationQuestion: '', // New field for verification question
// //         verificationAnswer: '' // New field for verification answer (answer that the owner provides)
// //     });

// //     const handleSubmit = async (e) => {
// //         e.preventDefault();
// //         try {
// //             await addItem(formData);
// //             onClose();
// //         } catch (error) {
// //             console.error('Error adding item:', error);
// //             toast.error('Failed to add item');
// //         }
// //     };

// //     return (
// //         <div className={`${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} p-6 rounded-lg shadow-xl max-w-2xl mx-auto`}>
// //             <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-primary-900'} mb-6`}>
// //                 Report {formData.type === 'lost' ? 'Lost' : 'Found'} Item
// //             </h2>

// //             <form onSubmit={handleSubmit} className="space-y-6">
// //                 {/* Type Selection */}
// //                 <div>
// //                     <label className="block text-sm font-medium mb-1">
// //                         Report Type
// //                     </label>
// //                     <div className="flex space-x-4">
// //                         <button
// //                             type="button"
// //                             className={`px-4 py-2 rounded-md ${formData.type === 'lost'
// //                                 ? 'bg-primary-600 text-white'
// //                                 : isDarkMode
// //                                 ? 'bg-gray-700 text-white'
// //                                 : 'bg-gray-100 text-gray-700'}`}
// //                             onClick={() => setFormData(prev => ({ ...prev, type: 'lost' }))}
// //                         >
// //                             Lost Item
// //                         </button>
// //                         <button
// //                             type="button"
// //                             className={`px-4 py-2 rounded-md ${formData.type === 'found'
// //                                 ? 'bg-primary-600 text-white'
// //                                 : isDarkMode
// //                                 ? 'bg-gray-700 text-white'
// //                                 : 'bg-gray-100 text-gray-700'}`}
// //                             onClick={() => setFormData(prev => ({ ...prev, type: 'found' }))}
// //                         >
// //                             Found Item
// //                         </button>
// //                     </div>
// //                 </div>

// //                 {/* Item Title */}
// //                 <div>
// //                     <label className="block text-sm font-medium mb-1">
// //                         Item Title
// //                     </label>
// //                     <input
// //                         type="text"
// //                         required
// //                         className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
// //                             isDarkMode
// //                                 ? 'bg-gray-700 text-white border-gray-600 focus:ring-gray-500'
// //                                 : 'border-gray-300 focus:ring-primary-500'
// //                         }`}
// //                         value={formData.title}
// //                         onChange={(e) => setFormData(prev => ({
// //                             ...prev,
// //                             title: e.target.value
// //                         }))}
// //                         placeholder="e.g., Blue iPhone 13 Pro"
// //                     />
// //                 </div>

// //                 {/* Description */}
// //                 <div>
// //                     <label className="block text-sm font-medium mb-1">
// //                         Description
// //                     </label>
// //                     <textarea
// //                         required
// //                         className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
// //                             isDarkMode
// //                                 ? 'bg-gray-700 text-white border-gray-600 focus:ring-gray-500'
// //                                 : 'border-gray-300 focus:ring-primary-500'
// //                         }`}
// //                         rows="4"
// //                         value={formData.description}
// //                         onChange={(e) => setFormData(prev => ({
// //                             ...prev,
// //                             description: e.target.value
// //                         }))}
// //                         placeholder="Please provide as many details as possible..."
// //                     />
// //                 </div>

// //                 {/* Location */}
// //                 <div>
// //                     <label className="block text-sm font-medium mb-1">
// //                         Location
// //                     </label>
// //                     <input
// //                         type="text"
// //                         required
// //                         className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
// //                             isDarkMode
// //                                 ? 'bg-gray-700 text-white border-gray-600 focus:ring-gray-500'
// //                                 : 'border-gray-300 focus:ring-primary-500'
// //                         }`}
// //                         value={formData.location}
// //                         onChange={(e) => setFormData(prev => ({
// //                             ...prev,
// //                             location: e.target.value
// //                         }))}
// //                         placeholder="e.g., Library Second Floor"
// //                     />
// //                 </div>

// //                 {/* Category */}
// //                 <div>
// //                     <label className="block text-sm font-medium mb-1">
// //                         Category
// //                     </label>
// //                     <select
// //                         className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
// //                             isDarkMode
// //                                 ? 'bg-gray-700 text-white border-gray-600 focus:ring-gray-500'
// //                                 : 'border-gray-300 focus:ring-primary-500'
// //                         }`}
// //                         value={formData.category}
// //                         onChange={(e) => setFormData(prev => ({
// //                             ...prev,
// //                             category: e.target.value
// //                         }))}
// //                     >
// //                         <option value="electronics">Electronics</option>
// //                         <option value="clothing">Clothing</option>
// //                         <option value="accessories">Accessories</option>
// //                         <option value="documents">Documents</option>
// //                         <option value="other">Other</option>
// //                     </select>
// //                 </div>

// //                 {/* Preferred Contact Method */}
// //                 <div>
// //                     <label className="block text-sm font-medium mb-1">
// //                         Preferred Contact Method
// //                     </label>
// //                     <select
// //                         className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
// //                             isDarkMode
// //                                 ? 'bg-gray-700 text-white border-gray-600 focus:ring-gray-500'
// //                                 : 'border-gray-300 focus:ring-primary-500'
// //                         }`}
// //                         value={formData.contactMethod}
// //                         onChange={(e) => setFormData(prev => ({
// //                             ...prev,
// //                             contactMethod: e.target.value
// //                         }))}
// //                     >
// //                         <option value="email">Email</option>
// //                         <option value="phone">Phone</option>
// //                     </select>
// //                 </div>

// //                 {/* Phone Number (only visible if phone is selected) */}
// //                 {formData.contactMethod === 'phone' && (
// //                     <div>
// //                         <label className="block text-sm font-medium mb-1">
// //                             Phone Number
// //                         </label>
// //                         <input
// //                             type="text"
// //                             className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
// //                                 isDarkMode
// //                                     ? 'bg-gray-700 text-white border-gray-600 focus:ring-gray-500'
// //                                     : 'border-gray-300 focus:ring-primary-500'
// //                             }`}
// //                             value={formData.phoneNumber}
// //                             onChange={(e) => setFormData(prev => ({
// //                                 ...prev,
// //                                 phoneNumber: e.target.value
// //                             }))}
// //                             placeholder="e.g., 9876543210"
// //                         />
// //                     </div>
// //                 )}

// //                 {/* Verification Question (for found items) */}
// //                 {formData.type === 'found' && (
// //                     <div>
// //                         <label className="block text-sm font-medium mb-1">
// //                             Verification Question (optional)
// //                         </label>
// //                         <input
// //                             type="text"
// //                             className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
// //                                 isDarkMode
// //                                     ? 'bg-gray-700 text-white border-gray-600 focus:ring-gray-500'
// //                                     : 'border-gray-300 focus:ring-primary-500'
// //                             }`}
// //                             value={formData.verificationQuestion}
// //                             onChange={(e) => setFormData(prev => ({
// //                                 ...prev,
// //                                 verificationQuestion: e.target.value
// //                             }))}
// //                             placeholder="e.g., What color is the item?"
// //                         />
// //                     </div>
// //                 )}

// //                 {/* Buttons */}
// //                 <div className="flex justify-end space-x-4">
// //                     <button
// //                         type="button"
// //                         onClick={onClose}
// //                         className={`px-4 py-2 text-sm font-medium rounded-md focus:outline-none focus:ring-2 ${
// //                             isDarkMode
// //                                 ? 'text-gray-300 hover:text-white focus:ring-gray-500'
// //                                 : 'text-gray-700 hover:text-gray-900 focus:ring-primary-500'
// //                         }`}
// //                     >
// //                         Cancel
// //                     </button>
// //                     <button
// //                         type="submit"
// //                         className={`px-4 py-2 text-sm font-medium rounded-md focus:outline-none focus:ring-2 ${
// //                             isDarkMode
// //                                 ? 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-gray-500'
// //                                 : 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500'
// //                         }`}
// //                     >
// //                         Submit Report
// //                     </button>
// //                 </div>
// //             </form>
// //         </div>
// //     );
// // };

// // export default AddItem;


// AddItem.js
import React, { useState } from 'react';
import { useLostFound } from './LostFoundContext';
import { useTheme } from '../../contexts/ThemeContext';
import toast from 'react-hot-toast';

const AddItem = ({ onClose }) => {
    const { addItem } = useLostFound();
    const { isDarkMode } = useTheme();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        location: '',
        category: 'electronics',
        type: 'lost',
        contactMethod: 'email',
        phoneNumber: '',
        verificationQuestion: '',
        email: '', // Will be filled from user context typically
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.contactMethod === 'phone' && !formData.phoneNumber) {
            toast.error('Please provide a phone number');
            return;
        }
        if (!formData.verificationQuestion) {
            toast.error('Please provide a verification question');
            return;
        }
        try {
            await addItem(formData);
            onClose();
        } catch (error) {
            console.error('Error adding item:', error);
            toast.error('Failed to add item');
        }
    };

    return (
        <div className={`${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} p-6 rounded-lg shadow-xl max-w-2xl mx-auto`}>
            <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-primary-900'} mb-6`}>
                Report {formData.type === 'lost' ? 'Lost' : 'Found'} Item
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Type Selection */}
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Report Type
                    </label>
                    <div className="flex space-x-4">
                        <button
                            type="button"
                            className={`px-4 py-2 rounded-md ${
                                formData.type === 'lost'
                                    ? 'bg-primary-600 text-white'
                                    : isDarkMode
                                    ? 'bg-gray-700 text-white'
                                    : 'bg-gray-100 text-gray-700'
                            }`}
                            onClick={() => setFormData(prev => ({ ...prev, type: 'lost' }))}
                        >
                            Lost Item
                        </button>
                        <button
                            type="button"
                            className={`px-4 py-2 rounded-md ${
                                formData.type === 'found'
                                    ? 'bg-primary-600 text-white'
                                    : isDarkMode
                                    ? 'bg-gray-700 text-white'
                                    : 'bg-gray-100 text-gray-700'
                            }`}
                            onClick={() => setFormData(prev => ({ ...prev, type: 'found' }))}
                        >
                            Found Item
                        </button>
                    </div>
                </div>

                {/* Existing fields remain the same */}
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Item Title
                    </label>
                    <input
                        type="text"
                        required
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                            isDarkMode
                                ? 'bg-gray-700 text-white border-gray-600 focus:ring-gray-500'
                                : 'border-gray-300 focus:ring-primary-500'
                        }`}
                        value={formData.title}
                        onChange={(e) => setFormData(prev => ({
                            ...prev,
                            title: e.target.value
                        }))}
                        placeholder="e.g., Blue iPhone 13 Pro"
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Description
                    </label>
                    <textarea
                        required
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                            isDarkMode
                                ? 'bg-gray-700 text-white border-gray-600 focus:ring-gray-500'
                                : 'border-gray-300 focus:ring-primary-500'
                        }`}
                        rows="4"
                        value={formData.description}
                        onChange={(e) => setFormData(prev => ({
                            ...prev,
                            description: e.target.value
                        }))}
                        placeholder="Please provide as many details as possible..."
                    />
                </div>

                {/* Location */}
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Location
                    </label>
                    <input
                        type="text"
                        required
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                            isDarkMode
                                ? 'bg-gray-700 text-white border-gray-600 focus:ring-gray-500'
                                : 'border-gray-300 focus:ring-primary-500'
                        }`}
                        value={formData.location}
                        onChange={(e) => setFormData(prev => ({
                            ...prev,
                            location: e.target.value
                        }))}
                        placeholder="e.g., Library Second Floor"
                    />
                </div>

                {/* Category */}
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Category
                    </label>
                    <select
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                            isDarkMode
                                ? 'bg-gray-700 text-white border-gray-600 focus:ring-gray-500'
                                : 'border-gray-300 focus:ring-primary-500'
                        }`}
                        value={formData.category}
                        onChange={(e) => setFormData(prev => ({
                            ...prev,
                            category: e.target.value
                        }))}
                    >
                        <option value="electronics">Electronics</option>
                        <option value="clothing">Clothing</option>
                        <option value="accessories">Accessories</option>
                        <option value="documents">Documents</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                {/* New Verification Question Field */}
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Verification Question
                    </label>
                    <input
                        type="text"
                        required
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                            isDarkMode
                                ? 'bg-gray-700 text-white border-gray-600 focus:ring-gray-500'
                                : 'border-gray-300 focus:ring-primary-500'
                        }`}
                        value={formData.verificationQuestion}
                        onChange={(e) => setFormData(prev => ({
                            ...prev,
                            verificationQuestion: e.target.value
                        }))}
                        placeholder="e.g., What color case was on the phone?"
                    />
                </div>

                {/* Contact Method */}
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Preferred Contact Method
                        </label>
                        <select
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                                isDarkMode
                                    ? 'bg-gray-700 text-white border-gray-600 focus:ring-gray-500'
                                    : 'border-gray-300 focus:ring-primary-500'
                            }`}
                            value={formData.contactMethod}
                            onChange={(e) => setFormData(prev => ({
                                ...prev,
                                contactMethod: e.target.value
                            }))}
                        >
                            <option value="email">Email</option>
                            <option value="phone">Phone</option>
                        </select>
                    </div>

                    {/* Conditional Phone Number Input */}
                    {formData.contactMethod === 'phone' && (
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                required
                                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                                    isDarkMode
                                        ? 'bg-gray-700 text-white border-gray-600 focus:ring-gray-500'
                                        : 'border-gray-300 focus:ring-primary-500'
                                }`}
                                value={formData.phoneNumber}
                                onChange={(e) => setFormData(prev => ({
                                    ...prev,
                                    phoneNumber: e.target.value
                                }))}
                                placeholder="Enter your phone number"
                                pattern="[0-9]{10}"
                            />
                        </div>
                    )}
                </div>

                {/* Buttons */}
                <div className="flex justify-end space-x-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className={`px-4 py-2 text-sm font-medium rounded-md focus:outline-none focus:ring-2 ${
                            isDarkMode
                                ? 'text-gray-300 hover:text-white focus:ring-gray-500'
                                : 'text-gray-700 hover:text-gray-900 focus:ring-primary-500'
                        }`}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className={`px-4 py-2 text-sm font-medium rounded-md focus:outline-none focus:ring-2 ${
                            isDarkMode
                                ? 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-gray-500'
                                : 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500'
                        }`}
                    >
                        Submit Report
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddItem;