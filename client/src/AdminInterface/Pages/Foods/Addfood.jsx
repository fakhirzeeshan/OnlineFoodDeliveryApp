import React, { useState } from 'react';
import Sidebar from '../../Components/Sidebar';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Addfood = () => {
    const [foodname, setFoodname] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState(null);
    const [error, setError] = useState('');
    const [loading, setloading] = useState(false);

    const notifySuccess = (message) => toast.success(message);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setloading(true); // Start loading

        const formData = new FormData();
        formData.append('foodname', foodname);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('category', category);
        formData.append('image', image);

        try {
            const response = await axios.post('http://localhost:5000/api/foods/create', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            notifySuccess(response.data.message);
        } catch (error) {
            setError('Error adding food item: ' + error.response.data.error);
        } finally {
            setloading(false); // End loading
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
                        <h4 className="text-slate-900 text-lg font-medium">Add Foods</h4>
                        <div className="md:flex hidden items-center gap-3 text-sm font-semibold">
                            <Link to="/admin" className="text-sm font-medium text-slate-700">FoodKing</Link>
                            <i className="bx bx-chevron-right text-lg flex-shrink-0 text-slate-400"></i>
                            <Link to="/addfood" className="text-sm font-medium text-slate-700" aria-current="page">Foods</Link>
                        </div>
                    </div>
                    <div className="grid lg:grid-cols-2 gap-6">
                        <div className="card">
                            <div className="p-6">
                                <h4 className="card-title mb-4">Add Food</h4>

                                <form onSubmit={handleSubmit}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="text-gray-800 text-sm font-medium inline-block mb-2">Food Name</label>
                                            <input
                                                type="text"
                                                className="form-input text-black"
                                                value={foodname}
                                                onChange={(e) => setFoodname(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="text-gray-800 text-sm font-medium inline-block mb-2">Description</label>
                                            <input
                                                type="text"
                                                className="form-input text-black"
                                                value={description}
                                                onChange={(e) => setDescription(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="text-gray-800 text-sm font-medium inline-block mb-2">Price</label>
                                            <input
                                                type="number"
                                                className="form-input text-black"
                                                value={price}
                                                onChange={(e) => setPrice(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="text-gray-800 text-sm font-medium inline-block mb-2">Category</label>
                                            <input
                                                type="text"
                                                className="form-input text-black"
                                                value={category}
                                                onChange={(e) => setCategory(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="text-gray-800 text-sm font-medium inline-block mb-2">Image</label>
                                            <input
                                                type="file"
                                                className="form-input text-black"
                                                onChange={(e) => setImage(e.target.files[0])}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <br />
                                    {error && <p className="text-danger">{error}</p>}
                                    <button type="submit" className="btn bg-primary text-white" disabled={loading}>
                                        {loading ? 'Submitting...' : 'Add Food'}
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

export default Addfood;
