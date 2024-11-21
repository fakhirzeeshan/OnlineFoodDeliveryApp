import React from 'react'
import Navbar from '../../Components/Navbar'
import ChefdetailsBanner from '../../Components/Chefs/ChefdetailsBanner'
import { Link } from 'react-router-dom'
import ChefskillBanner from '../../Components/Chefs/ChefskillBanner'
import Footer from '../../Components/Footer'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const Chefdetails = () => {



    const [Chefs, setChefs] = useState('');
    const { id } = useParams();



    useEffect(() => {
        const FetchChefs = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/chefs/${id}`)
                setChefs(response.data)
            } catch (err) {
                console.error('error fetching chefs', err)
            }
        }
        FetchChefs();
    }, [id])

    // Construct the full image URL
    const imageUrl = Chefs ? `http://localhost:5000/${Chefs.chefimage.replace(/\\/g, '/')}` : '';



    return (
        <>

            {/* Navbar */}
            <Navbar />


            {/* Crousel Banner */}
            <ChefdetailsBanner />


            <section class="team-details-section fix section-padding">
                <div class="container">
                    <div class="team-details-wrapper">
                        {
                            Chefs && (
                                <div class="row justify-content-between align-items-center">
                                    <div class="col-lg-6 wow fadeInUp" data-wow-delay=".3s">
                                        <div class="team-image bg-cover" style={{ backgroundImage: `url("${imageUrl}")`, height: 800, objectFit: 'cover' }}></div>
                                    </div>
                                    {
                                        console.log(Chefs.chefimage)
                                    }



                                    <div class="col-lg-5 mt-5 mt-lg-0 wow fadeInUp" data-wow-delay=".5s">
                                        <div class="team-details-content">
                                            <div class="star pb-3">
                                                <Link href="#"> <i class="fas fa-star"></i></Link>
                                                <Link href="#"><i class="fas fa-star"></i></Link>
                                                <Link href="#"> <i class="fas fa-star"></i></Link>
                                                <Link href="#"><i class="fas fa-star"></i></Link>
                                                <Link href="#"> <i class="fas fa-star"></i></Link>
                                                <Link href="#">(5k)</Link>
                                            </div>
                                            <h3>{Chefs.chefname}</h3>
                                            <span>{Chefs.chefspecialty}</span>
                                            <p>
                                                {Chefs.chefbio}
                                            </p>
                                            <div class="social-icon d-flex align-items-center">
                                                <Link href="#"><i class="fab fa-facebook-f"></i></Link>
                                                <Link href="#"><i class="fab fa-twitter"></i></Link>
                                                <Link href="#"><i class="fab fa-vimeo-v"></i></Link>
                                                <Link href="#"><i class="fab fa-pinterest-p"></i></Link>
                                            </div>
                                            
                                        </div>
                                    </div>

                                </div>
                            )
                        }
                    </div>
                </div>
            </section>


            {/* Chef skills banner */}
            <ChefskillBanner />



            {/* Footer  */}
            <Footer />

        </>
    )
}

export default Chefdetails
