import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Header = ({ onToggleSidebar }) => {
    const [user, setUser] = useState(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            const userId = localStorage.getItem('userId');
            if (!userId) {
                alert("User ID not found. Please log in.");
                return;
            }
            try {
                const response = await axios.get(`http://localhost:5000/api/users/${userId}`);
                setUser(response.data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleLogout = () => {
        localStorage.removeItem("userId");
        localStorage.removeItem("token");
        navigate("/login"); // Redirect to login page after logout
    };

    return (
        
        <header className="app-header flex items-center px-5 gap-4" style={{ backgroundColor: '#F1F5F9' }}>
            <Link className="logo-box" to="/">
                <img src="/assets/img/logo/logo.svg" className="h-6" alt="Small logo" />
            </Link>

            <button
                id="button-toggle-menu"
                className="nav-link p-2 waves-effect me-auto"
                onClick={onToggleSidebar} // Toggle sidebar on button click
            >
                <span className="sr-only">Menu Toggle Button</span>
                <span className="flex items-center justify-center h-6 w-6">
                    <i className="ph ph-list text-2xl"></i>
                </span>
            </button>

            <div className="md:flex hidden items-center relative">
                <input
                    type="search"
                    className="form-input px-8 rounded-full bg-gray-500/10 border-transparent focus:border-transparent"
                    placeholder="Search..."
                />
            </div>

            <div className="relative" ref={dropdownRef}>
                <button
                    onClick={toggleDropdown}
                    type="button"
                    className="nav-link flex items-center gap-2.5 waves-effect p-2"
                >
                    <img
                        src={user?.Userimage || "/images/users/default-avatar.jpg"} // Fallback to default if no image
                        alt="user-profile"
                        className="rounded-full h-8 w-8"
                    />
                    <span className="md:flex items-center hidden">
                        <span className="font-medium text-base">{user?.Username || "User"}</span>
                        <i className="ph ph-chevron-down"></i>
                    </span>
                </button>
                {isDropdownOpen && (
                    <div className="absolute w-40 z-50 mt-2 bg-white shadow-lg border rounded-lg p-2">
                        <Link to="/admin-profile" className="flex items-center py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100">
                            Profile
                        </Link>
                        <button
                            className="flex items-center py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100"
                            onClick={handleLogout}
                        >
                            Log Out
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
