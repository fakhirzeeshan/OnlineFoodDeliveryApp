import React from 'react'

const CrouselBanner = () => {
    return (
        <>
            <section class="hero-section-3">

                <div class="swiper hero-slider-2" style={{height:900}}>
                    <div class="swiper-wrapper">
                        <div class="swiper-slide">
                            <div class="hero-3 style-2 bg-cover" style={{ backgroundImage: "url('assets/img/hero/hero-bg-3.jpg')" }}>
                                <div class="frame-shape" data-animation="fadeInUp" data-delay="2s">
                                    <img src="assets/img/hero/frame.png" alt="shape-img" />
                                </div>
                                <div class="frame-shape-2" data-animation="fadeInUp" data-delay="2.2s">
                                    <img src="assets/img/hero/frame-2.png" alt="shape-img" />
                                </div>
                                <div class="frame-shape-3">
                                    <img src="assets/img/hero/frame-3.png" alt="shape-img" data-animation="fadeInUp" data-delay="2.4s" />
                                </div>
                                <div class="frame-shape-4" data-animation="fadeInUp" data-delay="2.6s">
                                    <img src="assets/img/hero/frame-4.png" alt="shape-img" />
                                </div>
                                <div class="frame-shape-5" data-animation="fadeInUp" data-delay="2.8s">
                                    <img src="assets/img/hero/frame-5.png" alt="shape-img" />
                                </div>
                                <div class="frame-shape-6" data-animation="fadeInUp" data-delay="2.9s">
                                    <img src="assets/img/hero/frame-6.png" alt="shape-img" />
                                </div>
                                <div class="container-fluid">
                                    <div class="row g-4 align-items-center justify-content-between">
                                        <div class="col-xl-3 col-lg-5">
                                            <div class="hero-content">
                                                <h1 data-animation="fadeInUp" data-delay=".4s">
                                                    The Best Burger Place In Town
                                                </h1>
                                                {/* <div class="hero-button">
                                                    <a href="shop-single.html" class="theme-btn bg-yellow border-radius-none" data-animation="fadeInUp" data-delay="1s">
                                                        <span class="button-content-wrapper d-flex align-items-center">
                                                            <span class="button-text">order now</span>
                                                            <i class="flaticon-delivery"></i>
                                                        </span>
                                                    </a>
                                                </div> */}
                                            </div>
                                        </div>
                                        <div class="col-xl-5 col-lg-7">
                                            <div class="pizza-image" data-animation="fadeInUp" data-delay="1.4s">
                                                <img src="assets/img/home-5/burger/01.png" alt="pizza-img" />
                                            </div>
                                        </div>
                                        <div class="col-xl-3 col-lg-5">
                                            <div class="hero-content-2">
                                                <h2 data-animation="fadeInUp" data-delay=".4s">
                                                BeefBlaze
                                                </h2>
                                                <p data-animation="fadeInUp" data-delay=".6s">
                                                    It's the perfect dining experience where every dish is crafted with fresh, high-quality
                                                    Experience quick and efficient service that ensures your food.
                                                </p>
                                                <h4 data-animation="fadeInUp" data-delay=".6s">
                                                $8.79
                                                </h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default CrouselBanner
