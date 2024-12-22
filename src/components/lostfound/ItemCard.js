
// // import React from 'react';
// // import { format } from 'date-fns';
// // import { useLostFound } from './LostFoundContext';
// // import { useTheme } from '../../contexts/ThemeContext';
// // import { useAuth } from '../auth/AuthContext';

// // const ItemCard = ({ item }) => {
// //     const { isDarkMode } = useTheme();
// //     const { updateItemStatus } = useLostFound();
// //     const { user } = useAuth();

// //     const categoryIcons = {
// //         electronics: '📱',
// //         clothing: '👕',
// //         accessories: '👜',
// //         documents: '📄',
// //         other: '📦'
// //     };

// //     const statusColors = {
// //         open: 'bg-green-100 text-green-800',
// //         closed: 'bg-gray-100 text-gray-800',
// //         inProgress: 'bg-yellow-100 text-yellow-800'
// //     };

// //     return (
// //         <div className={`${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} 
// //             rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300`}>
// //             <div className="p-6">
// //                 {/* Status Badge */}
// //                 <div className="flex justify-between items-start mb-4">
// //           <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${statusColors[item.status]}`}>
// //             {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
// //           </span>
// //                     <span className="text-2xl">
// //             {categoryIcons[item.category]}
// //           </span>
// //                 </div>

// //                 {/* Title */}
// //                 <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
// //                     {item.title}
// //                 </h3>


// //                 <span className={`inline-block mt-2 px-2 py-1 text-sm rounded ${
// //                     item.type === 'lost' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
// //                 }`}>
// //           {item.type === 'lost' ? 'Lost Item' : 'Found Item'}
// //         </span>


// //                 <div className={`mt-4 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
// //                     <p>
// //                         <span className="font-medium">Date:</span>{' '}
// //                         {format(item.createdAt, 'MMM d, yyyy')}
// //                     </p>
// //                     <p>
// //                         <span className="font-medium">Location:</span>{' '}
// //                         {item.location}
// //                     </p>
// //                 </div>


// //                 <p className={`mt-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
// //                     {item.description}
// //                 </p>


// //                 <div className={`mt-6 pt-4 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
// //                     <p className="text-sm text-gray-600">
// //                         <span className="font-medium">Contact:</span>{' '}
// //                         {item.userEmail}
// //                     </p>
// //                 </div>


// //                 {(user?.email === item.userEmail || user?.role === 'admin') && (
// //                     <div className="mt-4 flex space-x-2">
// //                         {item.status === 'open' && (
// //                             <button
// //                                 onClick={() => updateItemStatus(item.id, 'closed')}
// //                                 className="px-3 py-1 text-sm bg-primary-600 text-white rounded-md hover:bg-primary-700"
// //                             >
// //                                 Mark as Resolved
// //                             </button>
// //                         )}
// //                         {item.status === 'closed' && (
// //                             <button
// //                                 onClick={() => updateItemStatus(item.id, 'open')}
// //                                 className="px-3 py-1 text-sm bg-gray-600 text-white rounded-md hover:bg-gray-700"
// //                             >
// //                                 Reopen
// //                             </button>
// //                         )}
// //                     </div>
// //                 )}
// //             </div>
// //         </div>
// //     );
// // };

// // export default ItemCard;


// // import React, { useState } from 'react';
// // import { format } from 'date-fns';
// // import { useLostFound } from './LostFoundContext';
// // import { useTheme } from '../../contexts/ThemeContext';
// // import { useAuth } from '../auth/AuthContext';

// // const ItemCard = ({ item }) => {
// //     const { isDarkMode } = useTheme();
// //     const { updateItemStatus } = useLostFound();
// //     const { user } = useAuth();
// //     const [userAnswer, setUserAnswer] = useState('');
// //     const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
// //     const [isAnswerApproved, setIsAnswerApproved] = useState(false);

