import React, { useState } from 'react';
import { auth } from '../../utils/firebase'; // Import Firebase auth
import { signInWithEmailAndPassword } from 'firebase/auth'; // Firebase login method
import { useNavigate } from 'react-router-dom'; // Hook to navigate after login
import "../customStyles/Form.css";

const Form = () => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [acceptTerms, setAcceptTerms] = useState(false);
    const navigate = useNavigate();

    const handleSwitchForm = () => {
        setIsSignUp(!isSignUp);
        setError(''); // Clear error when switching forms
    };

    const handleCheckboxChange = () => {
        setAcceptTerms(!acceptTerms);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isSignUp) {
                // If it's the sign-up form, handle sign-up logic here
                // You can add Firebase sign-up functionality here if needed
            } else {
                // Sign in logic
                await signInWithEmailAndPassword(auth, email, password);
                navigate('/'); // Navigate to the home page after login
            }
        } catch (error) {
            setError('Failed to login. Please check your credentials.');
            console.error(error);
        }
    };

    return (
        <div className='bg' >

            <form className="form" onSubmit={handleSubmit}>
                <div className="title-2">
                    <span>{isSignUp ? 'SIGN UP' : 'SIGN IN'}</span>
                </div>

                <div className="input-container">
                    <input
                        placeholder="Email"
                        type="email"
                        className="input-mail"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                    />
                </div>

                {isSignUp && (
                    <div className="input-container">
                        <input placeholder="Confirm Password" type="password" className="input-pwd" required />
                    </div>
                )}

                {isSignUp && (
                    <label className="terms-container">
                        Accept terms of use
                        <div className="toggle-wrapper">
                            <input
                                type="checkbox"
                                className="toggle-checkbox"
                                checked={acceptTerms}
                                onChange={handleCheckboxChange}
                            />
                            <span className="toggle-switch"></span>
                        </div>
                    </label>
                )}

                {error && <p className="error-message">{error}</p>}

                <button className="submit" type="submit" disabled={isSignUp && !acceptTerms}>
                    <span className="sign-text">{isSignUp ? 'Sign up' : 'Sign in'}</span>
                </button>

            </form>
        </div>
    );
};

export default Form;