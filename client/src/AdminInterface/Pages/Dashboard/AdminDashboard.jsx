import React from 'react'
import Sidebar from '../../Components/Sidebar'
import Header from '../../Components/Header'
import { Link } from 'react-router-dom'
import Footer from '../../Components/Footer'
import { useState } from 'react'

const AdminDashboard = () => {

    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <>

            <div className='app-wrapper'>

                {isSidebarOpen && <Sidebar />}

                <div className='app-content'>

                <Header onToggleSidebar={toggleSidebar} />
                    <div className='p-6'>
                        <div className="flex justify-between items-center mb-6">
                            <h4 className="text-slate-900 text-lg font-medium">ADMIN Dashboard</h4>

                            <div className="md:flex hidden items-center gap-3 text-sm font-semibold">
                                <Link to="/admin" className="text-sm font-medium text-slate-700">FoodKing</Link>
                                <i className="bx bx-chevron-right text-lg flex-shrink-0 text-slate-400"></i>
                                <Link to="/admin" className="text-sm font-medium text-slate-700" aria-current="page">Dashboard</Link>
                            </div>
                        </div>


                        <div class="row">
                            <div class="col-xl-3 col-md-6">
                                <div class="card">
                                    <div class="p-5">
                                        <i class="bx bx-layer float-right text-3xl text-muted"></i>
                                        <h6 class="text-muted text-sm uppercase">Orders</h6>
                                        <h3 class="text-2xl mb-3" data-plugin="counterup">1,587</h3>
                                        <span class="inline-flex items-center gap-1.5 py-0.5 px-1.5 text-xs font-medium bg-success text-white rounded me-1"> +11% </span> <span class="text-muted">From previous period</span>
                                    </div>
                                </div>
                            </div>

                            <div class="col-xl-3 col-md-6">
                                <div class="card">
                                    <div class="p-5">
                                        <i class="bx bx-dollar-circle float-right text-3xl text-muted"></i>
                                        <h6 class="text-muted text-sm uppercase">Revenue</h6>
                                        <h3 class="text-2xl mb-3">$<span data-plugin="counterup">46,782</span></h3>
                                        <span class="inline-flex items-center gap-1.5 py-0.5 px-1.5 text-xs font-medium bg-danger text-white rounded me-1"> -29% </span> <span class="text-muted">From previous period</span>
                                    </div>
                                </div>
                            </div>

                            <div class="col-xl-3 col-md-6">
                                <div class="card">
                                    <div class="p-5">
                                        <i class="bx bx-bx bx-analyse float-right text-3xl text-muted"></i>
                                        <h6 class="text-muted text-sm uppercase">Average Price</h6>
                                        <h3 class="text-2xl mb-3">$<span data-plugin="counterup">15.9</span></h3>
                                        <span class="inline-flex items-center gap-1.5 py-0.5 px-1.5 text-xs font-medium bg-warning text-white rounded me-1"> 0% </span> <span class="text-muted">From previous period</span>
                                    </div>
                                </div>
                            </div>

                            <div class="col-xl-3 col-md-6">
                                <div class="card">
                                    <div class="p-5">
                                        <i class="bx bx-basket float-right text-3xl text-muted"></i>
                                        <h6 class="text-muted text-sm uppercase">Product Sold</h6>
                                        <h3 class="text-2xl mb-3" data-plugin="counterup">1,890</h3>
                                        <span class="inline-flex items-center gap-1.5 py-0.5 px-1.5 text-xs font-medium bg-success text-white rounded me-1"> +89% </span> <span class="text-muted">Last year</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <br />

                        <div className="grid lg:grid-cols-3 gap-6 mb-6">
                            <div className="card">
                                <div className="p-5">
                                    <div className="flex justify-between items-center">
                                        <h4 className="card-title mb-4">Daily Sales</h4>

                                        <div className="relative">
                                            <button className="text-lg text-gray-600 p-2" data-fc-placement="left-start" data-fc-type="dropdown" type="button">
                                                <i className="mdi mdi-dots-vertical"></i>
                                            </button>

                                            <div className="hidden z-10 bg-white w-44 shadow rounded border p-2 transition-all duration-300 fc-dropdown-open:translate-y-0 translate-y-3">
                                                <Link className="flex items-center py-1.5 px-3.5 rounded text-sm transition-all duration-300 bg-transparent text-gray-800 hover:bg-stone-100" to="#">
                                                    Action
                                                </Link>
                                                <Link className="flex items-center py-1.5 px-3.5 rounded text-sm transition-all duration-300 bg-transparent text-gray-800 hover:bg-gray-100" to="#">
                                                    Another action
                                                </Link>
                                                <Link className="flex items-center py-1.5 px-3.5 rounded text-sm transition-all duration-300 bg-transparent text-gray-800 hover:bg-gray-100" to="#">
                                                    Something else here
                                                </Link>
                                            </div>
                                        </div>
                                    </div>

                                    <div id="morris-donut-example" className="morris-chart" style={{ height: '260px' }}>

                                    </div>

                                    <div className="flex text-center mt-4">
                                        <div className="w-1/2">
                                            <h4 className="text-xl">5,459</h4>
                                            <p className="text-muted">Total Sales</p>
                                        </div>
                                        <div className="w-1/2">
                                            <h4 className="text-xl">18</h4>
                                            <p className="text-muted">Open Campaign</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="card">
                                <div className="p-5">
                                    <div className="flex justify-between items-center">
                                        <h4 className="card-title mb-4">Statistics</h4>

                                        <div className="relative">
                                            <button className="text-lg text-gray-600 p-2" data-fc-placement="left-start" data-fc-type="dropdown" type="button">
                                                <i className="mdi mdi-dots-vertical"></i>
                                            </button>

                                            <div className="hidden z-10 bg-white w-44 shadow rounded border p-2 transition-all duration-300 fc-dropdown-open:translate-y-0 translate-y-3">
                                                <Link className="flex items-center py-1.5 px-3.5 rounded text-sm transition-all duration-300 bg-transparent text-gray-800 hover:bg-stone-100" to="#">
                                                    Action
                                                </Link>
                                                <Link className="flex items-center py-1.5 px-3.5 rounded text-sm transition-all duration-300 bg-transparent text-gray-800 hover:bg-gray-100" to="#">
                                                    Another action
                                                </Link>
                                                <Link className="flex items-center py-1.5 px-3.5 rounded text-sm transition-all duration-300 bg-transparent text-gray-800 hover:bg-gray-100" to="#">
                                                    Something else here
                                                </Link>
                                            </div>
                                        </div>
                                    </div>

                                    <div id="morris-bar-example" className="morris-chart" style={{ height: '260px' }}></div>

                                    <div className="flex text-center mt-4">
                                        <div className="w-1/2">
                                            <h4 className="text-xl">$1875.54</h4>
                                            <p className="text-muted">Revenue</p>
                                        </div>
                                        <div className="w-1/2">
                                            <h4 className="text-xl">541</h4>
                                            <p className="text-muted">Total Offers</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="card">
                                <div className="p-5">
                                    <div className="flex justify-between items-center">
                                        <h4 className="card-title mb-4">Total Revenue</h4>

                                        <div className="relative">
                                            <button className="text-lg text-gray-600 p-2" data-fc-placement="left-start" data-fc-type="dropdown" type="button">
                                                <i className="mdi mdi-dots-vertical"></i>
                                            </button>

                                            <div className="hidden z-10 bg-white w-44 shadow rounded border p-2 transition-all duration-300 fc-dropdown-open:translate-y-0 translate-y-3">
                                                <Link className="flex items-center py-1.5 px-3.5 rounded text-sm transition-all duration-300 bg-transparent text-gray-800 hover:bg-stone-100" to="#">
                                                    Action
                                                </Link>
                                                <Link className="flex items-center py-1.5 px-3.5 rounded text-sm transition-all duration-300 bg-transparent text-gray-800 hover:bg-gray-100" to="#">
                                                    Another action
                                                </Link>
                                                <Link className="flex items-center py-1.5 px-3.5 rounded text-sm transition-all duration-300 bg-transparent text-gray-800 hover:bg-gray-100" to="#">
                                                    Something else here
                                                </Link>
                                            </div>
                                        </div>
                                    </div>

                                    <div id="morris-line-example" className="morris-chart" style={{ height: '260px' }}></div>

                                    <div className="flex text-center mt-4">
                                        <div className="w-1/2">
                                            <h4 className="text-xl">$7841.12</h4>
                                            <p className="text-muted">Total Revenue</p>
                                        </div>
                                        <div className="w-1/2">
                                            <h4 className="text-xl">17</h4>
                                            <p className="text-muted">Open Campaign</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>




                    </div>
                        <Footer />
                </div>

            </div>







        </>
    )
}

export default AdminDashboard
