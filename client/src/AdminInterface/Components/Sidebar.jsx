import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link


const Sidebar = ({isOpen }) => {
  const [isUserSubMenuOpen, setIsUserSubMenuOpen] = useState(false); // State for user submenu toggle
  const [isChefSubMenuOpen, setIsChefSubMenuOpen] = useState(false); // State for chef submenu toggle
  const [isFoodSubMenuOpen, setIsFoodSubMenuOpen] = useState(false); // State for food submenu toggle

  const toggleUserSubMenu = () => {
    setIsUserSubMenuOpen(!isUserSubMenuOpen); // Toggle user submenu state
  };

  const toggleChefSubMenu = () => {
    setIsChefSubMenuOpen(!isChefSubMenuOpen); // Toggle chef submenu state
  };

  const toggleFoodSubMenu = () => {
    setIsFoodSubMenuOpen(!isFoodSubMenuOpen); // Toggle food submenu state
  };

  return (
    <div className={`app-menu ${isOpen ? 'open' : ''}`} style={{ backgroundColor: 'black' }}>
      <Link className="logo-box" to="/admin">
        <img src="/assets/img/logo/logo-3-GRUBGO.webp" className="logo-light h-6" alt="Light logo" />
        <img src="/assets/img/logo/logo-3-GRUBGO.webp" className="logo-dark h-6" alt="Dark logo" />
      </Link>

      <div data-simplebar>
        <ul className="menu" data-fc-type="accordion">
          <li className="menu-title text-white">Menu</li>

          <li className="menu-item">
            <Link className="menu-link waves-effect text-white" to="/admin">
              <span className="menu-icon"><i className="ph-duotone ph-house"></i></span>
              <span className="menu-text"> Dashboard </span>
              <span className="badge bg-primary rounded ms-auto">01</span>
            </Link>
          </li>

          <li className="menu-title text-white">Manage</li>

          {/* Users Submenu */}
          <li className="menu-item">
            <button
              onClick={toggleUserSubMenu}
              className="menu-link waves-effect text-white flex justify-between items-center"
              aria-expanded={isUserSubMenuOpen}
            >
              <span className="menu-icon"><i className="ph-duotone ph-user"></i></span>
              <span className="menu-text"> Users </span>
              <span className={`menu-arrow transform transition-transform duration-300 ${isUserSubMenuOpen ? 'rotate-90' : 'rotate-0'}`}></span>
            </button>
            <ul className={`sub-menu ${isUserSubMenuOpen ? '' : 'hidden'}`}>
              <li className="menu-item">
                <Link className="menu-link text-white" to="/adduser">
                  <span className="menu-dot"></span>
                  <span className="menu-text">Add Users</span>
                </Link>
              </li>
              <li className="menu-item">
                <Link className="menu-link text-white" to="/userlist">
                  <span className="menu-dot"></span>
                  <span className="menu-text">User List</span>
                </Link>
              </li>
            </ul>
          </li>

          {/* Chefs Submenu */}
          <li className="menu-item">
            <button
              onClick={toggleChefSubMenu}
              className="menu-link waves-effect text-white flex justify-between items-center"
              aria-expanded={isChefSubMenuOpen}
            >
              <span className="menu-icon"><i class="fal fa-hat-chef"></i></span>
              <span className="menu-text"> Chefs </span>
              <span className={`menu-arrow transform transition-transform duration-300 ${isChefSubMenuOpen ? 'rotate-90' : 'rotate-0'}`}></span>
            </button>
            <ul className={`sub-menu ${isChefSubMenuOpen ? '' : 'hidden'}`}>
              <li className="menu-item">
                <Link className="menu-link text-white" to="/addchef">
                  <span className="menu-dot"></span>
                  <span className="menu-text">Add Chefs</span>
                </Link>
              </li>
              <li className="menu-item">
                <Link className="menu-link text-white" to="/cheflist">
                  <span className="menu-dot"></span>
                  <span className="menu-text">Chef List</span>
                </Link>
              </li>
            </ul>
          </li>

          {/* Foods Submenu */}
          <li className="menu-item">
            <button
              onClick={toggleFoodSubMenu}
              className="menu-link waves-effect text-white flex justify-between items-center"
              aria-expanded={isFoodSubMenuOpen}
            >
              <span className="menu-icon"><i className="ph-duotone ph-pizza"></i></span>
              <span className="menu-text"> Foods </span>
              <span className={`menu-arrow transform transition-transform duration-300 ${isFoodSubMenuOpen ? 'rotate-90' : 'rotate-0'}`}></span>
            </button>
            <ul className={`sub-menu ${isFoodSubMenuOpen ? '' : 'hidden'}`}>
              <li className="menu-item">
                <Link className="menu-link text-white" to="/addfood">
                  <span className="menu-dot"></span>
                  <span className="menu-text">Add Foods</span>
                </Link>
              </li>
              <li className="menu-item">
                <Link className="menu-link text-white" to="/foodlist">
                  <span className="menu-dot"></span>
                  <span className="menu-text">Food List</span>
                </Link>
              </li>
            </ul>
          </li>

          <li className="menu-item">
            <Link className="menu-link waves-effect text-white" to="/adminorders">
              <span className="menu-icon"><i className="ph-duotone ph-table"></i></span>
              <span className="menu-text"> Orders </span>
            </Link>
          </li>
          <li className="menu-item">
            <Link className="menu-link waves-effect text-white" to="/manage-reservations">
              <span className="menu-icon"><i className="ph-duotone ph-calendar"></i></span>
              <span className="menu-text"> Reservations </span>
            </Link>
          </li>
          <li className="menu-item">
            <Link className="menu-link waves-effect text-white" to="/feedback">
              <span className="menu-icon"><i className="ph-duotone ph-chat"></i></span>
              <span className="menu-text"> Feedbacks </span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
