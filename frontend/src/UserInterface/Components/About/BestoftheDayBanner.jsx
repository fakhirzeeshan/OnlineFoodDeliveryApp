import React from 'react'

const BestoftheDayBanner = () => {
  return (
    <>
    <section class="today-best-sale fix">
            <div class="today-best-sale-wrapper">
                <div class="row g-0">
                    <div class="col-xl-8 col-lg-7">
                        <div class="swiper today-best-sale-image-slider">
                            
                            <div class="swiper-wrapper">
                                <div class="swiper-slide">
                                    <div class="today-best-sale-image bg-cover" style={{backgroundImage:"url('assets/img/banner/best-sale-4.jpg')"}}></div>
                                </div>
                                <div class="swiper-slide">
                                    <div class="today-best-sale-image bg-cover" style={{backgroundImage:"url('assets/img/banner/best-sale-4.jpg')"}}></div>
                                </div>
                                <div class="swiper-slide">
                                    <div class="today-best-sale-image bg-cover" style={{backgroundImage:"url('assets/img/banner/best-sale-4.jpg')"}}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-4 col-lg-5">
                        <div class="best-sale-content style-2 bg-cover" style={{backgroundImage:"url('assets/img/shape.png')"}}>
                            <div class="burger-shape">
                                <img src="assets/img/shape/fry-shape-4.png" alt="shape-img"/>
                            </div>
                            <div class="fry-shape">
                                <img src="assets/img/shape/burger-shape-4.png" alt="shape-img"/>
                            </div>
                            <h4 class="wow fadeInUp">Deal Of The Day</h4>
                            <h2 class="wow fadeInUp" data-wow-delay=".3s">
                            TODAY'S the
                            pizza' DAY
                            </h2>
                            <h3 class="wow fadeInUp" data-wow-delay=".5s">
                                <span>special price</span> $55
                            </h3>
                            <p class="wow fadeInUp" data-wow-delay=".7s">
                            Treat yourself to a mouthwatering pizza, topped with fresh ingredients and savory cheese. Don't miss today's special offer on our signature pizza!
                            </p>
                            {/* <div class="button-area wow fadeInUp" data-wow-delay=".9s">
                                <a href="shop-single.html" class="theme-btn bg-transparent">
                                <span class="button-content-wrapper d-flex align-items-center">
                                <span class="button-icon"><i class="flaticon-delivery"></i></span>
                                <span class="button-text">order now</span>
                                </span>
                                </a>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}

export default BestoftheDayBanner
