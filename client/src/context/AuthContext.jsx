import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // Mock user so the dashboards and chat still work without auth
    const [user, setUser] = useState({
        name: "Guest User",
        role: "Patient", // You can change this to 'Doctor' if you want to test the doctor dashboard
        email: "guest@medai.com"
    });
    const [loading, setLoading] = useState(false);

    const login = (userData, token) => {
        setUser(userData);
    };

    const logout = () => {
        // No-op since we disabled auth
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
