import React, { useState } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { FaFilm, FaSignOutAlt, FaBars } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { setRole, setEmail, setPassword, setError } from '../reducers/SignupSlice'; // Ensure the correct path

function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [clickedLink, setClickedLink] = useState(''); // Track clicked link

    const navbarColors = {
        '/dashboard': 'bg-transparent p-4',
        '/filmsC': 'bg-transparent p-4',
        '/buyTickets': 'bg-gradient-to-r from-gray-900 to-black p-4',
    };

    const navbarColor = navbarColors[location.pathname] || 'bg-gradient-to-r from-black to-blue-950';

    const handleSignOut = () => {
        navigate('/');
        dispatch(setRole(''));
        dispatch(setEmail(''));
        dispatch(setPassword(''));
        dispatch(setError(''));
        localStorage.removeItem('auth_token');
    };

    // Function to handle clicking a navigation link
    const handleNavClick = (link) => {
        setClickedLink(link); // Set the clicked link
    };

    return (
        <nav className={`${navbarColor} sticky top-0 z-30 p-4 transition-all duration-300 shadow-lg`}>
            <div className="flex justify-between items-center">
                {/* Left: Logo & Name */}
                <div className="flex items-center space-x-3">
                    <FaFilm className="text-white text-3xl" />
                    <div className="text-white text-3xl font-semibold">
                        <Link to="/dashboardC">Film Hall</Link>
                    </div>
                </div>

                {/* Right: Navigation Links */}
                <div className="hidden sm:flex items-center space-x-8 text-lg">
                    <NavLink
                        to="/dashboardC"
                        onClick={() => handleNavClick('dashboardC')} // Track clicked link
                        className={({ isActive }) =>
                            (clickedLink === 'dashboardC' || isActive) ? 'text-yellow-300' : 'text-white hover:text-yellow-300 transition-colors'
                        }
                    >
                        Dashboard
                    </NavLink>
                    <NavLink
                        to="/filmsC"
                        onClick={() => handleNavClick('filmsC')} // Track clicked link
                        className={({ isActive }) =>
                            (clickedLink === 'filmsC' || isActive) ? 'text-yellow-300' : 'text-white hover:text-yellow-300 transition-colors'
                        }
                    >
                        Films
                    </NavLink>
                    <NavLink
                        to="/buyTickets"
                        onClick={() => handleNavClick('buyTickets')} // Track clicked link
                        className={({ isActive }) =>
                            (clickedLink === 'buyTickets' || isActive) ? 'text-yellow-300' : 'text-white hover:text-yellow-300 transition-colors'
                        }
                    >
                        Buy Tickets
                    </NavLink>

                    {/* Sign Out Button */}
                    <button
                        onClick={handleSignOut}
                        className="text-sm text-white bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 px-6 py-2 rounded-full shadow-lg transform transition-transform duration-200 hover:scale-105"
                    >
                        <FaSignOutAlt className="text-lg" />
                    </button>
                </div>

                {/* Mobile Menu Button (hamburger icon) */}
                <div className="sm:hidden flex items-center">
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="text-white text-2xl"
                    >
                        <FaBars />
                    </button>
                </div>
            </div>

            {/* Mobile Menu (conditional rendering based on state) */}
            {isMobileMenuOpen && (
                <div className="sm:hidden bg-gradient-to-r from-black to-blue-950 text-white p-4 space-y-4 mt-4">
                    <NavLink
                        to="/dashboardC"
                        onClick={() => handleNavClick('dashboardC')} // Track clicked link
                        className={({ isActive }) =>
                            (clickedLink === 'dashboardC' || isActive) ? 'text-yellow-300' : 'text-white hover:text-yellow-300 transition-colors'
                        }
                    >
                        Dashboard
                    </NavLink>
                    <NavLink
                        to="/filmsC"
                        onClick={() => handleNavClick('filmsC')} // Track clicked link
                        className={({ isActive }) =>
                            (clickedLink === 'filmsC' || isActive) ? 'text-yellow-300' : 'text-white hover:text-yellow-300 transition-colors'
                        }
                    >
                        Films
                    </NavLink>
                    <NavLink
                        to="/seatsC"
                        onClick={() => handleNavClick('seatsC')} // Track clicked link
                        className={({ isActive }) =>
                            (clickedLink === 'seatsC' || isActive) ? 'text-yellow-300' : 'text-white hover:text-yellow-300 transition-colors'
                        }
                    >
                        Seats
                    </NavLink>

                    {/* Sign Out Button */}
                    <button
                        onClick={handleSignOut}
                        className="text-sm text-white bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 px-6 py-2 rounded-full shadow-lg transform transition-transform duration-200 hover:scale-105"
                    >
                        <FaSignOutAlt className="text-lg" />
                    </button>
                </div>
            )}
        </nav>
    );
}

export default Navbar;
