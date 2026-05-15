import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { FileText, Calendar, Clock, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

const PatientDashboard = () => {
    const { user } = useContext(AuthContext);

    return (
        <div className="max-w-6xl mx-auto py-8">
            <h1 className="text-3xl font-bold text-white mb-8">Welcome, <span className="text-neonGreen">{user?.name}</span></h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <DashboardCard title="AI Consultations" value="3 Recent" icon={<Activity className="text-neonGreen w-8 h-8" />} link="/chat" linkText="Start New Chat" />
                <DashboardCard title="Upcoming Appointments" value="0 Scheduled" icon={<Calendar className="text-neonGreen w-8 h-8" />} link="#" linkText="Book Appointment" />
                <DashboardCard title="Medical Reports" value="2 Uploaded" icon={<FileText className="text-neonGreen w-8 h-8" />} link="#" linkText="View Reports" />
                <DashboardCard title="Prescriptions" value="1 Active" icon={<Clock className="text-neonGreen w-8 h-8" />} link="#" linkText="View Medicines" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="glassmorphism p-6 border-t-2 border-t-neonGreen">
                    <h2 className="text-xl font-bold text-white mb-4">Recent Health Vitals</h2>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center p-3 bg-darkBg rounded border border-white/5">
                            <span className="text-gray-400">Blood Pressure</span>
                            <span className="text-white font-semibold">120/80 mmHg</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-darkBg rounded border border-white/5">
                            <span className="text-gray-400">Heart Rate</span>
                            <span className="text-white font-semibold">72 bpm</span>
                        </div>
                    </div>
                </div>

                <div className="glassmorphism p-6 border-t-2 border-t-darkGreen">
                    <h2 className="text-xl font-bold text-white mb-4">AI Recommended Actions</h2>
                    <ul className="space-y-3">
                        <li className="flex items-start gap-3 text-gray-300">
                            <span className="text-neonGreen mt-1">•</span>
                            Drink more water, stay hydrated based on your last chat symptom.
                        </li>
                        <li className="flex items-start gap-3 text-gray-300">
                            <span className="text-neonGreen mt-1">•</span>
                            Schedule a follow-up with Dr. Smith next week.
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

const DashboardCard = ({ title, value, icon, link, linkText }) => (
    <div className="glassmorphism-green p-6 flex flex-col items-start hover:shadow-[0_0_20px_rgba(0,255,0,0.15)] transition-shadow">
        <div className="mb-4 bg-darkBg p-2 rounded-lg border border-neonGreen/20">{icon}</div>
        <h3 className="text-gray-400 font-medium mb-1">{title}</h3>
        <p className="text-2xl font-bold text-white mb-4">{value}</p>
        <Link to={link} className="text-neonGreen hover:text-white transition-colors text-sm font-semibold mt-auto flex items-center gap-1">
            {linkText} &rarr;
        </Link>
    </div>
);

export default PatientDashboard;
