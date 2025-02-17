import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaFilm } from 'react-icons/fa';

function Navbar() {
    //const [currentDate, setCurrentDate] = useState('');
    //const [currentTime, setCurrentTime] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const updateDateTime = () => {
            //const now = new Date();
            //const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
            //const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
            //setCurrentDate(now.toLocaleDateString('en-US', dateOptions));
            //setCurrentTime(now.toLocaleTimeString('en-US', timeOptions));
        };

        updateDateTime(); // Initialize with current date and time
        const intervalId = setInterval(updateDateTime, 1000); // Update every second

        return () => clearInterval(intervalId); // Cleanup on component unmount
    }, []);

    const handleSignOut = () => {
        // Clear authentication tokens or user data here
        // For example: localStorage.removeItem('authToken');

        // Navigate to the login page
        navigate('/login');
    };

    return (
        <nav className="bg-gradient-to-r black from-gray-800 to-gray-900 p-4">
            <div className="flex justify-between items-center">
                {/* Left side: Icon and Film Hall Name */}
                <div className="flex items-center space-x-2">
                    <FaFilm className="text-white text-2xl" />
                    <div className="text-white text-2xl font-bold">
                        <Link to="/">Film Hall</Link>
                    </div>
                </div>

                {/* Center: Current Date and Time */}
                {/*<div className="text-white text-center">*/}
                {/*    <div className="text-lg font-semibold">{currentDate}</div>*/}
                {/*    <div className="text-sm">{currentTime}</div>*/}
                {/*</div>*/}

                {/* Right side: Navigation Links */}
                <div className="flex items-center space-x-14 text-lg">
                    <NavLink
                        to="/dashboard"
                        className={({ isActive }) =>
                            isActive ? 'text-yellow-300' : 'text-white'
                        }
                    >
                        Dashboard
                    </NavLink>
                    <NavLink
                        to="/films"
                        className={({ isActive }) =>
                            isActive ? 'text-yellow-300' : 'text-white'
                        }
                    >
                        Films
                    </NavLink>
                    <NavLink
                        to="/customers"
                        className={({ isActive }) =>
                            isActive ? 'text-yellow-300' : 'text-white'
                        }
                    >
                        Customers
                    </NavLink>
                    <NavLink
                        to="/seats"
                        className={({ isActive }) =>
                            isActive ? 'text-yellow-300' : 'text-white'
                        }
                    >
                        Seats
                    </NavLink>
                    <NavLink
                        to="/time-schedules"
                        className={({ isActive }) =>
                            isActive ? 'text-yellow-300' : 'text-white'
                        }
                    >
                        Schedules
                    </NavLink>


                {/* Sign Out Button */}
                    <button
                        onClick={handleSignOut}
                        className="text-sm text-white bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 focus:outline-none focus:ring-4 focus:ring-red-500 focus:ring-opacity-50 px-6 py-2 rounded-full shadow-lg transform transition-transform duration-200 hover:scale-105"
                    >
                        Sign Out
                    </button>

                </div>
            </div>
        </nav>
    );
}

export default Navbar;
