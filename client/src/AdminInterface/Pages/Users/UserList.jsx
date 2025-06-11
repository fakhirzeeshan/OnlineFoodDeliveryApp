import React from 'react'
import Sidebar from '../../Components/Sidebar'
import Header from '../../Components/Header'
import { Link } from 'react-router-dom'
import Footer from '../../Components/Footer'
import { useState, useEffect } from 'react'
import axios from 'axios'
// import { useNavigate } from 'react-router-dom'

const UserList = () => {

    const [Users, setUsers] = useState([]);
    // const navigate = useNavigate()


    useEffect(() => {
        const FetchUser = async () => {

            try {
                const response = await axios.get("http://localhost:5000/api/users")
                setUsers(response.data)
                
            } catch (err) {
                console.error(`error : ${err}`)
            }
        }

        FetchUser();
    }, [])


    const handleDelete = async (userId) => {
        try {
            await axios.delete(`http://localhost:5000/api/users/${userId}`);
            setUsers(Users.filter(user => user._id !== userId));
        } catch (err) {
            console.error("Error deleting user", err);
        }
    };

      // Add function to handle update navigation
    //   const handleUpdate = (userId) => {
    //     navigate(`/updateuser/${userId}`); // Redirect to update page with userId
    // }


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
                            <h4 className="text-slate-900 text-lg font-medium">User List</h4>

                            <div className="md:flex hidden items-center gap-3 text-sm font-semibold">
                                <Link to="/admin" className="text-sm font-medium text-slate-700">FoodKing</Link>
                                <i className="bx bx-chevron-right text-lg flex-shrink-0 text-slate-400"></i>
                                <Link to="/userlist" className="text-sm font-medium text-slate-700" aria-current="page">Users</Link>
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
                                                <thead style={{backgroundColor:'black'}}>
                                                    <tr>
                                                        <th scope="col" className="px-6 py-3 text-start text-sm text-white">Name</th>
                                                        <th scope="col" className="px-6 py-3 text-start text-sm text-white">Email</th>
                                                        <th scope="col" className="px-6 py-3 text-start text-sm text-white">Phone</th>
                                                        <th scope="col" className="px-6 py-3 text-end text-sm text-white">Action</th>
                                                        <th scope="col" className="px-6 py-3 text-end text-sm text-white"></th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-gray-200">
                                                    {
                                                        Users.map((user) => {
                                                            return (
                                                                <tr key={user._id}>
                                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{user.Username}</td>
                                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{user.Useremail}</td>
                                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{user.Userphone}</td>
                                                                    <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                                                                        <button className="text-primary hover:text-sky-700" onClick={()=>handleDelete(user._id)}>Delete</button>
                                                                    </td>
                                                                    <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                                                                        <Link className="text-primary hover:text-sky-700" to={`/updateuser/${user._id}`} >Update</Link>
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

export default UserList