// //     const categoryIcons = {
// //         electronics: '📱',
// //         clothing: '👕',
// //         accessories: '👜',
// //         documents: '📄',
// //         other: '📦'
// //     };

// //     const statusColors = {
// //         open: 'bg-green-100 text-green-800',
// //         closed: 'bg-gray-100 text-gray-800',
// //         inProgress: 'bg-yellow-100 text-yellow-800'
// //     };

// //     const handleAnswerSubmit = () => {
// //         if (userAnswer.trim() === '') {
// //             alert('Please provide an answer to the verification question.');
// //             return;
// //         }
// //         setIsAnswerSubmitted(true);
// //     };

// //     const handleApproval = () => {
// //         setIsAnswerApproved(true);
// //     };

// //     return (
// //         <div className={`${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} 
// //             rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300`}>
// //             <div className="p-6">
// //                 {/* Status Badge */}
// //                 <div className="flex justify-between items-start mb-4">
// //                     <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${statusColors[item.status]}`}>
// //                         {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
// //                     </span>
// //                     <span className="text-2xl">
// //                         {categoryIcons[item.category]}
// //                     </span>
// //                 </div>

// //                 {/* Title */}
// //                 <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
// //                     {item.title}
// //                 </h3>

// //                 <span className={`inline-block mt-2 px-2 py-1 text-sm rounded ${
// //                     item.type === 'lost' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
// //                 }`}>
// //                     {item.type === 'lost' ? 'Lost Item' : 'Found Item'}
// //                 </span>

// //                 <div className={`mt-4 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
// //                     <p>
// //                         <span className="font-medium">Date:</span>{' '}
// //                         {format(item.createdAt, 'MMM d, yyyy')}
// //                     </p>
// //                     <p>
// //                         <span className="font-medium">Location:</span>{' '}
// //                         {item.location}
// //                     </p>
// //                 </div>

// //                 <p className={`mt-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
// //                     {item.description}
// //                 </p>

// //                 {/* Verification Question for Found Items */}
// //                 {item.type === 'found' && item.verificationQuestion && !isAnswerApproved && (
// //                     <div className="mt-6 pt-4 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}">
// //                         <p className="text-sm text-gray-600">
// //                             <span className="font-medium">Verification Question:</span>{' '}
// //                             {item.verificationQuestion}
// //                         </p>

// //                         {/* User's Answer */}
// //                         {!isAnswerSubmitted ? (
// //                             <div className="mt-2">
// //                                 <input
// //                                     type="text"
// //                                     value={userAnswer}
// //                                     onChange={(e) => setUserAnswer(e.target.value)}
// //                                     className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
// //                                         isDarkMode
// //                                             ? 'bg-gray-700 text-white border-gray-600 focus:ring-gray-500'
// //                                             : 'border-gray-300 focus:ring-primary-500'
// //                                     }`}
// //                                     placeholder="Enter your answer..."
// //                                 />
// //                                 <button
// //                                     onClick={handleAnswerSubmit}
// //                                     className="mt-2 px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
// //                                 >
// //                                     Submit Answer
// //                                 </button>
// //                             </div>
// //                         ) : (
// //                             <p className="mt-2 text-gray-600">Your answer is submitted.</p>
// //                         )}

// //                         {/* Owner's Approval */}
// //                         {user?.email === item.userEmail && isAnswerSubmitted && !isAnswerApproved && (
// //                             <div className="mt-2">
// //                                 <button
// //                                     onClick={handleApproval}
// //                                     className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
// //                                 >
// //                                     Approve Answer
// //                                 </button>
// //                             </div>
// //                         )}
// //                     </div>
// //                 )}

