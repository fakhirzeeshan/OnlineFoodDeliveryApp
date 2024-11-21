import React, { useState } from 'react';
import ReservationCrouselBanner from '../../Components/Reservation/ReservationCrouselBanner';
import Navbar from '../../Components/Navbar';
import Footer from '../../Components/Footer';
import axios from 'axios';

const Reservation = () => {
  const [clientName, setClientName] = useState('');
  const [numberOfPersons, setNumberOfPersons] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Assuming you retrieve userId from localStorage
  const userId = localStorage.getItem('userId'); // Or pass it as a prop from a parent component

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    // Create reservation object
    const reservationData = {
      userId, // Include userId in the reservation data
      clientname: clientName,
      numberOfPersons: parseInt(numberOfPersons, 10),
      phone,
      date,
      email,
    };



    if (!userId) {
      console.log("userId is not defined")
    }

    const token = localStorage.getItem('token')
    const config = {
      headers: {
        Authorization: `Bearer ${token}` // Add the token to headers
      }
    }

    try {
      // Make POST request to create reservation
      const response = await axios.post('http://localhost:5000/api/reservations', reservationData , config );
      console.log(response.data);
      setSuccessMessage('Reserved successfully!');

      // Clear form fields
      setClientName('');
      setNumberOfPersons('');
      setPhone('');
      setDate('');
      setEmail('');
    } catch (error) {
      console.error(error);
      setErrorMessage('Failed to create reservation. Please try again.');
    }
  };

  return (
    <>
      {/* Navbar */}
      <Navbar />

      {/* Reservation Crousel Banner */}
      <ReservationCrouselBanner />

      <section className="booking-section fix section-bg section-padding mt-0">
        <div className="container">
          <div className="booking-wrapper">
            <div className="row justify-content-center">
              <div className="col-lg-8">
                <div
                  className="booking-contact mb-0 style-2 bg-cover"
                  style={{ backgroundImage: "url('assets/img/shape/booking-shape.png')" }}
                >
                  <h3 className="text-center mb-4 text-white wow fadeInUp">Create a Reservation</h3>
                  <div className="booking-items">
                    <form onSubmit={handleSubmit}>
                      <div className="row g-4">
                        <div className="col-lg-6 wow fadeInUp" data-wow-delay=".5s">
                          <div className="form-clt">
                            <input
                              type="text"
                              placeholder="Client's Name"
                              value={clientName}
                              onChange={(e) => setClientName(e.target.value)}
                              required
                            />
                            <div className="icon"></div>
                          </div>
                        </div>
                        <div className="col-lg-6 wow fadeInUp" data-wow-delay=".5s">
                          <div className="form-clt">
                            <input
                              type="number"
                              placeholder="No. Of Persons"
                              value={numberOfPersons}
                              onChange={(e) => setNumberOfPersons(e.target.value)}
                              required
                            />
                            <div className="icon">
                              <i className="fal fa-user"></i>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6 wow fadeInUp" data-wow-delay=".3s">
                          <div className="form-clt">
                            <input
                              type="number"
                              placeholder="Phone Number"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              required
                            />
                            <div className="icon">
                              <i className="fas fa-phone"></i>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6 wow fadeInUp" data-wow-delay=".5s">
                          <div className="form-clt">
                            <input
                              type="date"
                              value={date}
                              onChange={(e) => setDate(e.target.value)}
                              required
                            />
                          </div>
                        </div>

                        <div className="col-lg-12 wow fadeInUp" data-wow-delay=".5s">
                          <div className="form-clt">
                            <input
                              type="email"
                              placeholder="Email Address"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              required
                            />
                            <div className="icon">
                              <i className="fal fa-envelope"></i>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-12 wow fadeInUp" data-wow-delay=".3s">
                          <div className="form-clt">
                            <button type="submit" className="theme-btn bg-yellow">
                              Book Now
                            </button>
                          </div>
                        </div>
                      </div>
                      {errorMessage && <p className="text-danger text-red">{errorMessage}</p>}
                      {successMessage && <p className="text-success text-white">{successMessage}</p>}
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default Reservation;
