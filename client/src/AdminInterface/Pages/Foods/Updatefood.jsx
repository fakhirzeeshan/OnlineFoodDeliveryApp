import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../../Components/Sidebar';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import axios from 'axios';

const Updatefood = () => {
    const { id } = useParams(); // Assuming you're using URL params to get the food ID
    const navigate = useNavigate();
    
    const [foodName, setFoodName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchFoodDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/foods/${id}`); // Adjust the endpoint as needed
                setFoodName(response.data.foodname);
                setDescription(response.data.description);
                setPrice(response.data.price);
                setCategory(response.data.category);
                setImage(response.data.image); // Presumably, you might want to show the current image URL
            } catch (error) {
                setError('Error fetching food details');
            }
        };

        fetchFoodDetails();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('foodname', foodName);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('category', category);
        if (image) {
            formData.append('image', image); // For file upload
        }

        try {
            await axios.put(`http://localhost:5000/api/foods/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            navigate('/foodlist'); // Redirect after successful update
        } catch (error) {
            setError('Error updating food item');
        }
    };

    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className='app-wrapper'>
            {isSidebarOpen && <Sidebar />}
            <div className='app-content'>
            <Header onToggleSidebar={toggleSidebar} />
                <div className='p-6'>
                    <div className="flex justify-between items-center mb-6">
                        <h4 className="text-slate-900 text-lg font-medium">Update Food</h4>
                        <div className="md:flex hidden items-center gap-3 text-sm font-semibold">
                            <Link to="/admin" className="text-sm font-medium text-slate-700">FoodKing</Link>
                            <i className="bx bx-chevron-right text-lg flex-shrink-0 text-slate-400"></i>
                            <Link to="/foodlist" className="text-sm font-medium text-slate-700" aria-current="page">Foods</Link>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-6">
                        <div className="card">
                            <div className="p-6">
                                <h4 className="card-title mb-4">Update Food</h4>

                                <form onSubmit={handleSubmit}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="text-gray-800 text-sm font-medium inline-block mb-2">Food Name</label>
                                            <input type="text" className="form-input text-black" value={foodName} onChange={(e) => setFoodName(e.target.value)} required />
                                        </div>
                                        <div>
                                            <label className="text-gray-800 text-sm font-medium inline-block mb-2">Description</label>
                                            <input type="text" className="form-input text-black" value={description} onChange={(e) => setDescription(e.target.value)} required />
                                        </div>
                                        <div>
                                            <label className="text-gray-800 text-sm font-medium inline-block mb-2">Price</label>
                                            <input type="number" className="form-input text-black" value={price} onChange={(e) => setPrice(e.target.value)} required />
                                        </div>
                                        <div>
                                            <label className="text-gray-800 text-sm font-medium inline-block mb-2">Category</label>
                                            <input type="text" className="form-input text-black" value={category} onChange={(e) => setCategory(e.target.value)} required />
                                        </div>
                                        <div>
                                            <label className="text-gray-800 text-sm font-medium inline-block mb-2">Image</label>
                                            <input type="file" className="form-input text-black" onChange={(e) => setImage(e.target.files[0])} />
                                        </div>
                                    </div>

                                    {error && <p className="text-red-500">{error}</p>}
                                    <button type="submit" className="btn bg-primary text-white">Update Food</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    );
};

export default Updatefood;
