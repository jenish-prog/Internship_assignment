import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
    const { user, login } = useAuth(); // We might need to update user context
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (user) {
            setFormData(prev => ({
                ...prev,
                username: user.username,
                email: user.email,
                password: ''
            }));
        }
    }, [user]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        try {
            const updates = {};
            if (formData.username !== user.username) updates.username = formData.username;
            if (formData.email !== user.email) updates.email = formData.email;
            if (formData.password) updates.password = formData.password;

            if (Object.keys(updates).length === 0) return;

            const response = await api.patch('/users/me', updates);
            setMessage('Profile updated successfully');
            // Optimistically update or force reload? 
            // Ideally AuthContext should expose a way to refresh user, but for now:
            // The response contains updated user. We should update context if possible, 
            // but useAuth doesn't expose setUser.
            // Let's reload page or assume user is okay until refresh. 
            // Actually, best is to update context. 
            // But for this assignment, simple success message is likely enough.
            // Wait, if username changes, the Navbar showing "Welcome, user" might be stale.
            // A page reload is a simple fix.
            window.location.reload();
        } catch (err) {
            setError('Failed to update profile');
            console.error(err);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="rounded-xl bg-white p-8 shadow-sm border border-gray-100 max-w-2xl mx-auto">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="bg-blue-100 text-blue-600 rounded-full h-16 w-16 flex items-center justify-center text-2xl font-bold">
                            {user?.username?.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">Your Profile</h2>
                            <p className="text-gray-500">Manage your account settings</p>
                        </div>
                    </div>

                    {message && <div className="mb-6 rounded-lg bg-green-50 p-4 border border-green-100 text-green-700 flex items-center gap-2">✓ {message}</div>}
                    {error && <div className="mb-6 rounded-lg bg-red-50 p-4 border border-red-100 text-red-700">! {error}</div>}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                                <input
                                    type="text"
                                    name="username"
                                    className="w-full rounded-lg border border-gray-200 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-500 transition-colors"
                                    value={formData.username}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    className="w-full rounded-lg border border-gray-200 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-500 transition-colors"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">New Password <span className="text-gray-400 font-normal">(leave blank to keep current)</span></label>
                            <input
                                type="password"
                                name="password"
                                className="w-full rounded-lg border border-gray-200 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-500 transition-colors"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="pt-4 border-t border-gray-100">
                            <button
                                type="submit"
                                className="w-full sm:w-auto rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 shadow-sm transition-all hover:shadow-md active:bg-blue-800"
                            >
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Profile;
