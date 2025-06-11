import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './UserInterface/Pages/Home/Home';
import Aboutus from './UserInterface/Pages/AboutUs/Aboutus';
import Contact from './UserInterface/Pages/Contact/Contact';
import Chefs from './UserInterface/Pages/Chefs/Chefs';
import Reservation from './UserInterface/Pages/Reservation/Reservation';
import Shopcart from './UserInterface/Pages/Shopcart/Shopcart';
import Checkout from './UserInterface/Pages/Shopcart/Checkout';
import Chefdetails from './UserInterface/Pages/Chefs/Chefdetails';
import Shopsingle from './UserInterface/Pages/Shopcart/Shopsingle';
import Login from './Pages/Login/Login';
import Signup from './Pages/Signup/Signup';
import AdminDashboard from './AdminInterface/Pages/Dashboard/AdminDashboard';
import AddUser from './AdminInterface/Pages/Users/AddUser';
import UserList from './AdminInterface/Pages/Users/UserList';
import UpdateUser from './AdminInterface/Pages/Users/UpdateUser';
import Addchef from './AdminInterface/Pages/Chefs/Addchef';
import ChefList from './AdminInterface/Pages/Chefs/ChefList';
import Updatechef from './AdminInterface/Pages/Chefs/Updatechef';
import Addfood from './AdminInterface/Pages/Foods/Addfood';
import FoodList from './AdminInterface/Pages/Foods/FoodList';
import Updatefood from './AdminInterface/Pages/Foods/Updatefood';
import AdminOrders from './AdminInterface/Pages/Orders/AdminOrders';
import UserOrders from './Pages/UserProfile/UserOrders/UserOrders';
import Success from './UserInterface/Pages/Shopcart/Success';
import Cancel from './UserInterface/Pages/Shopcart/Cancel';
import UserProfile from './Pages/UserProfile/UserProfile/UserProfile';
import AdminProfile from './AdminInterface/Pages/Profile/AdminProfile';
import ManageReservations from './AdminInterface/Pages/Reservations/ManageReservations';
import UserReservations from './Pages/UserProfile/UserReservations/UserReservations';
import ProtectedRoute from './Components/ProtectedRoute';
import Feedback from './AdminInterface/Pages/Feedback/Feedback';
import ErrorPage from './Components/Error';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path='/' element={<Home />} />
        <Route path='/aboutus' element={<Aboutus />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/chefs' element={<Chefs />} />
        <Route path='/chefdetails/:id' element={<Chefdetails />} />
        <Route path='/reservation' element={<Reservation />} />
        <Route path='/cart' element={<Shopcart />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/success' element={<Success />} />
        <Route path='/cancel' element={<Cancel />} />
        <Route path='/productsingle/:id' element={<Shopsingle />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />

        {/* Catch-all route for undefined paths */}
        <Route path="*" element={<ErrorPage />} />

        {/* User Routes */}
        <Route
          path="/user-orders"
          element={
            <ProtectedRoute
              element={<UserOrders />}
              isAdminRoute={false}
            />
          }
        />
        <Route
          path="/user-profile"
          element={
            <ProtectedRoute
              element={<UserProfile />}
              isAdminRoute={false}
            />
          }
        />
        <Route
          path="/user-reservations"
          element={
            <ProtectedRoute
              element={<UserReservations />}
              isAdminRoute={false}
            />
          }
        />

        {/* Admin Routes */}

        <Route
          path="/admin"
          element={
            <ProtectedRoute
              element={<AdminDashboard />}
              isAdminRoute={true}
            />
          }
        />
        <Route
          path="/adduser"
          element={
            <ProtectedRoute
              element={<AddUser />}
              isAdminRoute={true}
            />
          }
        />
        <Route
          path="/userlist"
          element={
            <ProtectedRoute
              element={<UserList />}
              isAdminRoute={true}
            />
          }
        />
        <Route
          path="/updateuser/:userId"
          element={
            <ProtectedRoute
              element={<UpdateUser />}
              isAdminRoute={true}
            />
          }
        />
        <Route
          path="/addchef"
          element={
            <ProtectedRoute
              element={<Addchef />}
              isAdminRoute={true}
            />
          }
        />
        <Route
          path="/cheflist"
          element={
            <ProtectedRoute
              element={<ChefList />}
              isAdminRoute={true}
            />
          }
        />
        <Route
          path="/updatechef/:id"
          element={
            <ProtectedRoute
              element={<Updatechef />}
              isAdminRoute={true}
            />
          }
        />
        <Route
          path="/addfood"
          element={
            <ProtectedRoute
              element={<Addfood />}
              isAdminRoute={true}
            />
          }
        />
        <Route
          path="/foodlist"
          element={
            <ProtectedRoute
              element={<FoodList />}
              isAdminRoute={true}
            />
          }
        />
        <Route
          path="/updatefood/:id"
          element={
            <ProtectedRoute
              element={<Updatefood />}
              isAdminRoute={true}
            />
          }
        />
        <Route
          path="/adminorders"
          element={
            <ProtectedRoute
              element={<AdminOrders />}
              isAdminRoute={true}
            />
          }
        />
        <Route
          path="/manage-reservations"
          element={
            <ProtectedRoute
              element={<ManageReservations />}
              isAdminRoute={true}
            />
          }
        />
        <Route
          path="/admin-profile"
          element={
            <ProtectedRoute
              element={<AdminProfile />}
              isAdminRoute={true}
            />
          }
        />
        <Route
          path="/feedback"
          element={
            <ProtectedRoute
              element={<Feedback />}
              isAdminRoute={true}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
