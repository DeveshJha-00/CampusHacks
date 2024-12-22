import React, { useState, useEffect } from 'react';
import { auth } from '../../utils/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import "../customStyles/Form.css";

const Form = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            // Attempt to sign in
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/');
        } catch (error) {
            setError('Failed to login. Please check your credentials.'); // Set error message
            console.error('Error signing in:', error);
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

                {/* Error Message */}
                <p className={`error-message ${error ? 'show' : ''}`}>{error}</p>

                <button className="submit" type="submit">
                    <span className="sign-text">Sign In</span>
                </button>
            </form>
        </div>
    );
};

export default Form;
