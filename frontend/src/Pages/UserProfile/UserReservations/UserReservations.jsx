import React, { useEffect, useState } from 'react';
import Navbar from '../../../UserInterface/Components/Navbar';
import UserCrouselBanner from '../../Components/User/UserCrouselBanner';
import Footer from '../../../UserInterface/Components/Footer';
import axios from 'axios';

const UserReservations = () => {
  const [reservations, setReservations] = useState([]); // State to hold user reservations
  const [loading, setLoading] = useState(true); // State to handle loading
  console.log(reservations)

  useEffect(() => {
    const fetchUserReservations = async () => {
      const userId = localStorage.getItem('userId'); // Retrieve user ID from local storage
      if (!userId) {
        console.error('User ID not found in local storage');
        setLoading(false);
        return;
      }

      const token = localStorage.getItem('token')
      const config = {
        headers: {
          Authorization: `Bearer ${token}` // Add the token to headers
        }
      }

      try {
        // Make a request to get user reservations by user ID
        const response = await axios.get(`http://localhost:5000/api/reservations/user/${userId}` , config ); // Adjust this endpoint as needed
        setReservations(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching reservations:', error);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchUserReservations();
  }, []);

  return (
    <>
      <Navbar />
      <UserCrouselBanner />
      <div className="container mt-4">
        <h2 className="text-center">My Reservations</h2>
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : reservations.length > 0 ? (
          <div className="table-responsive">
            <table className="table table-striped table-bordered">
              <thead className="thead-dark">
                <tr>
                  <th>Reserved Name</th>
                  <th>No Of Persons</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {reservations.map(reservation => (
                  <tr key={reservation._id}>
                    <td>{reservation.clientname}</td>
                    <td>{reservation.numberOfPersons}</td>
                    <td>{new Date(reservation.date).toLocaleDateString()}</td>
                    <td>{reservation.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center">No reservations found.</p>
        )}
      </div>
      <Footer />
    </>
  );
};

export default UserReservations;
