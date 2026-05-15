import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Upload, Stethoscope, AlertTriangle, User } from 'lucide-react';

const generateSessionId = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [sessionId] = useState(generateSessionId());
    const [emergencyAlert, setEmergencyAlert] = useState(false);
    
    const messagesEndRef = useRef(null);
    const fileInputRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, loading, emergencyAlert]);

    const handleSend = async () => {
        if (!input.trim() && !fileInputRef.current?.files[0]) return;

        const userMsg = input.trim();
        const file = fileInputRef.current?.files[0];
        
        let base64Image = null;
        if (file) {
            base64Image = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.readAsDataURL(file);
            });
        }

        const newMessage = { role: 'user', content: userMsg || '[Image Attached]', id: Date.now() };
        setMessages(prev => [...prev, newMessage]);
        setInput('');
        if (fileInputRef.current) fileInputRef.current.value = '';
        setLoading(true);

        try {
            const token = localStorage.getItem('token');
            const headers = token ? { Authorization: `Bearer ${token}` } : {};

            const res = await axios.post('http://localhost:5000/api/chat', {
                message: userMsg,
                image: base64Image,
                sessionId
            }, { headers });

            if (res.data.isEmergency) {
                setEmergencyAlert(true);
            }

            setMessages(prev => [...prev, { role: 'model', content: res.data.response, id: Date.now() + 1 }]);
        } catch (error) {
            console.error('Chat error:', error);
            setMessages(prev => [...prev, { role: 'model', content: 'Sorry, I am having trouble connecting to my medical database right now. Please try again later.', id: Date.now() + 1, error: true }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-[85vh] max-w-4xl mx-auto glassmorphism-green overflow-hidden relative">
            
            <div className="bg-darkGreen/40 p-4 border-b border-neonGreen/30 flex items-center justify-between z-10">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-neonGreen/20 flex items-center justify-center border border-neonGreen shadow-[0_0_10px_#00ff00]">
                        <Stethoscope className="text-neonGreen w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-white tracking-wide">Dr. MedAI</h2>
                        <p className="text-xs text-neonGreen flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-neonGreen animate-pulse-fast"></span> Online
                        </p>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {emergencyAlert && (
                    <motion.div 
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -50 }}
                        className="absolute top-20 left-0 right-0 mx-auto w-11/12 md:w-3/4 bg-red-900/90 backdrop-blur-md border border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.6)] p-4 rounded-xl z-50 flex items-start gap-4"
                    >
                        <AlertTriangle className="text-red-500 w-8 h-8 flex-shrink-0 animate-pulse" />
                        <div>
                            <h3 className="text-xl font-bold text-red-100">EMERGENCY DETECTED</h3>
                            <p className="text-red-200 mt-1">Based on your symptoms, this could be a life-threatening emergency. Please seek immediate medical attention or call your local emergency services (e.g., 911).</p>
                            <button 
                                onClick={() => setEmergencyAlert(false)}
                                className="mt-3 bg-red-600 hover:bg-red-500 text-white px-4 py-1 rounded shadow-md transition-colors text-sm font-semibold"
                            >
                                I Understand, Dismiss
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth">
                {messages.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-full text-center text-gray-400 opacity-60">
                        <Stethoscope className="w-20 h-20 mb-4" />
                        <h3 className="text-2xl font-bold mb-2">How can I help you today?</h3>
                        <p>Describe your symptoms, ask a medical question, or upload a report.</p>
                        <p className="mt-4 text-xs italic">Disclaimer: This AI is not a real doctor. Consult a professional for serious conditions.</p>
                    </div>
                )}

                <AnimatePresence>
                    {messages.map((msg) => (
                        <motion.div 
                            key={msg.id}
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div className={`flex max-w-[80%] gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-gray-700' : 'bg-darkGreen border border-neonGreen/50 shadow-[0_0_8px_rgba(0,255,0,0.3)]'}`}>
                                    {msg.role === 'user' ? <User className="w-5 h-5 text-gray-300" /> : <Stethoscope className="w-5 h-5 text-neonGreen" />}
                                </div>
                                <div className={`p-3 rounded-2xl ${msg.role === 'user' ? 'bg-gray-800 text-gray-200 rounded-tr-sm' : msg.error ? 'bg-red-900/50 text-red-200 border border-red-500/30' : 'bg-white/10 backdrop-blur-sm text-gray-100 rounded-tl-sm border border-white/5'} shadow-md`}>
                                    <div className="whitespace-pre-wrap leading-relaxed text-sm" dangerouslySetInnerHTML={{ __html: formatMessage(msg.content) }} />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {loading && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex justify-start"
                    >
                        <div className="flex gap-3">
                            <div className="w-8 h-8 rounded-full bg-darkGreen flex items-center justify-center border border-neonGreen/50 flex-shrink-0">
                                <Stethoscope className="w-5 h-5 text-neonGreen" />
                            </div>
                            <div className="bg-white/10 p-4 rounded-2xl rounded-tl-sm flex gap-1 items-center">
                                <div className="w-2 h-2 bg-neonGreen rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                <div className="w-2 h-2 bg-neonGreen rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                <div className="w-2 h-2 bg-neonGreen rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                            </div>
                        </div>
                    </motion.div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <div className="p-4 bg-darkBg/60 backdrop-blur-md border-t border-white/10">
                <div className="flex items-center gap-2 relative">
                    <label className="cursor-pointer p-2 text-gray-400 hover:text-neonGreen transition-colors bg-darkSurface rounded-lg border border-white/10 hover:border-neonGreen/50">
                        <Upload className="w-5 h-5" />
                        <input type="file" className="hidden" ref={fileInputRef} accept="image/*,.pdf" />
                    </label>
                    
                    <input 
                        type="text" 
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Describe your symptoms..."
                        className="input-field flex-1"
                        disabled={loading}
                    />
                    
                    <button 
                        onClick={handleSend}
                        disabled={loading || (!input.trim() && !fileInputRef.current?.files[0])}
                        className="p-2 bg-darkGreen hover:bg-lightGreen disabled:opacity-50 disabled:hover:bg-darkGreen text-white rounded-lg transition-all shadow-[0_0_10px_rgba(15,81,50,0.5)] border border-neonGreen/30"
                    >
                        <Send className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};

function formatMessage(text) {
    if (!text) return '';
    let formatted = text.replace(/\*\*(.*?)\*\*/g, '<strong class="text-neonGreen/90">$1</strong>');
    formatted = formatted.replace(/\*(.*?)\*/g, '<em class="text-gray-300">$1</em>');
    formatted = formatted.replace(/- (.*?)\n/g, '<li class="ml-4 list-disc">$1</li>');
    return formatted;
}

export default Chat;
