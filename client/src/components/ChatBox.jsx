import React, { useState, useRef, useEffect } from 'react';
import MessageBubble from './MessageBubble';
import FileUploadPreview from './FileUploadPreview';
import apiClient from '../api/apiClient';

const ChatBox = ({ inputMessage, setInputMessage }) => {
    const [messages, setMessages] = useState([]);
    const [isTyping, setIsTyping] = useState(false);
    const [file, setFile] = useState(null);
    const [fileData, setFileData] = useState(null);
    const [sessionId] = useState(() => 'sess_' + Math.random().toString(36).substr(2, 9)); 

    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (!selectedFile) return;

        setFile(selectedFile);
        const reader = new FileReader();
        reader.onload = (event) => setFileData(event.target.result);

        if (selectedFile.type.includes('image')) {
            reader.readAsDataURL(selectedFile);
        } else {
            reader.readAsText(selectedFile);
        }
    };

    const handleSend = async () => {
        const messageText = inputMessage.trim();
        if (!messageText && !file) return;

        // Add user message to UI
        if (messageText) {
            setMessages(prev => [...prev, { role: 'user', content: messageText }]);
        }

        if (file && fileData && fileData.startsWith('data:image')) {
            setMessages(prev => [...prev, { role: 'user', content: `<img src="${fileData}" class="image-preview" alt="Uploaded image" />`, isHtml: true }]);
        } else if (file) {
            setMessages(prev => [...prev, { role: 'user', content: `📎 Uploaded: ${file.name}` }]);
        }

        setInputMessage('');
        setIsTyping(true);

        try {
            let fullMessage = messageText;
            let imageBase64 = null;

            if (file && fileData && !fileData.startsWith('data:image')) {
                fullMessage += `\n\n[PATIENT HAS UPLOADED A MEDICAL DOCUMENT]\nDocument Name: ${file.name}\nDocument Content:\n${fileData.substring(0, 8000)}`;
            } else if (file && fileData && fileData.startsWith('data:image')) {
                imageBase64 = fileData;
            }

            const response = await apiClient.post('/chat', {
                message: fullMessage,
                image: imageBase64,
                sessionId
            });

            setMessages(prev => [...prev, { role: 'assistant', content: response.data.response }]);
        } catch (error) {
            console.error('Chat Error:', error);
            const errorMsg = `<div class="error-message"><strong>⚠️ Connection Error</strong><br>I apologize, but I could not connect to my server. Technical Details: ${error.response?.data?.message || error.message}</div>`;
            setMessages(prev => [...prev, { role: 'assistant', content: errorMsg, isHtml: true }]);
        } finally {
            setIsTyping(false);
            setFile(null);
            setFileData(null);
        }
    };

    return (
        <main className="chat-container">
            <div className="chat-header">
                <h2>AI Doctor Consultation</h2>
                <div className="chat-status">
                    <span className="status-dot"></span>
                    <span>AI Doctor is online and ready to help</span>
                </div>
            </div>

            <div className="chat-messages" id="chatMessages">
                {messages.length === 0 ? (
                    <div className="welcome-screen">
                        <div className="welcome-icon">👨‍⚕️</div>
                        <h2>Welcome to Your AI Medical Assistant</h2>
                        <p>Hello! I'm your AI medical doctor, trained on comprehensive medical knowledge. I can help you understand symptoms, analyze medical reports, recommend treatments, and provide health guidance. How can I assist you today?</p>
                        
                        <div className="welcome-features">
                            <div className="feature-card">
                                <div className="icon">🔍</div>
                                <h4>Symptom Diagnosis</h4>
                                <p>Comprehensive symptom analysis with possible causes and conditions</p>
                            </div>
                            <div className="feature-card">
                                <div className="icon">📊</div>
                                <h4>Medical Reports</h4>
                                <p>Expert analysis of lab results, X-rays, and medical documents</p>
                            </div>
                            <div className="feature-card">
                                <div className="icon">💊</div>
                                <h4>Treatment Plans</h4>
                                <p>Evidence-based treatment recommendations and medication guidance</p>
                            </div>
                            <div className="feature-card">
                                <div className="icon">🏥</div>
                                <h4>Disease Information</h4>
                                <p>Detailed information about diseases, prevention, and management</p>
                            </div>
                        </div>
                    </div>
                ) : (
                    messages.map((msg, idx) => (
                        <MessageBubble key={idx} role={msg.role} content={msg.content} isHtml={msg.isHtml} />
                    ))
                )}
                
                {isTyping && (
                    <div className="message assistant">
                        <div className="message-avatar">🩺</div>
                        <div className="typing-indicator">
                            <div className="typing-dot"></div>
                            <div className="typing-dot"></div>
                            <div className="typing-dot"></div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <div className="chat-input-area">
                <FileUploadPreview file={file} onRemove={() => { setFile(null); setFileData(null); }} />
                
                <div className="input-wrapper">
                    <input type="file" id="fileInput" accept=".pdf,.jpg,.jpeg,.png,.txt,.doc,.docx" onChange={handleFileChange} />
                    
                    <div className="upload-options">
                        <label htmlFor="fileInput" className="file-upload-btn" title="Upload File">
                            📎
                            <span className="btn-tooltip">Upload File</span>
                        </label>
                        <label htmlFor="fileInput" className="file-upload-btn" title="Add Photo">
                            📷
                            <span className="btn-tooltip">Add Photo</span>
                        </label>
                    </div>
                    
                    <input type="text" 
                           className="chat-input" 
                           value={inputMessage}
                           onChange={(e) => setInputMessage(e.target.value)}
                           onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                           placeholder="Ask me about symptoms, diseases, medicines, or upload medical reports..." />
                    <button className="send-btn" onClick={handleSend} disabled={(!inputMessage && !file) || isTyping}>
                        ➤
                    </button>
                </div>
            </div>
        </main>
    );
};

export default ChatBox;
