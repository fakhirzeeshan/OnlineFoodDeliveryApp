import React from 'react'

const FoodBanner = () => {
  return (
    <>
     <section class="food-banner-section fix section-padding section-bg pt-0">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-xl-7 col-lg-9">
                        <div class="burger-banner-items bg-cover" style={{backgroundImage:" url(assets/img/banner/burger-bg.png)"}}>
                            <div class="burger-content text-center">
                                <h3>today</h3>
                                <h2>special</h2>
                                <h4><a href="shop.html" class="text-white">beef <span>burger</span></a></h4>
                            </div>
                            <div class="burger-image">
                                <img src="assets/img/food/big-burger.png" alt="food-img"/>
                            </div>
                            <div class="text-shape">
                                <img src="assets/img/shape/pizza-text-2.png" alt="shape-img"/>
                            </div>
                            <div class="burger-text">
                                <img src="assets/img/shape/burger-text.png" alt="shape-img"/>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-5 col-lg-9 mt-5 mt-xl-0">
                        <div class="single-offer-items style-2 bg-cover" style={{backgroundImage:"url('assets/img/banner/pepsi-bg.png')"}}>
                            <div class="offer-content">
                                <h5>crispy, every bite taste</h5>
                                <h3>
                                    FASH FOOD <br/>
                                    MEAL
                                </h3>
                                <p>
                                    The mouth-watering aroma of <br/>
                                    sizzling burgers
                                </p>
                                
                            </div>
                            <div class="offer-img">
                                <img src="assets/img/offer/50percent-off-3.png" alt="shape-img"/>
                            </div>
                            <div class="roller-box">
                                <img src="assets/img/food/roller-box.png" alt="food-img"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}

export default FoodBanner
