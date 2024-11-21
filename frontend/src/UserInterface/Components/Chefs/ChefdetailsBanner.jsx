import React from 'react'
import { Link } from 'react-router-dom'

const ChefdetailsBanner = () => {
  return (
    <>
       <div class="breadcrumb-wrapper bg-cover" style={{backgroundImage:"url('/assets/img/banner/breadcrumb.jpg')"}}>
            <div class="container">
                <div class="page-heading center">
                    <h1>chef Details</h1>
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
                            chef details
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </>
  )
}

export default ChefdetailsBanner
