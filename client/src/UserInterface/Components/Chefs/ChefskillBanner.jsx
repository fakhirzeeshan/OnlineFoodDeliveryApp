import React from 'react'

const ChefskillBanner = () => {
    return (
        <>
            <section class="team-skill fix section-padding bg-cover" style={{backgroundImage:" url('/assets/img/banner/main-cta-bg-2.jpg')"}}>
                <div class="container">
                    <div class="team-skill-wrapper">
                        <div class="row justify-content-between">
                            <div class="col-lg-6 wow fadeInUp" data-wow-delay=".3s">
                                <div class="team-skill-content">
                                    <h3>
                                        Welcome to our culinary haven
                                        where each dish is a symphony
                                        of flavors meticulously
                                    </h3>
                                </div>
                            </div>
                            <div class="col-lg-5 mt-4 mt-lg-0 wow fadeInUp" data-wow-delay=".5s">
                                <div class="progress-wrap">
                                    <div class="pro-items">
                                        <div class="pro-head">
                                            <h6 class="title">
                                                cooking chiness
                                            </h6>
                                            <span class="point">
                                                65%
                                            </span>
                                        </div>
                                        <div class="progress">
                                            <div class="progress-value"></div>
                                        </div>
                                    </div>
                                    <div class="pro-items">
                                        <div class="pro-head">
                                            <h6 class="title">
                                                serve managment
                                            </h6>
                                            <span class="point">
                                                75%
                                            </span>
                                        </div>
                                        <div class="progress">
                                            <div class="progress-value style-two"></div>
                                        </div>
                                    </div>
                                    <div class="pro-items">
                                        <div class="pro-head">
                                            <h6 class="title">
                                                Human Interacation
                                            </h6>
                                            <span class="point">
                                                65%
                                            </span>
                                        </div>
                                        <div class="progress">
                                            <div class="progress-value"></div>
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

export default ChefskillBanner
