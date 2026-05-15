import mongoose from 'mongoose';

const chatSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: false, // Optional for guest users
            ref: 'User',
        },
        messages: [
            {
                role: { type: String, required: true }, // 'user' or 'model'
                content: { type: String, required: true },
                timestamp: { type: Date, default: Date.now }
            }
        ],
        sessionId: {
            type: String,
            required: true, // Group chats by session
        }
    },
    {
        timestamps: true,
    }
);

const Chat = mongoose.model('Chat', chatSchema);
export default Chat;
