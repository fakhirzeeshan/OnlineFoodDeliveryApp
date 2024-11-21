import React from 'react'

const AboutSection = () => {
    return (
        <>
            <section class="about-section-5 fix section-padding">
                <div class="container">
                    <div class="about-wrapper">
                        <div class="row align-items-center">
                            <div class="col-xl-6 col-lg-6 wow fadeInUp" data-wow-delay=".3s">
                                <div class="about-image">
                                    <img src="assets/img/about/burger.png" alt="about-img" />
                                    <div class="burger-text">
                                        <img src="assets/img/about/burger-text.png" alt="shape-img" />
                                    </div>
                                    <div class="price">
                                        <h2>$<span class="count">4,99</span></h2>
                                    </div>
                                    <div class="since-text bg-cover" style={{ backgroundImage: "url('assets/img/shape/food-shape.png')" }}>
                                        <h3>since /1985</h3>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xl-6 col-lg-6 mt-5 mt-lg-0">
                                <div class="about-content">
                                    <div class="section-title">
                                        <span class="wow fadeInUp">Our Story</span>
                                        <h2 class="wow fadeInUp" data-wow-delay=".3s">
                                            A Taste of Tradition with
                                            Exceptional <span>Flavors.</span>
                                        </h2>
                                    </div>
                                    <p class="wow fadeInUp" data-wow-delay=".5s">
                                        Every bite tells a story of our passion for delicious, freshly prepared meals.
                                        Crafted with the finest ingredients, we bring you a dining experience that’s both
                                        memorable and satisfying. Come taste the difference, where flavor meets excellence.
                                    </p>
                                    <div class="icon-area">
                                        <div class="icon-items d-flex wow fadeInUp" data-wow-delay=".3s">
                                            <div class="icon">
                                                <i class="flaticon-quality"></i>
                                            </div>
                                            <div class="content">
                                                <h4>Premium Quality</h4>
                                                <p>
                                                We pride ourselves on using only the best ingredients to create 
                                                meals that not only taste great but are good for you.
                                                </p>
                                            </div>
                                        </div>
                                        <div class="icon-items d-flex wow fadeInUp" data-wow-delay=".5s">
                                            <div class="icon">
                                                <i class="flaticon-reputation"></i>
                                            </div>
                                            <div class="content">
                                                <h4>Trusted Reputation</h4>
                                                <p>
                                                Our commitment to quality and customer satisfaction has earned us a reputation 
                                                for excellence in the community
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="info-area d-flex align-items-center">
                                        {/* <a href="about.html" class="theme-btn wow style-line-height fadeInUp" data-wow-delay=".3s">more about us</a> */}
                                        <div class="info-content wow fadeInUp" data-wow-delay=".5s">
                                            <span>BRENDON GARREY</span>
                                            <h6>Customer’s experience is our highest priority.</h6>
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

export default AboutSection