// //                 {/* Contact Details */}
// //                 {isAnswerApproved ? (
// //                     <div className="mt-6 pt-4 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}">
// //                         <p className="text-sm text-gray-600">
// //                             <span className="font-medium">Contact:</span>{' '}
// //                             {item.contactMethod === 'phone'
// //                                 ? item.phoneNumber
// //                                 : item.userEmail}
// //                         </p>
// //                     </div>
// //                 ) : (
// //                     <div className="mt-6 pt-4 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}">
// //                         <p className="text-sm text-gray-600">
// //                             <span className="font-medium">Contact:</span> Answer the verification question to view contact details.
// //                         </p>
// //                     </div>
// //                 )}

// //                 <div className={`mt-6 pt-4 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
// //                     <p className="text-sm text-gray-600">
// //                         <span className="font-medium">Status:</span> {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
// //                     </p>
// //                 </div>

// //                 {/* Admin and Owner Actions */}
// //                 {(user?.email === item.userEmail || user?.role === 'admin') && (
// //                     <div className="mt-4 flex space-x-2">
// //                         {item.status === 'open' && (
// //                             <button
// //                                 onClick={() => updateItemStatus(item.id, 'closed')}
// //                                 className="px-3 py-1 text-sm bg-primary-600 text-white rounded-md hover:bg-primary-700"
// //                             >
// //                                 Mark as Resolved
// //                             </button>
// //                         )}
// //                         {item.status === 'closed' && (
// //                             <button
// //                                 onClick={() => updateItemStatus(item.id, 'open')}
// //                                 className="px-3 py-1 text-sm bg-gray-600 text-white rounded-md hover:bg-gray-700"
// //                             >
// //                                 Reopen
// //                             </button>
// //                         )}
// //                     </div>
// //                 )}
// //             </div>
// //         </div>
// //     );
// // };

// // export default ItemCard;


// import React from 'react';
// import { format } from 'date-fns';
// import { useLostFound } from './LostFoundContext';
// import { useTheme } from '../../contexts/ThemeContext';
// import { useAuth } from '../auth/AuthContext';

// const ItemCard = ({ item }) => {
//     const { isDarkMode } = useTheme();
//     const { updateItemStatus } = useLostFound();
//     const { user } = useAuth();

//     const categoryIcons = {
//         electronics: '📱',
//         clothing: '👕',
//         accessories: '👜',
//         documents: '📄',
//         other: '📦'
//     };

//     const statusColors = {
//         open: 'bg-green-100 text-green-800',
//         closed: 'bg-gray-100 text-gray-800',
//         inProgress: 'bg-yellow-100 text-yellow-800'
//     };

//     return (
//         <div className={`${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} 
//             rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300`}>
//             <div className="p-6">
//                 {/* Status Badge and Category Icon */}
//                 <div className="flex justify-between items-start mb-4">
//                     <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${statusColors[item.status]}`}>
//                         {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
//                     </span>
//                     <span className="text-2xl">
//                         {categoryIcons[item.category]}
//                     </span>
//                 </div>

//                 {/* Title */}
//                 <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
//                     {item.title}
//                 </h3>

//                 {/* Type Badge */}
//                 <span className={`inline-block mt-2 px-2 py-1 text-sm rounded ${
//                     item.type === 'lost' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
//                 }`}>
//                     {item.type === 'lost' ? 'Lost Item' : 'Found Item'}
//                 </span>

//                 {/* Date and Location */}
//                 <div className={`mt-4 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
//                     <p>
//                         <span className="font-medium">Date:</span>{' '}
//                         {format(item.createdAt, 'MMM d, yyyy')}
//                     </p>
//                     <p>
//                         <span className="font-medium">Location:</span>{' '}
//                         {item.location}
//                     </p>
//                 </div>

//                 {/* Description */}
//                 <p className={`mt-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
//                     {item.description}
//                 </p>

