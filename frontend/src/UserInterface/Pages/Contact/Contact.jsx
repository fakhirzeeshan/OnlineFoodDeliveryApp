import React, { useState } from 'react';
import Navbar from '../../Components/Navbar';
import ContactCrouselBanner from '../../Components/Contact/ContactCrouselBanner';
import Contactinfo from '../../Components/Contact/Contactinfo';
import Footer from '../../Components/Footer';
import axios from 'axios';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [feedback, setFeedback] = useState('');

    // Handle input changes
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setFeedback('');

        // Get userId from localStorage
        const userId = localStorage.getItem('userId'); // Make sure 'userId' exists in localStorage

        try {
            const response = await axios.post('http://localhost:5000/api/contacts/contact', { ...formData, userId });
            setFeedback(response.data.message);
            setFormData({ name: '', email: '', message: '' }); // Reset the form
        } catch (error) {
            setFeedback(error.response?.data?.message || 'An error occurred. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            {/* Navbar */}
            <Navbar />

            {/* Contact Crousel Banner */}
            <ContactCrouselBanner />

            {/* Contact info Section  */}
            <Contactinfo />

            <section className="contact-section section-padding pt-0 section-bg">
                <div className="container">
                    <div className="contact-area">
                        <div className="row justify-content-between">
                            <div className="col-xl-6 col-lg-6">
                                <div className="map-content-area">
                                    <h3 className="wow fadeInUp" data-wow-delay=".3s"> Get in touch</h3>
                                    <p className="wow fadeInUp" data-wow-delay=".5s">
                                    Reach out to us—we're here to help!
                                    </p>
                                    <div className="google-map wow fadeInUp" data-wow-delay=".7s">
                                        <iframe
                                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6678.7619084840835!2d144.9618311901502!3d-37.81450084255415!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642b4758afc1d%3A0x3119cc820fdfc62e!2sEnvato!5e0!3m2!1sen!2sbd!4v1641984054261!5m2!1sen!2sbd"
                                            title="Location Map"
                                            width="600"
                                            height="450"
                                            style={{ border: 0 }}
                                            allowFullScreen=""
                                            loading="lazy"
                                            referrerPolicy="no-referrer-when-downgrade">
                                        </iframe>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-5 col-lg-5 mt-5 mt-lg-0">
                                <div className="contact-form-items">
                                    <div className="contact-title">
                                        <h3 className="wow fadeInUp" data-wow-delay=".3s">Fill Up The Form</h3>
                                        <p className="wow fadeInUp" data-wow-delay=".5s">Your email address will not be published. Required fields are marked *</p>
                                    </div>
                                    <form onSubmit={handleSubmit} id="contact-form">
                                        <div className="row g-4">
                                            <div className="col-lg-12 wow fadeInUp" data-wow-delay=".3s">
                                                <div className="form-clt">
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        id="name"
                                                        placeholder="Your Name*"
                                                        value={formData.name}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                    <div className="icon">
                                                        <i className="fal fa-user"></i>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-12 wow fadeInUp" data-wow-delay=".5s">
                                                <div className="form-clt">
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        id="email"
                                                        placeholder="Email Address*"
                                                        value={formData.email}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                    <div className="icon">
                                                        <i className="fal fa-envelope"></i>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-12 wow fadeInUp" data-wow-delay=".7s">
                                                <div className="form-clt-big form-clt">
                                                    <textarea
                                                        name="message"
                                                        id="message"
                                                        placeholder="Enter Your Message here"
                                                        value={formData.message}
                                                        onChange={handleChange}
                                                        required
                                                    ></textarea>
                                                    <div className="icon">
                                                        <i className="fal fa-edit"></i>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 wow fadeInUp" data-wow-delay=".8s">
                                                <button type="submit" className="theme-btn" disabled={isSubmitting}>
                                                    <span className="button-content-wrapper d-flex align-items-center">
                                                        <span className="button-icon"><i className="fal fa-paper-plane"></i></span>
                                                        <span className="button-text">Get In Touch</span>
                                                    </span>
                                                </button>
                                            </div>
                                            {feedback && <div className="col-lg-12 mt-3"><p>{feedback}</p></div>}
                                        </div>
                                    </form>
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

export default Contact;
