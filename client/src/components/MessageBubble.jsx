import React from 'react';

const MessageBubble = ({ role, content, isHtml = false, timestamp }) => {
    const isUser = role === 'user';
    const avatar = isUser ? '👤' : '🩺';
    const timeString = timestamp ? new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Format Markdown to basic HTML if not already HTML
    const formatContent = (text) => {
        if (isHtml) return text;
        let formatted = text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/\n\n/g, '</p><p>')
            .replace(/\n/g, '<br>');
        
        if (!formatted.startsWith('<p>')) {
            formatted = '<p>' + formatted + '</p>';
        }
        return { __html: formatted };
    };

    return (
        <div className={`message ${isUser ? 'user' : 'assistant'}`}>
            <div className="message-avatar">{avatar}</div>
            <div className="message-content">
                {isHtml ? (
                    <div dangerouslySetInnerHTML={{ __html: content }} />
                ) : (
                    <div dangerouslySetInnerHTML={formatContent(content)} />
                )}
                <div className="message-time">{timeString}</div>
            </div>
        </div>
    );
};

export default MessageBubble;
