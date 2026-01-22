import { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const response = await api.get('/users/me');
                    setUser(response.data);
                } catch (error) {
                    console.error("Auth check failed", error);
                    localStorage.removeItem('token');
                }
            }
            setLoading(false);
        };
        checkAuth();
    }, []);

    const login = async (username, password) => {
        const formData = new URLSearchParams();
        formData.append('username', username);
        formData.append('password', password);

        const response = await api.post('/auth/login', formData, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });
        const { access_token } = response.data;
        localStorage.setItem('token', access_token);

        // Fetch user profile immediately
        const userResponse = await api.get('/users/me');
        setUser(userResponse.data);
    };

    const signup = async (username, email, password) => {
        await api.post('/auth/signup', { username, email, password });
        // Auto login after signup? Or let them login. Let's let them login or auto-login.
        // Spec says "Protected routes (login required)".
        // Let's just return success and let component handle navigation to login or auto-login.
        // For better UX, let's auto-login.
        await login(username, password);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
