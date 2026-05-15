import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Users, Calendar, MessageSquare, ClipboardList } from 'lucide-react';

const DoctorDashboard = () => {
    const { user } = useContext(AuthContext);

    return (
        <div className="max-w-6xl mx-auto py-8">
            <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 rounded-full bg-darkGreen flex items-center justify-center border-2 border-neonGreen shadow-[0_0_15px_rgba(0,255,0,0.3)]">
                    <span className="text-2xl font-bold text-white">Dr</span>
                </div>
                <div>
                    <h1 className="text-3xl font-bold text-white">Dr. <span className="text-neonGreen">{user?.name}</span></h1>
                    <p className="text-gray-400">{user?.specialization || 'General Practitioner'}</p>
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard title="Total Patients" value="124" icon={<Users className="text-neonGreen w-8 h-8" />} />
                <StatCard title="Today's Appointments" value="5" icon={<Calendar className="text-neonGreen w-8 h-8" />} />
                <StatCard title="Unread Messages" value="12" icon={<MessageSquare className="text-neonGreen w-8 h-8" />} />
                <StatCard title="Pending Prescriptions" value="3" icon={<ClipboardList className="text-neonGreen w-8 h-8" />} />
            </div>

            <div className="glassmorphism p-6">
                <h2 className="text-xl font-bold text-white mb-4 border-b border-white/10 pb-2">Upcoming Appointments Today</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="text-gray-400 border-b border-white/10">
                                <th className="py-3 px-4">Time</th>
                                <th className="py-3 px-4">Patient Name</th>
                                <th className="py-3 px-4">Reason</th>
                                <th className="py-3 px-4">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                <td className="py-3 px-4 text-white font-medium">10:00 AM</td>
                                <td className="py-3 px-4 text-gray-300">John Doe</td>
                                <td className="py-3 px-4 text-gray-400 text-sm">Follow-up on fever report</td>
                                <td className="py-3 px-4">
                                    <button className="text-neonGreen hover:text-white border border-neonGreen hover:bg-neonGreen/20 px-3 py-1 rounded text-sm transition-colors">Join Call</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

const StatCard = ({ title, value, icon }) => (
    <div className="glassmorphism-green p-6 flex items-center justify-between">
        <div>
            <h3 className="text-gray-400 font-medium mb-1">{title}</h3>
            <p className="text-3xl font-bold text-white">{value}</p>
        </div>
        <div className="bg-darkBg p-3 rounded-xl border border-neonGreen/20">{icon}</div>
    </div>
);

export default DoctorDashboard;
