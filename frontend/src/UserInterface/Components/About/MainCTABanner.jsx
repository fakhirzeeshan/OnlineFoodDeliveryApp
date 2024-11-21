import React from 'react'

const MainCTABanner = () => {
    return (
        <>
            <section class="main-cta-banner-2 section-padding bg-cover" style={{backgroundImage:"url('assets/img/banner/main-cta-bg-2.jpg')"}}>
                <div class="tomato-shape-left float-bob-y">
                    <img src="assets/img/tomato.png" alt="shape-img" />
                </div>
                <div class="chili-shape-right float-bob-y">
                    <img src="assets/img/chilli.png" alt="shape-img" />
                </div>
                <div class="container">
                    <div class="main-cta-banner-wrapper-2 d-flex align-items-center justify-content-between">
                        <div class="section-title mb-0">
                            <span class="theme-color-3 wow fadeInUp">crispy, every bite taste</span>
                            <h2 class="text-white wow fadeInUp" data-wow-delay=".3s">
                                30 minutes fast <br />
                                <span class="theme-color-3">delivery</span> challage
                            </h2>
                        </div>
                        
                        <div class="delivery-man">
                            <img src="assets/img/delivery-man-2.png" alt="img" />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default MainCTABanner
