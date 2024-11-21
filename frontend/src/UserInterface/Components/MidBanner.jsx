import React from 'react'

const MidBanner = () => {
    return (
        <>
            <section class="food-comboo-section fix bg-cover section-padding" style={{ backgroundImage: "url('assets/img/bg-image/bg.jpg')" }}>
                <div class="drinks-shape">
                    <img src="assets/img/shape/drinks.png" alt="shape-img" />
                </div>
                <div class="container">
                    <div class="comboo-wrapper">
                        <div class="row align-items-center">
                            <div class="col-xl-6">
                                <div class="food-comboo-content">
                                    <div class="section-title">
                                        <span class="wow fadeInUp">Savor the Crunch in Every Bite</span>
                                        <h2 class="wow fadeInUp" data-wow-delay=".3s">
                                            Trending Food Combos
                                            Enjoy up to <span>20% </span>
                                        </h2>
                                    </div>
                                    <p class="wow fadeInUp" data-wow-delay=".5s">
                                        Experience mouth-watering flavors with our irresistible food combos, crafted to satisfy your cravings.
                                    </p>
                                    <div class="nav nav-tabs" id="nav-tab" role="tablist">
                                        <button class="nav-link wow fadeInUp" data-wow-delay=".3s" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">
                                            <span class="food-comboo-list">
                                                <span class="offer-image">
                                                    <img src="assets/img/offer/chicken.png" alt="img" />
                                                </span>
                                                <span class="comboo-title">
                                                    30% Off - 4pcs Crispy Chicken & 8pcs Wings
                                                </span>
                                            </span>
                                        </button>
                                        <button class="nav-link active wow fadeInUp" data-wow-delay=".5s" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">
                                            <span class="food-comboo-list">
                                                <span class="offer-image">
                                                    <img src="assets/img/offer/pizza.png" alt="img" />
                                                </span>
                                                <span class="comboo-title">
                                                    20% Off - Tasty Pizza & Drink Combo
                                                </span>
                                            </span>
                                        </button>
                                        <button class="nav-link wow fadeInUp" data-wow-delay=".7s" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">
                                            <span class="food-comboo-list">
                                                <span class="offer-image">
                                                    <img src="assets/img/offer/burger.png" alt="img" />
                                                </span>
                                                <span class="comboo-title">
                                                    2pcs Burgers with Drinks & Sauce
                                                </span>
                                            </span>
                                        </button>
                                    </div>
                                </div>

                            </div>
                            <div class="col-xl-6">
                                <div class="tab-content" id="nav-tab-Content">
                                    <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                                        <div class="comboo-image bg-cover" style={{ backgroundImage: "url('assets/img/banner/comboo-bg.jpg')" }}>
                                            <div class="pizza-text">
                                                <img src="assets/img/shape/combo-pizza-text.png" alt="shape-img" />
                                            </div>
                                            <div class="pizza-image">
                                                <img src="assets/img/food/big-pizza.png" alt="food-img" />
                                            </div>
                                            <div class="offer-shape">
                                                <img src="assets/img/offer/50percent-off-2.png" alt="shape-img" />
                                            </div>
                                            <div class="vegetable-shape">
                                                <img src="assets/img/shape/vegetable.png" alt="shape-img" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                                        <div class="comboo-image bg-cover" style={{ backgroundImage: " url('assets/img/banner/comboo-bg.jpg')" }}>
                                            <div class="pizza-text">
                                                <img src="assets/img/shape/combo-pizza-text.png" alt="shape-img" />
                                            </div>
                                            <div class="pizza-image">
                                                <img src="assets/img/food/big-pizza.png" alt="food-img" />
                                            </div>
                                            <div class="offer-shape">
                                                <img src="assets/img/offer/50percent-off-2.png" alt="shape-img" />
                                            </div>
                                            <div class="vegetable-shape">
                                                <img src="assets/img/shape/vegetable.png" alt="shape-img" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">
                                        <div class="comboo-image bg-cover" style={{ backgroundImage: "url('assets/img/banner/comboo-bg.jpg')" }}>
                                            <div class="pizza-text">
                                                <img src="assets/img/shape/combo-pizza-text.png" alt="shape-img" />
                                            </div>
                                            <div class="pizza-image">
                                                <img src="assets/img/food/big-pizza.png" alt="food-img" />
                                            </div>
                                            <div class="offer-shape">
                                                <img src="assets/img/offer/50percent-off-2.png" alt="shape-img" />
                                            </div>
                                            <div class="vegetable-shape">
                                                <img src="assets/img/shape/vegetable.png" alt="shape-img" />
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

export default MidBanner
