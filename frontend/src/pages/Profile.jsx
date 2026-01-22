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
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <div className="rounded-lg bg-white p-6 shadow max-w-md mx-auto">
                    <h2 className="mb-4 text-xl font-bold text-gray-900">Your Profile</h2>
                    {message && <div className="mb-4 rounded bg-green-100 p-2 text-center text-green-600">{message}</div>}
                    {error && <div className="mb-4 rounded bg-red-100 p-2 text-center text-red-600">{error}</div>}

                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="mb-2 block text-sm font-bold text-gray-700">Username</label>
                            <input
                                type="text"
                                name="username"
                                className="w-full rounded border p-2"
                                value={formData.username}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="mb-2 block text-sm font-bold text-gray-700">Email</label>
                            <input
                                type="email"
                                name="email"
                                className="w-full rounded border p-2"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-6">
                            <label className="mb-2 block text-sm font-bold text-gray-700">New Password (leave blank to keep)</label>
                            <input
                                type="password"
                                name="password"
                                className="w-full rounded border p-2"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full rounded bg-blue-600 py-2 font-bold text-white hover:bg-blue-700"
                        >
                            Update Profile
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Profile;
