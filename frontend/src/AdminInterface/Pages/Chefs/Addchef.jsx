import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../../Components/Sidebar';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddChef = () => {
    const [chefname, setchefname] = useState('');
    const [chefbio, setchefbio] = useState('');
    const [chefspecialty, setchefspecialty] = useState(''); // Corrected spelling
    const [chefimage, setchefimage] = useState(null);
    const [Error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


    const notifySuccess = (message) => toast.success(message);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Validation
        if (!chefname || !chefbio || !chefspecialty || !chefimage) {
            setError('All fields are required.');
            return;
        }

        setLoading(true);

        const formdata = new FormData();
        formdata.append('chefname', chefname);
        formdata.append('chefbio', chefbio);
        formdata.append('chefspecialty', chefspecialty); // Corrected spelling
        if (chefimage) {
            formdata.append('chefimage', chefimage); // File data
        }

        try {
            const response = await axios.post('http://localhost:5000/api/chefs/create', formdata, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            notifySuccess(response.data.message);
            navigate('/cheflist')
        } catch (error) {
            setError(error.response?.data?.error || 'An unexpected error occurred');
        } finally {
            setLoading(false);
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
                            <h4 className="text-slate-900 text-lg font-medium">Add Chefs</h4>
                            <div className="md:flex hidden items-center gap-3 text-sm font-semibold">
                                <Link to="/admin" className="text-sm font-medium text-slate-700">FoodKing</Link>
                                <i className="bx bx-chevron-right text-lg flex-shrink-0 text-slate-400"></i>
                                <Link to="/adduser" className="text-sm font-medium text-slate-700" aria-current="page">Chefs</Link>
                            </div>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-6">
                            <div className="card">
                                <div className="p-6">
                                    <h4 className="card-title mb-4">Add Chef</h4>

                                    <form onSubmit={handleSubmit}>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="text-gray-800 text-sm font-medium inline-block mb-2">Chef Name</label>
                                                <div className="flex items-center">
                                                    <span className="py-2 px-3 bg-light rounded-l" id="inputGroupPrepend2">@</span>
                                                    <input
                                                        type="text"
                                                        className="form-input rounded-l-none text-black"
                                                        value={chefname}
                                                        onChange={(e) => setchefname(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="text-gray-800 text-sm font-medium inline-block mb-2">Chef Bio</label>
                                                <input
                                                    type="text"
                                                    className="form-input text-black"
                                                    value={chefbio}
                                                    onChange={(e) => setchefbio(e.target.value)}
                                                />
                                            </div>
                                            <div>
                                                <label className="text-gray-800 text-sm font-medium inline-block mb-2">Chef Speciality</label>
                                                <input
                                                    type="text"
                                                    className="form-input text-black"
                                                    value={chefspecialty} // Corrected spelling
                                                    onChange={(e) => setchefspecialty(e.target.value)} // Corrected spelling
                                                />
                                            </div>
                                            <div>
                                                <label className="text-gray-800 text-sm font-medium inline-block mb-2">Chef Image</label>
                                                <input
                                                    type="file"
                                                    className="form-input text-black"
                                                    onChange={(e) => setchefimage(e.target.files[0])}
                                                />
                                            </div>
                                        </div>

                                        <br />

                                        {Error && <p className="text-danger">{Error}</p>}

                                        <button type="submit" className="btn bg-primary text-white" disabled={loading}>
                                            {loading ? 'Submitting...' : 'Add Chef'}
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
            <ToastContainer/>
        </>
    );
};

export default AddChef;
