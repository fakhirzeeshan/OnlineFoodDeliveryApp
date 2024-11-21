import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../../Components/Sidebar';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import axios from 'axios';

const ManageReservations = () => {
    const [reservations, setReservations] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');
    const [updatingReservationId, setUpdatingReservationId] = useState(null);

    // Fetch all reservations
    const fetchReservations = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/reservations'); // Adjust the URL as needed
            setReservations(response.data);
        } catch (error) {
            console.error('Error fetching reservations:', error);
        }
    };

    useEffect(() => {
        fetchReservations();
    }, []);

    // Handle updating the reservation status
    const handleStatusUpdate = async (reservationId, newStatus) => {
        setUpdatingReservationId(reservationId);
        try {
            await axios.put(`http://localhost:5000/api/reservations/${reservationId}/status`, { status: newStatus });
            setSuccessMessage('Reservation status updated successfully!');
            fetchReservations(); // Refresh the reservations list
        } catch (error) {
            console.error('Error updating reservation status:', error);
        } finally {
            setUpdatingReservationId(null);
        }
    };

    return (
        <>
            <div className='app-wrapper'>
                <Sidebar />
                <div className='app-content'>
                    <Header />
                    <div className='p-6'>
                        <div className="flex justify-between items-center mb-6">
                            <h4 className="text-slate-900 text-lg font-medium">Reservations</h4>
                            <div className="md:flex hidden items-center gap-3 text-sm font-semibold">
                                <Link to="/admin" className="text-sm font-medium text-slate-700">FoodKing</Link>
                                <i className="bx bx-chevron-right text-lg flex-shrink-0 text-slate-400"></i>
                                <Link to="/manage-reservations" className="text-sm font-medium text-slate-700" aria-current="page">Reservations</Link>
                            </div>
                        </div>
                        <div className="card bg-white overflow-hidden">
                            <div className="card-header">
                                <h4 className="card-title">Manage Reservations</h4>
                                {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
                            </div>
                            <div>
                                <div className="overflow-x-auto">
                                    <div className="min-w-full inline-block align-middle">
                                        <div className="overflow-hidden">
                                            <table className="min-w-full divide-y divide-gray-200">
                                                <thead style={{ backgroundColor: 'black' }}>
                                                    <tr>
                                                        <th scope="col" className="px-6 py-3 text-start text-sm text-white">Name</th>
                                                        <th scope="col" className="px-6 py-3 text-start text-sm text-white">No Of Persons</th>
                                                        <th scope="col" className="px-6 py-3 text-start text-sm text-white">Date</th>
                                                        <th scope="col" className="px-6 py-3 text-start text-sm text-white">Status</th>
                                                        <th scope="col" className="px-6 py-3 text-end text-sm text-white">Action</th>
                                                        <th scope="col" className="px-6 py-3 text-end text-sm text-white"></th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-gray-200">
                                                    {reservations.map(reservation => (
                                                        <tr key={reservation._id}>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{reservation.clientname}</td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{reservation.numberOfPersons}</td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{new Date(reservation.date).toLocaleDateString()}</td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{reservation.status}</td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                                                                <button
                                                                    className="text-green-600 hover:text-green-800"
                                                                    onClick={() => handleStatusUpdate(reservation._id, 'confirmed')}
                                                                    disabled={updatingReservationId === reservation._id}
                                                                >
                                                                    {updatingReservationId === reservation._id ? 'Updating...' : 'Confirm'}
                                                                </button>
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                                                                <button
                                                                    className="text-red-600 hover:text-red-800 ml-4"
                                                                    onClick={() => handleStatusUpdate(reservation._id, 'cancelled')}
                                                                    disabled={updatingReservationId === reservation._id}
                                                                >
                                                                    {updatingReservationId === reservation._id ? 'Updating...' : 'Cancel'}
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))}
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

export default ManageReservations;
