import React from 'react'

const FoodBanner = () => {
  return (
    <>
     <section class="food-banner fix section-padding pt-0">
            <div class="row g-3">
                <div class="col-xl-4 col-lg-6 col-md-6">
                    <div class="food-banner-items-2 bg-effect bg-cover" style={{backgroundImage:" url(assets/img/home-5/burger/01.jpg)"}}>
                        <div class="price bg-cover" style={{backgroundImage:"url('assets/img/vector.png')"}}>
                            <span>$38</span>
                        </div>
                        <div class="food-content">
                            <h4>start price $25</h4>
                            <h2 className='text-white'>
                                delicious <br />
                                hamburger <br />
                                fries
                            </h2>
                            
                        </div>
                    </div>
                </div>
                <div class="col-xl-4 col-lg-6 col-md-6">
                    <div class="food-banner-items-2 bg-effect bg-cover" style={{backgroundImage:"url(assets/img/home-5/burger/02.jpg)"}}>
                        <div class="price style-2 bg-cover" style={{backgroundImage:"url('assets/img/vector-2.png')"}}>
                            <span>$43</span>
                        </div>
                        <div class="food-content">
                            <h4>start price $25</h4>
                            <h2 className='text-white'>
                                delicious <br />
                                hamburger <br />
                                fries
                            </h2>
                            
                        </div>
                    </div>
                </div>
                <div class="col-xl-4 col-lg-6 col-md-6">
                    <div class="food-banner-items-2 bg-effect bg-cover" style={{backgroundImage:"url(assets/img/home-5/burger/03.jpg)"}}>
                        <div class="price bg-cover" style={{backgroundImage:"url('assets/img/vector.png')"}}>
                            <span>$38</span>
                        </div>
                        <div class="food-content">
                            <h4>start price $25</h4>
                            <h2 className='text-white'>
                                delicious <br />
                                hamburger <br />
                                fries
                            </h2>
                            
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}

export default FoodBanner
