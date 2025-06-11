import React, { useState, useEffect } from 'react';
import Sidebar from '../../Components/Sidebar';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Feedback = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchFeedbacks = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/contacts/contacts');
                setFeedbacks(response.data);
            } catch (err) {
                setError('Failed to load feedback data.');
            } finally {
                setLoading(false);
            }
        };
        fetchFeedbacks();
    }, []);

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
                            <h4 className="text-slate-900 text-lg font-medium">Feedback</h4>
                            <div className="md:flex hidden items-center gap-3 text-sm font-semibold">
                                <Link to="/admin" className="text-sm font-medium text-slate-700">FoodKing</Link>
                                <i className="bx bx-chevron-right text-lg flex-shrink-0 text-slate-400"></i>
                                <Link to="/feedback" className="text-sm font-medium text-slate-700" aria-current="page">Feedback</Link>
                            </div>
                        </div>
                        <div className="card bg-white overflow-hidden">
                            <div className="card-header">
                                <h4 className="card-title">Feedbacks</h4>
                                {error && <p style={{ color: 'red' }}>{error}</p>}
                            </div>
                            <div>
                                <div className="overflow-x-auto">
                                    <div className="min-w-full inline-block align-middle">
                                        <div className="overflow-hidden">
                                            <table className="min-w-full divide-y divide-gray-200">
                                                <thead style={{ backgroundColor: 'black' }}>
                                                    <tr>
                                                        <th scope="col" className="px-6 py-3 text-start text-sm text-white">Name</th>
                                                        <th scope="col" className="px-6 py-3 text-start text-sm text-white">Email</th>
                                                        <th scope="col" className="px-6 py-3 text-start text-sm text-white">Message</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-gray-200">
                                                    {loading ? (
                                                        <tr>
                                                            <td colSpan="3" className="px-6 py-4 text-center text-sm text-gray-800">Loading...</td>
                                                        </tr>
                                                    ) : feedbacks.length ? (
                                                        feedbacks.map(feedback => (
                                                            <tr key={feedback._id}>
                                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{feedback.name}</td>
                                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{feedback.email}</td>
                                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{feedback.message}</td>
                                                            </tr>
                                                        ))
                                                    ) : (
                                                        <tr>
                                                            <td colSpan="3" className="px-6 py-4 text-center text-sm text-gray-800">No feedback available.</td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        </>
    );
};

export default Feedback;
