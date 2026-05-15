import mongoose from 'mongoose';

const medicalReportSchema = new mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    fileUrl: {
        type: String,
        required: true // Assuming uploaded to S3/Cloudinary or base64
    },
    reportType: {
        type: String,
        default: 'General'
    },
    aiAnalysis: {
        type: String // Text result from AI analyzing the report
    }
}, {
    timestamps: true
});

const MedicalReport = mongoose.model('MedicalReport', medicalReportSchema);
export default MedicalReport;
