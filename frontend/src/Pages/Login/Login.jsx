import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/users/login', {
                useremail: email,
                userpassword: password,
            });


            // Assuming your backend returns the token directly
            const token = response.data.token;
            localStorage.setItem('token', token); // Save token to localStorage

            // Decode the token to get user data
            const decoded = jwtDecode(token);
            const userId = decoded.id; // Extract user ID from token
            const isAdmin = decoded.isAdmin; // Extract isAdmin from token


            // Save user ID to localStorage
            localStorage.setItem('userId', userId); // Save user ID
            localStorage.setItem('isAdmin', isAdmin); // Save user ID

            // Navigate based on isAdmin value
            if (isAdmin) {
                navigate('/admin'); // Navigate to admin panel if user is admin
            } else {
                navigate('/'); // Navigate to home if user is not admin
            }
        } catch (error) {
            // Check if there's a response and extract the error message
            if (error.response && error.response.data && error.response.data.error) {
                setError(error.response.data.error);
            } else {
                setError('An unexpected error occurred. Please try again.');
            }
        }
    };

    return (
        <>

            <section class="vh-100" style={{ backgroundColor: '#9A616D' }}>
                <div class="container py-5 h-100">
                    <div class="row d-flex justify-content-center align-items-center h-100">
                        <div class="col col-xl-10">
                            <div class="card" style={{ borderRadius: '1rem' }}>
                                <div class="row g-0">
                                    <div class="col-md-6 col-lg-5 d-none d-md-block">
                                        <img src="assets/img/gallery/03.jpg"
                                            alt="login form" class="img-fluid" style={{ borderRadius: '1rem' , height:"100%" }} />
                                    </div>
                                    <div class="col-md-6 col-lg-7 d-flex align-items-center">
                                        <div class="card-body p-4 p-lg-5 text-black">

                                            <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>

                                                <div class="d-flex align-items-center mb-3 pb-1">
                                                    <Link to='/'><img src="assets/img/logo/logo-grubgo.webp" alt="" /></Link>
                                                    
                                                </div>

                                                <h5 class="fw-normal mb-3 pb-3" style={{ letterSpacing: '1px' }}>Log in</h5>

                                                <div data-mdb-input-init class="form-outline mb-4">
                                                    <input
                                                        type="email"
                                                        className="form-control form-control-lg"
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        required
                                                    />
                                                    <label className="form-label">Email address</label>
                                                </div>

                                                <div data-mdb-input-init class="form-outline mb-4">
                                                    <input
                                                        type="password"
                                                        className="form-control form-control-lg"
                                                        value={password}
                                                        onChange={(e) => setPassword(e.target.value)}
                                                        required
                                                    />
                                                    <label className="form-label">Password</label>
                                                </div>

                                                {error && <p className="text-black">{error}</p>}

                                                <div class="pt-1 mb-4">
                                                    <button data-mdb-button-init data-mdb-ripple-init class="btn btn-dark btn-lg btn-block" type="submit">Login</button>
                                                </div>


                                                <p class="mb-5 pb-lg-2" style={{ color: '#393f81' }}>Don't have an account? <Link to='/signup'
                                                    style={{ color: 'black' }}>Register here</Link></p>

                                            </form>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    );
};

export default Login;
