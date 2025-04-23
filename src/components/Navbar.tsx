import React from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { FaFilm, FaSignOutAlt } from 'react-icons/fa';
import {useDispatch} from "react-redux";
import { setRole, setEmail, setPassword, setError } from '../reducers/SignupSlice';  // Ensure the correct path

function Navbar() {
    const navigate = useNavigate();
    const location = useLocation(); // Get current route
    const dispatch = useDispatch();

    // Define colors for different pages
    const navbarColors = {
        '/dashboard': 'bg-gradient-to-r from-black to-blue-950',
        '/films': 'bg-transparent p-4',
        '/customer': 'bg-transparent p-4',
        '/seats': 'bg-transparent p-4',
        '/time-schedules': 'bg-transparent p-4',
    };

    // Get the color based on the current path or use a default
    const navbarColor = navbarColors[location.pathname] || 'bg-gradient-to-r from-black to-blue-950';

    const handleSignOut = () => {
        // First, navigate to the home page
        navigate("/");

        // Dispatch Redux actions to reset authentication state
        dispatch(setRole('')); // Clear the role
        dispatch(setEmail('')); // Optionally clear email
        dispatch(setPassword('')); // Optionally clear password
        dispatch(setError('')); // Clear any errors (optional)

        // Optionally, remove any authentication data from localStorage
        localStorage.removeItem('auth_token'); // or any other relevant storage
    };


    return (
        <nav className={`${navbarColor} p-4 transition-all duration-300`}>
            <div className="flex justify-between items-center">
                {/* Left: Logo & Name */}
                <div className="flex items-center space-x-2">
                    <FaFilm className="text-white text-2xl" />
                    <div className="text-white text-2xl font-bold">
                        <Link to="/dashboard">CineMax</Link>
                    </div>
                </div>

                {/* Right: Navigation Links */}
                <div className="flex items-center space-x-14 text-lg">
                    <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'text-yellow-300' : 'text-white'}>
                        Dashboard
                    </NavLink>
                    <NavLink to="/films" className={({ isActive }) => isActive ? 'text-yellow-300' : 'text-white'}>
                        Films
                    </NavLink>
                    <NavLink to="/customer" className={({ isActive }) => isActive ? 'text-yellow-300' : 'text-white'}>
                        Employees
                    </NavLink>
                    <NavLink to="/seats" className={({ isActive }) => isActive ? 'text-yellow-300' : 'text-white'}>
                        Seats
                    </NavLink>
                    <NavLink to="/time-schedules" className={({ isActive }) => isActive ? 'text-yellow-300' : 'text-white'}>
                        Orders
                    </NavLink>

                    {/* Sign Out Button */}
                    <button
                        onClick={handleSignOut}
                        className="text-sm text-white bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 px-6 py-2 rounded-full shadow-lg transform transition-transform duration-200 hover:scale-105"
                    >
                        <FaSignOutAlt className="text-lg" />
                    </button>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
