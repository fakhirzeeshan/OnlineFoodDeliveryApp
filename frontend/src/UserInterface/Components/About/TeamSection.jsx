import React from 'react'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'

const TeamSection = () => {

    const [Chefs, setChefs] = useState([]);


    useEffect(() => {
        const FetchChefs = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/chefs");
                setChefs(response.data)
            } catch (err) {
                console.error('error fetching chefs ', err)
            }
        }
        FetchChefs();
    })



    return (
        <section class="team-section section-padding section-bg fix">
            <div class="container">
                <div class="section-title text-center">
                    <span class="wow fadeInUp">about our food</span>
                    <h2 class="wow fadeInUp" data-wow-delay=".3s">MEET OUR EXPERT CHEFS</h2>
                </div>
                <div class="row">
                    {
                        Chefs.slice(0,3).map((chef) => {
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
            <div class="team-button text-center mt-5 wow fadeInUp" data-wow-delay=".4s">
                <Link to="/chefdetails" class="theme-btn">meet our team</Link>
            </div>

        </section>
    )
}

export default TeamSection
