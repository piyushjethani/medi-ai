import Chat from '../models/Chat.js';
import User from '../models/User.js';

// Access your API key as an environment variable
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || 'AIzaSyA0xCljZVKVnq3PzUGPDaDuJJBmMlTZ4k4';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

const MEDICAL_SYSTEM_PROMPT = `You are MedAI, an advanced and compassionate AI medical assistant. You simulate an experienced doctor.
IMPORTANT RULES:
1. ALWAYS act professionally. Ask intelligent follow-up questions before suggesting medicines or treatments.
2. If symptoms indicate an EMERGENCY (e.g., chest pain, breathing problems, heart attack symptoms, heavy bleeding, stroke symptoms):
   - You MUST include the exact phrase "[EMERGENCY_DETECTED]" in your response.
   - Advise the patient to immediately contact emergency services or visit the nearest hospital.
3. DISCLAIMER: In every response where you provide medical advice, you must include: "This AI is not a real doctor. For emergencies or serious conditions consult a medical professional."
4. Structure your response with:
   - Empathy/Greeting
   - Follow-up Questions (if needed)
   - Possible Disease Prediction
   - Treatment Advice / Suggested Medicines
   - Home Remedies / Diet recommendations
   - Disclaimer
`;

// @desc    Process Chat Messages
// @route   POST /api/chat
// @access  Public (or Private if token passed)
export const processChat = async (req, res) => {
    try {
        const { message, image, sessionId } = req.body;
        
        // Optional user context if logged in (auth middleware not strictly required on this route but helps)
        let userContext = '';
        if (req.user) {
            const user = await User.findById(req.user.id);
            if (user) {
                userContext = `\nPatient Profile:\nAge: ${user.age || 'Unknown'}\nGender: ${user.gender || 'Unknown'}\nBlood Group: ${user.bloodGroup || 'Unknown'}\n`;
            }
        }

        if (!message && !image) {
            return res.status(400).json({ message: 'Message or image is required' });
        }

        // Fetch recent chat history to provide context
        let chatHistoryText = '';
        let chatRecord = null;
        try {
            chatRecord = await Chat.findOne({ sessionId });
            if (chatRecord && chatRecord.messages.length > 0) {
                const recentMessages = chatRecord.messages.slice(-5); // Get last 5 messages for context
                chatHistoryText = "\n=== RECENT CONVERSATION ===\n" + recentMessages.map(m => `${m.role === 'user' ? 'Patient' : 'Dr. AI'}: ${m.content}`).join('\n') + "\n=====================\n";
            }
        } catch (err) {
            console.log('Could not fetch chat history');
        }

        const promptText = `${MEDICAL_SYSTEM_PROMPT}${userContext}${chatHistoryText}\n\n=== CURRENT CONSULTATION ===\nPatient: ${message || 'Please review the attached medical document/image.'}\n\nDr. AI:`;
        
        let requestBody = {
            contents: [
                {
                    role: 'user',
                    parts: [
                        { text: promptText }
                    ]
                }
            ],
            generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 2048,
            }
        };

        // Handle image if provided (as Base64 from frontend)
        if (image) {
             const mimeType = image.substring(image.indexOf(':') + 1, image.indexOf(';'));
             const base64Data = image.split(',')[1];
             
             requestBody.contents[0].parts.push({
                inlineData: {
                    mimeType: mimeType,
                    data: base64Data
                }
            });
        }

        // Use native fetch to securely call Gemini API
        const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            const errData = await response.text();
            throw new Error(`Gemini API Error: ${errData}`);
        }

        const data = await response.json();
        let aiResponse = data.candidates[0].content.parts[0].text;

        // Emergency Detection Parsing
        let isEmergency = false;
        if (aiResponse.includes('[EMERGENCY_DETECTED]')) {
            isEmergency = true;
            aiResponse = aiResponse.replace('[EMERGENCY_DETECTED]', '').trim();
        }

        // Try to save to Database if MongoDB is running
        try {
            if (!chatRecord) {
                chatRecord = new Chat({
                    sessionId,
                    user: req.user ? req.user.id : undefined,
                    messages: []
                });
            }
            
            chatRecord.messages.push({ role: 'user', content: message || '[Image Attached]' });
            chatRecord.messages.push({ role: 'model', content: aiResponse });
            await chatRecord.save();
        } catch (dbError) {
            console.log('Skipping database save due to MongoDB unavailability.', dbError);
        }

        res.json({ response: aiResponse, isEmergency });
    } catch (error) {
        console.error('Gemini API Details:', error);
        res.status(500).json({ message: 'Failed to process chat with AI.', error: error.message });
    }
};

// @desc    Get Chat History
// @route   GET /api/chat/:sessionId
// @access  Public
export const getChatHistory = async (req, res) => {
    try {
        const { sessionId } = req.params;
        const chat = await Chat.findOne({ sessionId });
        
        if (!chat) return res.json({ messages: [] });
        
        res.json({ messages: chat.messages });
    } catch (error) {
        res.json({ messages: [] });
    }
};
