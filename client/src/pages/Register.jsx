import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { User, Mail, Lock } from 'lucide-react';

const Register = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'Patient' });
    const [error, setError] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const res = await axios.post('http://localhost:5000/api/auth/register', formData);
            login(res.data, res.data.token);
            navigate(formData.role === 'Doctor' ? '/dashboard/doctor' : '/dashboard/patient');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className="flex justify-center items-center py-10">
            <div className="glassmorphism-green p-8 w-full max-w-md">
                <h2 className="text-3xl font-bold text-center text-white mb-6">Create Account</h2>
                {error && <div className="bg-red-500/20 border border-red-500 text-red-200 p-3 rounded mb-4 text-center">{error}</div>}
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-300 mb-1">Full Name</label>
                        <div className="relative">
                            <User className="absolute left-3 top-2.5 text-gray-500 w-5 h-5" />
                            <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required className="input-field pl-10" placeholder="John Doe" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-gray-300 mb-1">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-2.5 text-gray-500 w-5 h-5" />
                            <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} required className="input-field pl-10" placeholder="john@example.com" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-gray-300 mb-1">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-2.5 text-gray-500 w-5 h-5" />
                            <input type="password" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} required className="input-field pl-10" placeholder="Minimum 6 characters" minLength="6" />
                        </div>
                    </div>
                    
                    <div>
                        <label className="block text-gray-300 mb-1">I am a</label>
                        <select 
                            value={formData.role} 
                            onChange={e => setFormData({...formData, role: e.target.value})} 
                            className="input-field appearance-none"
                        >
                            <option value="Patient">Patient</option>
                            <option value="Doctor">Doctor</option>
                        </select>
                    </div>

                    {formData.role === 'Doctor' && (
                        <div className="p-3 bg-darkSurface border border-white/10 rounded mt-2 text-sm text-gray-400">
                            Note: Additional verification required for Doctor accounts post-registration.
                        </div>
                    )}
                    
                    <button type="submit" className="btn-primary w-full mt-6">Sign Up</button>
                </form>
                
                <p className="text-center mt-6 text-gray-400">
                    Already have an account? <Link to="/login" className="text-neonGreen hover:underline">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
