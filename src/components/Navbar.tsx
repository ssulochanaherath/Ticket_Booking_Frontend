import { Link, NavLink } from 'react-router-dom';
import { FaFilm } from 'react-icons/fa';

function Navbar() {
    return (
        <nav className="bg-gradient-to-r from-indigo-600 to-blue-500 p-4">
            <div className="flex justify-between items-center">
                {/* Left side: Icon and Film Hall Name */}
                <div className="flex items-center space-x-2">
                    <FaFilm className="text-white text-2xl" />
                    <div className="text-white text-2xl font-bold">
                        <Link to="/">Film Hall</Link>
                    </div>
                </div>

                {/* Right side: Navigation Links */}
                <div className="hidden md:flex space-x-6">
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
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <button className="text-white">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