//                 {/* Contact Information */}
//                 <div className={`mt-6 pt-4 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
//                     <div className="space-y-2">
//                         <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
//                             <span className="font-medium">Contact via:</span>{' '}
//                             {item.contactMethod === 'email' ? (
//                                 <span>{item.email}</span>
//                             ) : (
//                                 <span>Phone: {item.phoneNumber}</span>
//                             )}
//                         </p>
//                         {user && item.verificationQuestion && (
//                             <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
//                                 <span className="font-medium">Verification Question:</span>{' '}
//                                 {item.verificationQuestion}
//                             </p>
//                         )}
//                     </div>
//                 </div>

//                 {/* Action Buttons */}
//                 {(user?.email === item.userEmail || user?.role === 'admin') && (
//                     <div className="mt-4 flex space-x-2">
//                         {item.status === 'open' && (
//                             <button
//                                 onClick={() => updateItemStatus(item.id, 'closed')}
//                                 className={`px-3 py-1 text-sm rounded-md ${
//                                     isDarkMode
//                                         ? 'bg-primary-600 text-white hover:bg-primary-700'
//                                         : 'bg-primary-600 text-white hover:bg-primary-700'
//                                 }`}
//                             >
//                                 Mark as Resolved
//                             </button>
//                         )}
//                         {item.status === 'closed' && (
//                             <button
//                                 onClick={() => updateItemStatus(item.id, 'open')}
//                                 className={`px-3 py-1 text-sm rounded-md ${
//                                     isDarkMode
//                                         ? 'bg-gray-600 text-white hover:bg-gray-700'
//                                         : 'bg-gray-600 text-white hover:bg-gray-700'
//                                 }`}
//                             >
//                                 Reopen
//                             </button>
//                         )}
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default ItemCard;

import React, { useState } from 'react';
import { format } from 'date-fns';
import { useLostFound } from './LostFoundContext';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../auth/AuthContext';
import toast from 'react-hot-toast';

