import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './PhoneInput.css'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// Updated countryCodes with image paths
const countryCodes = [
    { code: '+1', name: 'USA', flag: '/images/flags/us.jpg' },
    { code: '+61', name: 'Australia', flag: '/images/flags/aus.svg' },
    { code: '+44', name: 'UK', flag: '/images/flags/uk.jpg' },
    { code: '+91', name: 'India', flag: '/images/flags/india.webp' },
    { code: '+81', name: 'Japan', flag: '/images/flags/japan.svg' },
    { code: '+49', name: 'Germany', flag: '/images/flags/germany.jpg' },
    { code: '+33', name: 'France', flag: '/images/flags/france.webp' },
    { code: '+39', name: 'Italy', flag: '/images/flags/italy.jpg' },
    { code: '+34', name: 'Spain', flag: '/images/flags/spain.jpg' },
];

const Signup = () => {
    const [username, setUsername] = useState('');
    const [useremail, setUseremail] = useState('');
    const [userpassword, setUserpassword] = useState('');
    const [confirmpassword, setConfirmpassword] = useState('');
    const [userphone, setUserphone] = useState('');
    const [countryCode, setCountryCode] = useState('+1');
    const [userimage, setUserimage] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const notify = () => toast("User Registered Successfully!");

    const handleSignup = async (e) => {
        e.preventDefault();


        // Check if passwords match before sending the request
        if (userpassword !== confirmpassword) {
            setErrorMessage('Passwords do not match');
            return;
        }

        // Create FormData object to send the data as multipart/form-data
        const formData = new FormData();
        formData.append('username', username);
        formData.append('useremail', useremail);
        formData.append('userpassword', userpassword);
        formData.append('confirmpassword', confirmpassword);
        formData.append('userphone', userphone);
        formData.append('countryCode', countryCode);
        if (userimage) {
            formData.append('userimage', userimage);
        }

        try {
            const response = await axios.post('http://localhost:5000/api/users/register', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response.data)
            notify();
            navigate('/login'); // Redirect to login page after successful signup
        } catch (error) {
            // Handle error response
            if (error.response && error.response.data) {
                setErrorMessage(error.response.data.error);
            } else {
                setErrorMessage('An unexpected error occurred.');
            }
        }
    };

    return (
        <>
            <section class="vh-200" style={{ backgroundColor: '#9A616D' }}>
                <div class="container py-5 h-100">
                    <div class="row d-flex justify-content-center align-items-center h-100">
                        <div class="col col-xl-10">
                            <div class="card" style={{ borderRadius: '1rem' }}>
                                <div class="row g-0">
                                    <div class="col-md-6 col-lg-5 d-none d-md-block">
                                        <img src="assets/img/gallery/03.jpg"
                                            alt="login form" class="img-fluid" style={{ borderRadius: '1rem', height: "100%" }} />
                                    </div>
                                    <div class="col-md-6 col-lg-7 d-flex align-items-center">
                                        <div class="card-body p-4 p-lg-5 text-black">

                                            <form onSubmit={handleSignup}>

                                                <div class="d-flex align-items-center mb-3 pb-1">
                                                <Link to='/'><img src="assets/img/logo/logo-grubgo.webp" alt="" /></Link>
                                                </div>

                                                <h5 class="fw-normal mb-3 pb-3" style={{ letterSpacing: '1px' }}>Sign Up</h5>

                                                <div data-mdb-input-init class="form-outline mb-4">
                                                    <input
                                                        type="text"
                                                        className="form-control form-control-lg"
                                                        value={username}
                                                        onChange={(e) => setUsername(e.target.value)}
                                                        required
                                                    />
                                                    <label className="form-label">User Name</label>
                                                </div>

                                                <div data-mdb-input-init class="form-outline mb-4">
                                                    <input
                                                        type="email"
                                                        className="form-control form-control-lg"
                                                        value={useremail}
                                                        onChange={(e) => setUseremail(e.target.value)}
                                                        required
                                                    />
                                                    <label className="form-label">Email address</label>
                                                </div>

                                                <div data-mdb-input-init class="form-outline mb-4">
                                                    <input
                                                        type="password"
                                                        className="form-control form-control-lg"
                                                        value={userpassword}
                                                        onChange={(e) => setUserpassword(e.target.value)}
                                                        required
                                                    />
                                                    <label className="form-label">Password</label>
                                                </div>

                                                <div data-mdb-input-init class="form-outline mb-4">
                                                    <input
                                                        type="password"
                                                        className="form-control form-control-lg"
                                                        value={confirmpassword}
                                                        onChange={(e) => setConfirmpassword(e.target.value)}
                                                        required
                                                    />
                                                    <label className="form-label">Confirm Password</label>
                                                </div>

                                                {/* Merged country code and phone number input */}
                                                <div className="form-outline mb-4">
                                                    <div className="input-group">
                                                        <select
                                                            className="form-select text-black"
                                                            value={countryCode}
                                                            onChange={(e) => setCountryCode(e.target.value)}
                                                            required
                                                        >
                                                            {countryCodes.map((country) => (
                                                                <option key={country.code} value={country.code}>
                                                                    {country.name} ({country.code})
                                                                </option>
                                                            ))}
                                                        </select>
                                                        <span className="input-group-text">
                                                            <img
                                                                src={countryCodes.find(c => c.code === countryCode)?.flag}
                                                                alt={countryCode}
                                                                style={{ width: '30px', height: '24px' }}
                                                            />
                                                        </span>
                                                        <input
                                                            type="number"
                                                            className="form-control text-black"
                                                            value={userphone}
                                                            onChange={(e) => setUserphone(e.target.value)}
                                                            required
                                                            placeholder="Phone Number"
                                                        />
                                                    </div>
                                                    <label className="form-label text-white">Phone Number</label>
                                                </div>

                                                <div data-mdb-input-init class="form-outline mb-4">
                                                    <div>
                                                        <input
                                                            type="file"
                                                            className="form-control form-control-lg"

                                                            onChange={(e) => setUserimage(e.target.files[0])} // Corrected line
                                                            required
                                                        />
                                                        <label className="form-label">Image</label>
                                                    </div>


                                                </div>


                                                {errorMessage && <p className="text-danger">{errorMessage}</p>}

                                                <div class="pt-1 mb-4">
                                                    <button data-mdb-button-init data-mdb-ripple-init class="btn btn-dark btn-lg btn-block" type="submit">Sign Up</button>
                                                </div>


                                                <p class="mb-5 pb-lg-2" style={{ color: '#393f81' }}>Already have an account? <Link to='/login'
                                                    style={{ color: 'black' }}>login here</Link></p>

                                            </form>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <ToastContainer/>
        </>
    );
};

export default Signup;
