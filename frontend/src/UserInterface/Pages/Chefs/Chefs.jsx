import React from 'react'
import Navbar from '../../Components/Navbar'
import ChefCrouselBanner from '../../Components/Chefs/ChefCrouselBanner'
import Footer from '../../Components/Footer'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'

const Chefs = () => {

    const [Chefs, setChefs] = useState([]);



    useEffect(() => {
        const FetchChefs = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/chefs")
                setChefs(response.data)
            } catch (err) {
                console.error('error fetching chefs', err)
            }
        }
        FetchChefs();
    })




    return (
        <>

            {/* Navbar */}
            <Navbar />

            {/* Chef Crousel Banner Section */}
            <ChefCrouselBanner />


            <section class="team-section section-padding section-bg fix">
                <div class="container">
                    <div class="section-title text-center">
                        <span class="wow fadeInUp">about our food</span>
                        <h2 class="wow fadeInUp" data-wow-delay=".3s">MEET OUR EXPERT CHEFS</h2>
                    </div>
                    <div class="row">
                        {
                            Chefs.map((chef) => {
                                return (
                                    <div class="col-xl-4 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay=".3s">


                                        <div class="single-team-items">
                                            <div class="team-image">
                                                <img src={chef.chefimage} alt="team-img" />
                                                <div class="social-link">
                                                    <Link to="#"><i class="fab fa-facebook-f"></i></Link>
                                                    <Link to="#"><i class="fab fa-twitter"></i></Link>
                                                    <Link to="#"><i class="fab fa-linkedin-in"></i></Link>
                                                    <Link to="#"><i class="fab fa-youtube"></i></Link>
                                                </div>
                                            </div>
                                            <div class="team-content">
                                                <p>{chef.chefname}</p>
                                                <h3>
                                                    <Link to={`/chefdetails/${chef._id}`}>{chef.chefspecialty}</Link>
                                                </h3>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }

                    </div>
                </div>
            </section>

            {/* Footer */}
            <Footer />

        </>
    )
}

export default Chefs
