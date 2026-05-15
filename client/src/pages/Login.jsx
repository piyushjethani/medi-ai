import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { Lock, Mail } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
            login(res.data, res.data.token);
            if (res.data.role === 'Doctor') navigate('/dashboard/doctor');
            else navigate('/dashboard/patient');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className="flex justify-center items-center h-[70vh]">
            <div className="glassmorphism-green p-8 w-full max-w-md">
                <h2 className="text-3xl font-bold text-center text-white mb-6">Welcome Back</h2>
                {error && <div className="bg-red-500/20 border border-red-500 text-red-200 p-3 rounded mb-4 text-center">{error}</div>}
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-300 mb-1">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-2.5 text-gray-500 w-5 h-5" />
                            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="input-field pl-10" placeholder="Enter your email" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-gray-300 mb-1">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-2.5 text-gray-500 w-5 h-5" />
                            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required className="input-field pl-10" placeholder="Enter your password" />
                        </div>
                    </div>
                    
                    <button type="submit" className="btn-primary w-full mt-6">Login to Portal</button>
                </form>
                
                <p className="text-center mt-6 text-gray-400">
                    Don't have an account? <Link to="/register" className="text-neonGreen hover:underline">Sign up</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
