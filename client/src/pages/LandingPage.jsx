import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Activity, Shield, Brain } from 'lucide-react';

const LandingPage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-3xl"
            >
                <div className="inline-block p-2 px-4 rounded-full bg-darkGreen/30 border border-neonGreen/30 text-neonGreen font-semibold mb-6 shadow-[0_0_15px_rgba(0,255,0,0.2)]">
                    <span className="animate-pulse inline-block w-2 h-2 rounded-full bg-neonGreen mr-2"></span>
                    24/7 AI Medical Assistant
                </div>
                
                <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-white">
                    Next Generation <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-neonGreen to-lightGreen drop-shadow-[0_0_10px_rgba(0,255,0,0.5)]">Healthcare Intelligence</span>
                </h1>
                
                <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
                    Experience the future of medicine with our AI-powered doctor assistant. Get instant symptom analysis, health advice, and emergency detection.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-4">
                    <Link to="/chat" className="btn-primary text-lg px-8 py-3">Start AI Consultation</Link>
                    <Link to="/dashboard/patient" className="bg-darkSurface hover:bg-darkGreen/20 text-white border border-white/20 hover:border-neonGreen/50 font-semibold py-3 px-8 rounded-lg transition-all duration-300">View Dashboard</Link>
                </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 max-w-5xl w-full">
                <FeatureCard icon={<Brain className="text-neonGreen w-8 h-8" />} title="Smart AI Diagnosis" desc="Advanced symptom checking and disease prediction powered by Google Gemini." />
                <FeatureCard icon={<Activity className="text-neonGreen w-8 h-8" />} title="Emergency Detection" desc="Real-time analysis to detect life-threatening conditions immediately." />
                <FeatureCard icon={<Shield className="text-neonGreen w-8 h-8" />} title="Secure & Private" desc="Your medical data is encrypted and strictly confidential." />
            </div>
        </div>
    );
};

const FeatureCard = ({ icon, title, desc }) => (
    <motion.div 
        whileHover={{ y: -5, scale: 1.02 }}
        className="glassmorphism p-6 text-left border-t-4 border-t-neonGreen"
    >
        <div className="bg-darkBg p-3 rounded-lg inline-block mb-4 shadow-[0_0_10px_rgba(0,255,0,0.1)]">{icon}</div>
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-400">{desc}</p>
    </motion.div>
);

export default LandingPage;
