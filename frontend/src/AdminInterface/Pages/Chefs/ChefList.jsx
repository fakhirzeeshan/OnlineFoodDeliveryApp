import React from 'react'
import Sidebar from '../../Components/Sidebar'
import Header from '../../Components/Header'
import Footer from '../../Components/Footer'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'

const ChefList = () => {


    const [Chefs, setChefs] = useState([]);

    useEffect(() => {

        const FetchChefs = async () => {

            try {
                const response = await axios.get("http://localhost:5000/api/chefs")
                setChefs(response.data)
            } catch (err) {
                console.error('error', err)
            }
        }
        FetchChefs();
    })


    const HandleDelete = async (chefId) => {
        try {
            axios.delete(`http://localhost:5000/api/chefs/${chefId}`)
            setChefs(Chefs.filter(chef => chef._id !== chefId))
        } catch (err) {
            console.error('error deleting chef', err)
        }
    }

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
                            <h4 className="text-slate-900 text-lg font-medium">Chef List</h4>

                            <div className="md:flex hidden items-center gap-3 text-sm font-semibold">
                                <Link to="/admin" className="text-sm font-medium text-slate-700">FoodKing</Link>
                                <i className="bx bx-chevron-right text-lg flex-shrink-0 text-slate-400"></i>
                                <Link to="/cheflist" className="text-sm font-medium text-slate-700" aria-current="page">Chefs</Link>
                            </div>
                        </div>
                        <div className="card bg-white overflow-hidden">
                            <div className="card-header">
                                <h4 className="card-title">List</h4>
                            </div>
                            <div>
                                <div className="overflow-x-auto">
                                    <div className="min-w-full inline-block align-middle">
                                        <div className="overflow-hidden">
                                            <table className="min-w-full divide-y divide-gray-200">
                                                <thead style={{ backgroundColor: 'black' }}>
                                                    <tr>
                                                        <th scope="col" className="px-6 py-3 text-start text-sm text-white">Name</th>
                                                        <th scope="col" className="px-6 py-3 text-start text-sm text-white">Speciality</th>
                                                        <th scope="col" className="px-6 py-3 text-start text-sm text-white">Image</th>
                                                        <th scope="col" className="px-6 py-3 text-end text-sm text-white">Action</th>
                                                        <th scope="col" className="px-6 py-3 text-end text-sm text-white"></th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-gray-200">
                                                    {
                                                        Chefs.map((chef) => {
                                                            return (
                                                                <tr key={chef._id}>
                                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{chef.chefname}</td>
                                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{chef.chefspecialty}</td>
                                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{chef.chefimage}</td>
                                                                    <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                                                                        <button className="text-primary hover:text-sky-700" onClick={()=>HandleDelete(chef._id)}>Delete</button>
                                                                    </td>
                                                                    <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                                                                        <Link className="text-primary hover:text-sky-700" to={`/updatechef/${chef._id}`} >Update</Link>
                                                                    </td>
                                                                </tr>

                                                            )
                                                        })
                                                    }

                                                </tbody>
                                            </table>
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

export default ChefList
