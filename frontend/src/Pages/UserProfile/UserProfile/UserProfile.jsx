import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProfileForm.css';
import ProfileImageUpload from './ProfileImageUpload';
import Navbar from '../../../UserInterface/Components/Navbar'
import UserCrouselBanner from '../../Components/User/UserCrouselBanner';
import Footer from '../../../UserInterface/Components/Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

const Profile = () => {
    const [user, setUser] = useState({});
    const [previewImage, setPreviewImage] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPasswordFields, setShowPasswordFields] = useState(false);
    const [countryCode, setCountryCode] = useState('+1');


    const notifyError = (message) => toast.error(message);
    const notifySuccess = (message) => toast.success(message);

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (!userId) {
            notifyError("User ID not found. Please log in.");
            return;
        }
        const fetchUserProfile = async () => {
            const response = await axios.get(`http://localhost:5000/api/users/${userId}`);
            setUser(response.data);
            setPreviewImage(response.data.Userimage);
            setCountryCode(response.data.CountryCode || '+1'); // Set initial country code
        };
        fetchUserProfile();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleImageChange = (imageFile) => {
        setPreviewImage(URL.createObjectURL(imageFile));
        setUser({ ...user, Userimage: imageFile });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newPassword && newPassword !== confirmPassword) {
            notifyError('Passwords do not match!');
            return;
        }

        const formData = new FormData();
        formData.append('username', user.Username);
        formData.append('useremail', user.Useremail);
        formData.append('userphone', user.Userphone);
        formData.append('countryCode', countryCode); // Include country code
        // Append password if provided
        if (newPassword) {
            formData.append('userpassword', newPassword);
            formData.append('confirmpassword', confirmPassword);
        }
        if (user.Userimage instanceof File) formData.append('userimage', user.Userimage);

        try {
            await axios.put(`http://localhost:5000/api/users/${user._id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            notifySuccess('Profile updated successfully!');
        } catch (error) {
            if (error.response && error.response.data) {
                notifyError(error.response.data.error);
            } else {
                notifyError("An unexpected error occurred.");
            }
        }
    };

    return (
        <>
        <Navbar/>
        <UserCrouselBanner/>
        <div className="profile-container">
            <h2>Your Profile</h2>
            <ProfileImageUpload previewImage={previewImage} onImageChange={handleImageChange} />

            <form className="profile-form" onSubmit={handleSubmit}>
                <label>Username:</label>
                <input type="text" className="text-black" name="Username" value={user.Username || ''} onChange={handleInputChange} />

                <label>Email:</label>
                <input type="email" className="text-black" name="Useremail" value={user.Useremail || ''} onChange={handleInputChange} />

                <label>Phone:</label>
                <div className="input-group">
                    <select
                        className="form-select"
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
                    <input
                        type="tel"
                        name="Userphone"
                        className="form-input text-black"
                        value={user.Userphone || ''}
                        onChange={handleInputChange}
                        placeholder="Phone Number"
                        required
                    />
                </div>

                <button type="button" onClick={() => setShowPasswordFields(!showPasswordFields)}>
                    {showPasswordFields ? 'Hide Password Fields' : 'Update Password'}
                </button>

                {showPasswordFields && (
                    <>
                        <label>New Password:</label>
                        <input type="password" className="text-black" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />

                        <label>Confirm Password:</label>
                        <input type="password" className="text-black" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    </>
                )}

                <button type="submit">Save Changes</button>
            </form>
        </div>
        <Footer/>
        <ToastContainer/>
        </>
    );
};

export default Profile;
