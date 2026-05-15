import React from 'react';

const Sidebar = ({ setInputMessage }) => {
    return (
        <aside className="sidebar">
            <div className="info-card">
                <h4>🌟 AI-Powered Medical Doctor</h4>
                <p>Advanced AI trained on extensive medical knowledge to provide professional healthcare guidance, symptom analysis, and treatment recommendations.</p>
            </div>

            <div className="sidebar-section">
                <h3>Quick Actions</h3>
                <div className="quick-action" onClick={() => setInputMessage('I have been experiencing fever and headache for 2 days. What could it be?')}>
                    <div className="quick-action-title">🌡️ Symptom Analysis</div>
                    <div className="quick-action-desc">Describe your symptoms</div>
                </div>
                <div className="quick-action" onClick={() => setInputMessage('I need medicine recommendations for common cold and cough')}>
                    <div className="quick-action-title">💊 Medicine Advice</div>
                    <div className="quick-action-desc">Get medication guidance</div>
                </div>
                <div className="quick-action" onClick={() => setInputMessage('Can you help me understand my blood test results?')}>
                    <div className="quick-action-title">🧪 Lab Report Analysis</div>
                    <div className="quick-action-desc">Interpret medical reports</div>
                </div>
                <div className="quick-action" onClick={() => setInputMessage('What are the symptoms and treatment for diabetes?')}>
                    <div className="quick-action-title">🏥 Disease Information</div>
                    <div className="quick-action-desc">Learn about diseases</div>
                </div>
                <div className="quick-action" onClick={() => setInputMessage('What lifestyle changes should I make for better health?')}>
                    <div className="quick-action-title">💪 Health & Wellness</div>
                    <div className="quick-action-desc">Get lifestyle advice</div>
                </div>
            </div>

            <div className="emergency-banner">
                For life-threatening emergencies, call emergency services immediately!
            </div>

            <div className="disclaimer">
                <strong>⚠️ Medical Disclaimer</strong>
                This AI provides educational medical information and general health guidance. It is not a substitute for professional medical advice, diagnosis, or treatment. Always consult a qualified healthcare provider for medical concerns and before making health decisions.
            </div>
        </aside>
    );
};

export default Sidebar;
