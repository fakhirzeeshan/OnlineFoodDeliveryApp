import React from 'react'

const Contactinfo = () => {
  return (
    <>
      <section class="contact-info-section fix section-padding section-bg">
            <div class="container">
                <div class="row g-4">
                    <div class="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay=".3s">
                        <div class="contact-info-items text-center">
                            <div class="icon">
                                <img src="assets/img/icon/location.svg" alt="icon-img"/>
                            </div>
                            <div class="content">
                                <h3>address line</h3>
                                <p>
                                    Bowery St, New York, 37 USA <br/>
                                    NY 10013,USA 
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay=".5s">
                        <div class="contact-info-items active text-center">
                            <div class="icon">
                                <img src="assets/img/icon/phone.svg" alt="icon-img"/>
                            </div>
                            <div class="content">
                                <h3>Phone Number</h3>
                                <p>
                                    +1255 - 568 - 6523 4374-221 <br/>
                                    +1255 - 568 - 6523
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay=".7s">
                        <div class="contact-info-items text-center">
                            <div class="icon">
                                <img src="assets/img/icon/email.svg" alt="icon-img"/>
                            </div>
                            <div class="content">
                                <h3>Mail Adress</h3>
                                <p>
                                    Foodking@gmail.com <br/>
                                    info@Foodking.com
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}

export default Contactinfo
