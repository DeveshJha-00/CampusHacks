/**
 * @license
 * Copyright (c) 2024 Manjunath Patil, Devesh Jha, Ninad Hebbar, Ramya Cherukupalli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { createContext, useContext, useState, useEffect } from 'react';
import { db, auth } from '../../utils/firebase';
import {
    collection,
    getDocs,
    addDoc,
    deleteDoc,
    doc,
    updateDoc,
    orderBy,
    Timestamp,
    getDoc,
    query,
    arrayUnion,

} from 'firebase/firestore';
import toast from 'react-hot-toast';


const EventContext = createContext();



export const EventProvider = ({ children }) => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userRole, setUserRole] = useState(null);

    // Fetch user role on mount and auth state change
    useEffect(() => {
        const checkUserRole = async () => {
            if (auth.currentUser) {
                try {
                    const userDocRef = doc(db, 'users', auth.currentUser.uid);
                    const userDoc = await getDoc(userDocRef);

                    if (userDoc.exists()) {
                        const userData = userDoc.data();
                        setUserRole(userData.role || 'user');
                    } else {
                        console.log('No user document found');
                        setUserRole('user');
                    }
                } catch (error) {
                    console.error('Error fetching user role:', error);
                    toast.error('Error fetching user permissions');
                    setUserRole('user'); // Set default role on error
                }
            } else {
                setUserRole(null);
            }
        };

        checkUserRole();
    }, [auth.currentUser]);

    // Fetch events on mount
    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const eventsQuery = query(
                collection(db, 'events'),
                orderBy('date', 'asc')
            );
            const querySnapshot = await getDocs(eventsQuery);
            const eventsData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                date: doc.data().date.toDate()
            }));
            setEvents(eventsData);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching events:', error);
            toast.error('Failed to load events');
            setLoading(false);
        }
    };

    const addEvent = async (eventData) => {
        try {
            if (!auth.currentUser) {
                throw new Error('You must be logged in to add events');
            }

            const userDocRef = doc(db, 'users', auth.currentUser.uid);
            const userDoc = await getDoc(userDocRef);

            if (!userDoc.exists() || userDoc.data().role !== 'admin') {
                throw new Error('Only admins can add events');
            }

            const eventRef = await addDoc(collection(db, 'events'), {
                ...eventData,
                date: Timestamp.fromDate(new Date(eventData.date)),
                createdAt: Timestamp.now(),
                createdBy: auth.currentUser.uid,
                registrations: []
            });

            toast.success('Event added successfully');
            await fetchEvents();
            return eventRef.id;
        } catch (error) {
            console.error('Error adding event:', error);
            toast.error(error.message);
            throw error;
        }
    };

    const registerForEvent = async (eventId) => {
        try {
            if (!auth.currentUser) {
                throw new Error('You must be logged in to register for events');
            }

            const eventRef = doc(db, 'events', eventId);
            await updateDoc(eventRef, {
                registrations: arrayUnion(auth.currentUser.uid)
            });

            toast.success('Successfully registered for event');
            await fetchEvents();
        } catch (error) {
            console.error('Error registering for event:', error);
            toast.error('Failed to register for event');
            throw error;
        }
    };

    const isRegistered = (event) => {
        return auth.currentUser &&
            event.registrations &&
            event.registrations.includes(auth.currentUser.uid);
    };

    const deleteEvent = async (eventId) => {
        try {
            if (!auth.currentUser) {
                throw new Error('You must be logged in to delete events');
            }

            const userDocRef = doc(db, 'users', auth.currentUser.uid);
            const userDoc = await getDoc(userDocRef);

            if (!userDoc.exists() || userDoc.data().role !== 'admin') {
                throw new Error('Only admins can delete events');
            }

            await deleteDoc(doc(db, 'events', eventId));
            toast.success('Event deleted successfully');
            await fetchEvents();
        } catch (error) {
            console.error('Error deleting event:', error);
            toast.error(error.message);
            throw error;
        }
    };

    const addToCalendar = (event) => {
        try {
            const startTime = new Date(event.date);
            const endTime = new Date(startTime.getTime() + (2 * 60 * 60 * 1000)); // 2 hours duration

            const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location || '')}&dates=${startTime.toISOString().replace(/[-:]/g, '').replace(/\.\d+/g, '')}/${endTime.toISOString().replace(/[-:]/g, '').replace(/\.\d+/g, '')}`;

            window.open(googleCalendarUrl, '_blank');
            toast.success('Opening Google Calendar...');
        } catch (error) {
            console.error('Error adding to calendar:', error);
            toast.error('Failed to add to calendar');
        }
    };

    return (
        <EventContext.Provider value={{
            events,
            loading,
            userRole,
            addEvent,
            registerForEvent,
            isRegistered,
            deleteEvent,
            addToCalendar,
            refreshEvents: fetchEvents
        }}>
            {children}
        </EventContext.Provider>
    );
};

export const useEvents = () => useContext(EventContext);