import React from 'react'
import {Link} from 'react-router-dom'

const Error = () => {
  return (
    <>
    <section class="error-section section-bg section-padding fix">
            <div class="container">
                <div class="error-content text-center">
                    <h2 class="wow fadeInUp" data-wow-delay=".3s">Not<span>Found</span></h2>
                    <h3 class="wow fadeInUp" data-wow-delay=".5s">we’re sorry page not found</h3>
                    <Link to="/" class="theme-btn style-line-height mt-5 wow fadeInUp" data-wow-delay=".7s">
                    <span class="button-text">Back To Home</span>
                    </Link>
                </div>
            </div>
        </section>
    </>
  )
}

export default Error
