import React from 'react'
import Sidebar from '../../Components/Sidebar'
import Header from '../../Components/Header'
import { Link } from 'react-router-dom'
import Footer from '../../Components/Footer'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom';

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

const UpdateUser = () => {
    const { userId } = useParams(); // Get userId from the URL
    const [username, setusername] = useState('');
    const [useremail, setuseremail] = useState('');
    const [userpassword, setuserpassword] = useState('');
    const [confirmpassword, setConfirmpassword] = useState('');
    const [userimage, setuserimage] = useState(null); // Corrected image handling
    const [imagePreview, setImagePreview] = useState(null);
    const [userphone, setuserphone] = useState('');
    const [countryCode, setCountryCode] = useState('+1');
    const [error, seterror] = useState('');
    const navigate = useNavigate();


    useEffect(() => {
        const FetchUser = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/users/${userId}`);
                setusername(response.data.Username);
                setuseremail(response.data.Useremail);
                setuserphone(response.data.Userphone);
            } catch (err) {
                console.error(err);
            }
        }
        FetchUser();
    }, [userId]);

    const HandleSubmit = async (e) => {
        e.preventDefault();

        // Check if passwords match before sending the request
        if (userpassword && (userpassword !== confirmpassword)) {
            seterror('Passwords do not match');
            return;
        }

        // Create FormData object to send the data as multipart/form-data
        const formdata = new FormData();
        formdata.append('username', username);
        formdata.append('useremail', useremail);
        formdata.append('userphone', userphone);
        formdata.append('countryCode', countryCode);

        // Append password if provided
        if (userpassword) {
            formdata.append('userpassword', userpassword);
            formdata.append('confirmpassword', confirmpassword);
        }

        // Append image if provided
        if (userimage) {
            formdata.append('userimage', userimage);
        }

        try {
            const response = await axios.put(`http://localhost:5000/api/users/${userId}`, formdata, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            alert(response.data.message);
            console.log(response.data.message);
            navigate('/userlist');
        } catch (error) {
            if (error.response && error.response.data) {
                seterror(error.response.data.error);
            } else {
                seterror("An unexpected error occurred.");
            }
        }
    };

    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <>
            <div className='app-wrapper'>
                {isSidebarOpen && <Sidebar />}
                <div className='app-content'>
                    <Header onToggleSidebar={toggleSidebar} />
                    <div className='p-6'>
                        <div className="flex justify-between items-center mb-6">
                            <h4 className="text-slate-900 text-lg font-medium">Update User</h4>
                            <div className="md:flex hidden items-center gap-3 text-sm font-semibold">
                                <Link to="/admin" className="text-sm font-medium text-slate-700">FoodKing</Link>
                                <i className="bx bx-chevron-right text-lg flex-shrink-0 text-slate-400"></i>
                                <Link to="/userlist" className="text-sm font-medium text-slate-700" aria-current="page">Users</Link>
                            </div>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-6">
                            <div className="card">
                                <div className="p-6">
                                    <h4 className="card-title mb-4">Update User</h4>

                                    <form onSubmit={HandleSubmit}>
                                        <div class="grid grid-cols-1 md:grid-cols-2  gap-6">
                                            <div>
                                                <label class="text-gray-800 text-sm font-medium inline-block mb-2">UserName</label>
                                                <div class="flex items-center">
                                                    <span class="py-2 px-3 bg-light rounded-l" id="inputGroupPrepend2">@</span>
                                                    <input type="text" class="form-input rounded-l-none text-black" value={username} onChange={(e) => setusername(e.target.value)} id="validationDefaultUsername" aria-describedby="inputGroupPrepend2" required />
                                                </div>
                                            </div>
                                            <div>
                                                <label class="text-gray-800 text-sm font-medium inline-block mb-2">Email</label>
                                                <input type="email" class="form-input text-black" id="validationDefault02" value={useremail} onChange={(e) => setuseremail(e.target.value)} required />
                                            </div>
                                            <div>
                                                <label for="inputEmail4" class="text-gray-800 text-sm font-medium inline-block mb-2">Password</label>
                                                <input type="password" class="form-input text-black" id="validationDefault03" value={userpassword} onChange={(e) => setuserpassword(e.target.value)} required />
                                            </div>
                                            <div>
                                                <label for="inputEmail4" class="text-gray-800 text-sm font-medium inline-block mb-2">Confirm Password</label>
                                                <input type="password" class="form-input text-black" id="validationDefault03"
                                                    value={confirmpassword}
                                                    onChange={(e) => setConfirmpassword(e.target.value)}
                                                    required />
                                            </div>
                                            <input type="file" class="form-input text-black" id="validationDefault01"
                                                onChange={(e) => {
                                                    setuserimage(e.target.files[0]); // Correctly handle file
                                                    setImagePreview(URL.createObjectURL(e.target.files[0])); // Create a preview
                                                }} required />

                                            {imagePreview && <img src={imagePreview} alt="User Preview" style={{ width: '100px', height: '100px' }} />}



                                        </div>
                                        <br />
                                        {/* Merged country code and phone number input */}
                                        <div class="lg:col-span-2">
                                            <label class="text-gray-800 text-sm font-medium inline-block mb-2">Phone</label>
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
                                                <span className="input-group-text">
                                                    <img
                                                        src={countryCodes.find(c => c.code === countryCode)?.flag}
                                                        alt={countryCode}
                                                        style={{ width: '30px', height: '24px' }}
                                                    />
                                                </span>
                                                <input
                                                    type="number"
                                                    className="form-input text-black"
                                                    value={userphone}
                                                    onChange={(e) => setuserphone(e.target.value)}
                                                    required
                                                    placeholder="Phone Number"
                                                />
                                            </div>

                                        </div>
                                        <br />

                                        {error && <p className="text-danger">{error}</p>}

                                        <button type="submit" class="btn bg-primary text-white">Update User</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        </>
    );
}

export default UpdateUser;
