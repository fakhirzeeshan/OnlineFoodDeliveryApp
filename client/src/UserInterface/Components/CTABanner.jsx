import React from 'react'
import { Link } from 'react-router-dom'

const CTABanner = () => {
    return (
        <>
            <section class="cta-delivery-section fix section-bg section-padding bg-cover" style={{ backgroundImage: "url('assets/img/hero-6/bg-shape.png')" }}>
                <div class="container">
                    <div class="cta-delivery-wrapper">
                        <div class="delivery-content">
                            <div class="section-title text-center">
                                <span class="wow fadeInUp">Fast & Reliable</span>
                                <h2 class="wow fadeInUp" data-wow-delay=".3s">Guaranteed 30-Minute Delivery!</h2>
                            </div>
                            <p class="mt-3 mt-md-0 wow fadeInUp" data-wow-delay=".5s">
                                Enjoy a seamless dining experience with dishes prepared using fresh, premium ingredients. Our efficient delivery ensures <br />
                                your meal arrives hot and on time, delivering quality with every order.
                            </p>
                            <Link to="/aboutus" class="theme-btn bg-red-2 mt-5 wow fadeInUp" data-wow-delay=".3s">
                                <span class="button-content-wrapper d-flex align-items-center">
                                    <span class="button-icon"><i class="flaticon-delivery"></i></span>
                                    <span class="button-text">view more</span>
                                </span>
                            </Link>
                        </div>
                        <div class="delivery-man">
                            <img src="assets/img/hero-6/delivery.png" alt="img" />
                        </div>
                        <div class="comboo-image">
                            <img src="assets/img/hero-6/comboo.png" alt="img" />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default CTABanner
