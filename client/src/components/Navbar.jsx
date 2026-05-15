import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Stethoscope, Activity, User } from 'lucide-react';

const Navbar = () => {
    const { user } = useContext(AuthContext);

    return (
        <nav className="glassmorphism-green sticky top-0 z-50 mx-4 mt-4 px-6 py-4 flex justify-between items-center">
            <Link to="/" className="flex items-center space-x-2">
                <Stethoscope className="text-neonGreen w-8 h-8" />
                <span className="text-xl font-bold text-white tracking-wider">Med<span className="text-neonGreen">AI</span></span>
            </Link>

            <div className="flex items-center space-x-6">
                <Link to="/emergency" className="text-red-500 hover:text-red-400 font-bold flex items-center gap-1 transition-colors">
                    <Activity className="w-5 h-5 animate-pulse" /> Emergency
                </Link>

                <Link to="/chat" className="text-gray-300 hover:text-neonGreen transition-colors">AI Chat</Link>
                <Link to="/dashboard/patient" className="text-gray-300 hover:text-neonGreen transition-colors">Patient Dashboard</Link>
                <Link to="/dashboard/doctor" className="text-gray-300 hover:text-neonGreen transition-colors">Doctor Panel</Link>
                
                <div className="flex items-center gap-2 text-neonGreen bg-darkGreen/20 px-3 py-1 rounded-full border border-neonGreen/30">
                    <User className="w-4 h-4" /> Guest Mode
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
