import { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaBars, FaTimes, FaSignOutAlt } from 'react-icons/fa';

const Navbar = () => {
    const { user, logout } = useAuth();
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const isActive = (path) => {
        return location.pathname === path ? "border-blue-600 text-blue-600 bg-blue-50 sm:bg-transparent sm:text-gray-900" : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50 sm:hover:bg-transparent hover:border-gray-300";
    };

    return (
        <nav className="bg-white shadow sticky top-0 z-50">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 justify-between items-center">
                    <div className="flex items-center gap-8">
                        {/* Logo */}
                        <Link to="/dashboard" className="flex items-center gap-2">
                            <div className="bg-gray-800 text-white p-1.5 rounded-lg">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                                </svg>
                            </div>
                        </Link>

                        {/* Desktop Navigation Tabs */}
                        <div className="hidden sm:flex sm:space-x-4 h-16 items-center">
                            <Link to="/dashboard" className={`border-b-2 px-1 py-5 text-sm font-medium transition-all ${isActive('/dashboard')}`}>
                                Dashboard
                            </Link>
                            <Link to="/profile" className={`border-b-2 px-1 py-5 text-sm font-medium transition-all ${isActive('/profile')}`}>
                                Profile
                            </Link>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        {/* Desktop User Info & Logout */}
                        <div className="hidden sm:flex items-center gap-4">
                            {user && (
                                <span className="text-sm text-gray-500">
                                    Welcome, <span className="font-medium text-gray-900">{user.username}</span>
                                </span>
                            )}
                            <button
                                onClick={logout}
                                className="flex items-center gap-2 rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600 transition-colors shadow-sm"
                            >
                                <FaSignOutAlt className="w-4 h-4" />
                                <span>Logout</span>
                            </button>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="flex items-center sm:hidden">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                            >
                                <span className="sr-only">Open main menu</span>
                                {isMenuOpen ? (
                                    <FaTimes className="block h-6 w-6" aria-hidden="true" />
                                ) : (
                                    <FaBars className="block h-6 w-6" aria-hidden="true" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`sm:hidden ${isMenuOpen ? 'block' : 'hidden'} border-t border-gray-200 bg-white`}>
                <div className="space-y-1 pb-3 pt-2">
                    <Link
                        to="/dashboard"
                        onClick={() => setIsMenuOpen(false)}
                        className={`block border-l-4 py-2 pl-3 pr-4 text-base font-medium ${isActive('/dashboard')}`}
                    >
                        Dashboard
                    </Link>
                    <Link
                        to="/profile"
                        onClick={() => setIsMenuOpen(false)}
                        className={`block border-l-4 py-2 pl-3 pr-4 text-base font-medium ${isActive('/profile')}`}
                    >
                        Profile
                    </Link>
                </div>
                {user && (
                    <div className="border-t border-gray-200 pb-3 pt-4">
                        <div className="flex items-center px-4">
                            <div className="flex-shrink-0">
                                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                                    {user.username.charAt(0).toUpperCase()}
                                </div>
                            </div>
                            <div className="ml-3">
                                <div className="text-base font-medium text-gray-800">{user.username}</div>
                                <div className="text-sm font-medium text-gray-500">{user.email}</div>
                            </div>
                        </div>
                        <div className="mt-3 space-y-1 px-2">
                            <button
                                onClick={logout}
                                className="block w-full text-left rounded-md px-3 py-2 text-base font-medium text-red-600 hover:bg-red-50 hover:text-red-800"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
