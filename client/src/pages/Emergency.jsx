import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Phone, MapPin, HeartPulse } from 'lucide-react';

const Emergency = () => {
    return (
        <div className="max-w-4xl mx-auto py-10 px-4">
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-red-900/40 backdrop-blur-lg border-2 border-red-500 rounded-2xl p-8 md:p-12 text-center shadow-[0_0_30px_rgba(239,68,68,0.3)] relative overflow-hidden"
            >
                {/* Background pulse effect */}
                <div className="absolute inset-0 bg-red-500/10 animate-pulse-fast pointer-events-none"></div>

                <AlertTriangle className="w-24 h-24 text-red-500 mx-auto mb-6 drop-shadow-[0_0_15px_rgba(239,68,68,0.8)]" />
                <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-wider">MEDICAL EMERGENCY</h1>
                <p className="text-xl text-red-200 mb-8 max-w-2xl mx-auto">
                    If you or someone else is experiencing a life-threatening medical emergency, please do not wait for an AI response.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                    <a href="tel:911" className="bg-red-600 hover:bg-red-500 text-white p-6 rounded-xl flex flex-col items-center justify-center transition-all hover:scale-105 shadow-lg shadow-red-900/50">
                        <Phone className="w-10 h-10 mb-3" />
                        <span className="text-3xl font-bold mb-1">Call 911</span>
                        <span className="text-red-200 text-sm">Ambulance / Emergency</span>
                    </a>
                    <button className="bg-darkSurface border border-red-500/50 hover:bg-red-900/30 text-white p-6 rounded-xl flex flex-col items-center justify-center transition-all hover:scale-105 shadow-lg">
                        <MapPin className="w-10 h-10 mb-3 text-red-400" />
                        <span className="text-2xl font-bold mb-1">Find Nearest Hospital</span>
                        <span className="text-gray-400 text-sm">Locate ER nearby</span>
                    </button>
                </div>

                <div className="text-left bg-darkBg/60 p-6 rounded-xl border border-red-900">
                    <h3 className="text-red-400 font-bold flex items-center gap-2 mb-4"><HeartPulse /> Signs of a Medical Emergency:</h3>
                    <ul className="text-gray-300 space-y-2 list-disc pl-5">
                        <li>Chest pain, pressure, or tightness</li>
                        <li>Difficulty breathing or shortness of breath</li>
                        <li>Sudden weakness, numbness, or paralysis</li>
                        <li>Severe, uncontrollable bleeding</li>
                        <li>Sudden severe headache or altered mental status</li>
                    </ul>
                </div>
            </motion.div>
        </div>
    );
};

export default Emergency;
