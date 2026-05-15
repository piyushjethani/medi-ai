import React from 'react';

const FileUploadPreview = ({ file, onRemove }) => {
    if (!file) return null;

    const fileSize = (file.size / 1024).toFixed(2);
    let icon = '📄';
    if (file.type.includes('image')) icon = '🖼️';
    else if (file.type.includes('pdf')) icon = '📑';

    return (
        <div className="upload-preview active">
            <div className="upload-info">
                <div className="upload-icon">{icon}</div>
                <div className="upload-details">
                    <p>{file.name}</p>
                    <span>{fileSize} KB</span>
                </div>
            </div>
            <button className="remove-upload" onClick={onRemove}>Remove</button>
        </div>
    );
};

export default FileUploadPreview;
