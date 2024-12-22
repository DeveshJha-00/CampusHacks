/**
 * @license
 * Copyright (c) 2024 Manjunath Patil, Devesh Jha, Ninad Hebbar, Ramya Cherukupalli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useState, useEffect } from 'react';
import { auth } from '../../utils/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../components/auth/AuthContext';
import "../customStyles/Form.css";

const Form = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [loginAttempted, setLoginAttempted] = useState(false);
    const navigate = useNavigate();
    const { user } = useAuth();

    // Monitor auth state changes
    useEffect(() => {
        if (loginAttempted && user) {
            console.log('User authenticated, navigating to homepage...');
            navigate('/', { replace: true });
        }
    }, [user, loginAttempted, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isLoading) {
            console.log('Login already in progress');
            return;
        }

        setError('');
        setIsLoading(true);
        setLoginAttempted(true);

        try {
            // Add a pre-check for network connectivity
            const testConnection = await fetch('https://www.googleapis.com/identitytoolkit/v3/relyingparty/publicKeys', {
                method: 'GET',
                mode: 'cors',
            });

            if (!testConnection.ok) {
                throw new Error('Network connectivity issue');
            }

            console.log('Attempting Firebase authentication...');
            await signInWithEmailAndPassword(auth, email, password);

        } catch (error) {
            console.error('Login error:', error);

            let errorMessage = 'Failed to login. Please check your credentials.';

            if (error.code === 'auth/network-request-failed' || error.message === 'Network connectivity issue') {
                errorMessage = 'Network error. Please check your internet connection and try again.';
            } else if (error.code === 'auth/user-not-found') {
                errorMessage = 'No account found with this email address.';
            } else if (error.code === 'auth/wrong-password') {
                errorMessage = 'Incorrect password. Please try again.';
            } else if (error.code === 'auth/too-many-requests') {
                errorMessage = 'Too many failed attempts. Please try again later.';
            }

            setError(errorMessage);
            setLoginAttempted(false);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='bg'>
            <form className="form" onSubmit={handleSubmit}>
                <div className="title-2">
                    <span>SIGN IN</span>
                </div>

                <div className="input-container">
                    <input
                        placeholder="Email"
                        type="email"
                        className="input-mail"
                        required
                        value={email}
                        autoComplete="email"
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={isLoading}
                    />
                </div>

                <section className="bg-stars">
                    <span className="star"></span>
                    <span className="star"></span>
                    <span className="star"></span>
                    <span className="star"></span>
                </section>

                <div className="input-container">
                    <input
                        placeholder="Password"
                        type="password"
                        className="input-pwd"
                        required
                        minLength={5}
                        maxLength={15}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={isLoading}
                    />
                </div>

                {error && (
                    <p className="error-message show" style={{ color: '#ff4444', marginBottom: '10px' }}>
                        {error}
                    </p>
                )}

                <button
                    className="submit"
                    type="submit"
                    disabled={isLoading}
                    style={{ opacity: isLoading ? 0.7 : 1 }}
                >
                    <span className="sign-text">
                        {isLoading ? 'Signing In...' : 'Sign In'}
                    </span>
                </button>
            </form>
        </div>
    );
};

export default Form;