const ItemCard = ({ item }) => {
    const { isDarkMode } = useTheme();
    const { updateItemStatus, submitAnswer, approveAnswer } = useLostFound();
    const { user } = useAuth();
    const [answer, setAnswer] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

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

    const handleAnswerSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await submitAnswer(item.id, answer);
            toast.success('Answer submitted successfully');
            setAnswer('');
        } catch (error) {
            toast.error('Failed to submit answer');
            console.error('Error submitting answer:', error);
        }
        setIsSubmitting(false);
    };

    const handleApproveAnswer = async (answerId, approved) => {
        try {
            await approveAnswer(item.id, answerId, approved);
            toast.success(approved ? 'Answer approved' : 'Answer rejected');
        } catch (error) {
            toast.error('Failed to process answer');
            console.error('Error processing answer:', error);
        }
    };

    const renderContactInfo = () => {
        if (!user) return null;
        
        // Post owner or admin can always see contact info
        if (user.email === item.userEmail || user.role === 'admin') {
            return (
                <div className="space-y-2">
                    <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-medium">Contact via:</span>{' '}
                        {item.contactMethod === 'email' ? (
                            <span>{item.email}</span>
                        ) : (
                            <span>Phone: {item.phoneNumber}</span>
                        )}
                    </p>
                </div>
            );
        }

        // Check if current user has approved answer
        const userApprovedAnswer = item.answers?.find(
            ans => ans.userEmail === user.email && ans.approved
        );

        if (userApprovedAnswer) {
            return (
                <div className="space-y-2">
                    <div className="bg-green-100 text-green-800 px-3 py-2 rounded-md mb-2">
                        Your answer was approved! Here's the contact information:
                    </div>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-medium">Contact via:</span>{' '}
                        {item.contactMethod === 'email' ? (
                            <span>{item.email}</span>
                        ) : (
                            <span>Phone: {item.phoneNumber}</span>
                        )}
                    </p>
                </div>
            );
        }

        return null;
    };

    const renderAnswerSection = () => {
        if (!user) {
            return (
                <div className="mt-4 text-sm text-gray-600">
                    Please log in to submit an answer.
                </div>
            );
        }

        if (user.email === item.userEmail || user.role === 'admin') {
            // Show pending answers to the post owner or admin
            return (
                <div className="mt-4 space-y-4">
                    <h4 className="font-medium">Pending Answers</h4>
                    {item.answers?.filter(ans => !ans.approved && !ans.rejected).map((answer) => (
                        <div key={answer.id} className="bg-gray-50 p-3 rounded-md space-y-2">
                            <p className="text-sm">{answer.answer}</p>
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => handleApproveAnswer(answer.id, true)}
                                    className="px-3 py-1 text-sm bg-green-600 text-white rounded-md hover:bg-green-700"
                                >
                                    Approve
                                </button>
                                <button
                                    onClick={() => handleApproveAnswer(answer.id, false)}
                                    className="px-3 py-1 text-sm bg-red-600 text-white rounded-md hover:bg-red-700"
                                >
                                    Reject
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            );
        }

        // Check if user has already submitted an answer
        const userAnswer = item.answers?.find(ans => ans.userEmail === user.email);
        
        if (userAnswer) {
            if (userAnswer.approved) {
                return null; // Contact info will be shown above
            }
            if (userAnswer.rejected) {
                return (
                    <div className="mt-4 bg-red-100 text-red-800 px-3 py-2 rounded-md">
                        Your answer was not correct. You may try again.
                    </div>
                );
            }
            return (
                <div className="mt-4 bg-yellow-100 text-yellow-800 px-3 py-2 rounded-md">
                    Your answer is pending approval.
                </div>
            );
        }

        return (
            <form onSubmit={handleAnswerSubmit} className="mt-4 space-y-3">
                <div>
                    <label className="block text-sm font-medium mb-1">
                        {item.verificationQuestion}
                    </label>
                    <input
                        type="text"
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                            isDarkMode
                                ? 'bg-gray-700 text-white border-gray-600 focus:ring-gray-500'
                                : 'border-gray-300 focus:ring-primary-500'
                        }`}
                        placeholder="Enter your answer"
                        required
                    />
                </div>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`px-4 py-2 text-sm font-medium rounded-md focus:outline-none focus:ring-2 ${
                        isDarkMode
                            ? 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-gray-500'
                            : 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500'
                    } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    {isSubmitting ? 'Submitting...' : 'Submit Answer'}
                </button>
            </form>
        );
    };

    return (
        <div className={`${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} 
            rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300`}>
            <div className="p-6">
                {/* Status Badge and Category Icon */}
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

                {/* Type Badge */}
                <span className={`inline-block mt-2 px-2 py-1 text-sm rounded ${
                    item.type === 'lost' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                }`}>
                    {item.type === 'lost' ? 'Lost Item' : 'Found Item'}
                </span>

                {/* Date and Location */}
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

                {/* Description */}
                <p className={`mt-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {item.description}
                </p>

                {/* Contact Information */}
                <div className={`mt-6 pt-4 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                    {renderContactInfo()}
                </div>

                {/* Answer Section */}
                {renderAnswerSection()}

                {/* Action Buttons */}
                {(user?.email === item.userEmail || user?.role === 'admin') && (
                    <div className="mt-4 flex space-x-2">
                        {item.status === 'open' && (
                            <button
                                onClick={() => updateItemStatus(item.id, 'closed')}
                                className={`px-3 py-1 text-sm rounded-md ${
                                    isDarkMode
                                        ? 'bg-primary-600 text-white hover:bg-primary-700'
                                        : 'bg-primary-600 text-white hover:bg-primary-700'
                                }`}
                            >
                                Mark as Resolved
                            </button>
                        )}
                        {item.status === 'closed' && (
                            <button
                                onClick={() => updateItemStatus(item.id, 'open')}
                                className={`px-3 py-1 text-sm rounded-md ${
                                    isDarkMode
                                        ? 'bg-gray-600 text-white hover:bg-gray-700'
                                        : 'bg-gray-600 text-white hover:bg-gray-700'
                                }`}
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
