import React, { useState, useEffect } from 'react';
import Sidebar from '../../Components/Sidebar';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Updatechef = () => {
    const [chefname, setchefname] = useState('');
    const [chefbio, setchefbio] = useState('');
    const [chefspeciality, setchefspeciality] = useState('');
    const [chefimage, setchefimage] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState('');
    const { id } = useParams(); // Get chef ID from the URL
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch the current chef data for updating
        const fetchChefData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/chefs/${id}`);
                const chef = response.data;
                setchefname(chef.chefname);
                setchefbio(chef.chefbio);
                setchefspeciality(chef.chefspecialty);
                setchefimage(chef.chefimage);
            } catch (error) {
                console.log("Error fetching chef data:", error);
            }
        };
        fetchChefData();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!chefname || !chefbio || !chefspeciality || !chefimage) {
            setError('All fields are required.');
            return;
        }
        
        setLoading(true);
        const formdata = new FormData();
        formdata.append('chefname', chefname);
        formdata.append('chefbio', chefbio);
        formdata.append('chefspeciality', chefspeciality);
        if (chefimage) {
            formdata.append('chefimage', chefimage);
        }
    
        try {
            const response = await axios.put(`http://localhost:5000/api/chefs/${id}`, formdata, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert(response.data.message);
            navigate('/cheflist')
        } catch (error) {
            setError(error.response?.data?.error || "An unexpected error occurred");
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
                            <h4 className="text-slate-900 text-lg font-medium">Update Chef</h4>
                            <div className="md:flex hidden items-center gap-3 text-sm font-semibold">
                                <Link to="/admin" className="text-sm font-medium text-slate-700">FoodKing</Link>
                                <i className="bx bx-chevron-right text-lg flex-shrink-0 text-slate-400"></i>
                                <Link to="/cheflist" className="text-sm font-medium text-slate-700" aria-current="page">Chefs</Link>
                            </div>
                        </div>
                        <div className="grid lg:grid-cols-2 gap-6">
                            <div className="card">
                                <div className="p-6">
                                    <h4 className="card-title mb-4">Update Chef</h4>

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
                                                        required 
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
                                                    required 
                                                />
                                            </div>
                                            <div>
                                                <label className="text-gray-800 text-sm font-medium inline-block mb-2">Chef Speciality</label>
                                                <input 
                                                    type="text" 
                                                    className="form-input text-black" 
                                                    value={chefspeciality} 
                                                    onChange={(e) => setchefspeciality(e.target.value)} 
                                                    required 
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

                                        {error && <p className="text-danger">{error}</p>}

                                        <button type="submit" className="btn bg-primary text-white">
                                            {loading ? 'Updating...' : 'Update Chef'}
                                        </button>
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

export default Updatechef;
