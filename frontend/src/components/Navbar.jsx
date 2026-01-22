import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useAuth();

    return (
        <nav className="bg-white shadow">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 justify-between">
                    <div className="flex">
                        <div className="flex flex-shrink-0 items-center">
                            <h1 className="text-xl font-bold text-gray-800">Task Manager</h1>
                        </div>
                        <div className="hidden sm:ml-6 sm:flex sm:items-center">
                            <a href="/dashboard" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Dashboard</a>
                            <a href="/profile" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Profile</a>
                        </div>
                    </div>
                    <div className="flex items-center">
                        {user && (
                            <span className="mr-4 text-gray-700">
                                Welcome, {user.username}
                            </span>
                        )}
                        <button
                            onClick={logout}
                            className="rounded bg-red-500 px-3 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
