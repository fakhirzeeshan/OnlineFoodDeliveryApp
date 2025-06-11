import React from 'react'
import { Link } from 'react-router-dom'

const ContactCrouselBanner = () => {
  return (
    <>
     <div class="breadcrumb-wrapper bg-cover" style={{backgroundImage:"url('assets/img/banner/breadcrumb.jpg')"}}>
            <div class="container">
                <div class="page-heading center">
                    <h1>Contact us</h1>
                    <ul class="breadcrumb-items">
                        <li>
                            <Link to="/">
                            Home Page
                            </Link>
                        </li>
                        <li>
                            <i class="far fa-chevron-right"></i>
                        </li>
                        <li>
                            contact us
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </>
  )
}

export default ContactCrouselBanner
