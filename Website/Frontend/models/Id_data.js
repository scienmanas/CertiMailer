import mongoose from 'mongoose';

const idDataSchema = new mongoose.Schema(
    {
        orglogo: { type: String, required: true, unique: true },
        orgName: { type: String, required: true },
        orgId: { type: String, required: true, unique: true },
        orgStatus: { type: String, required: true },
        orgEmail: { type: String, required: true },
        issuedToName: { type: String, required: true },
        issueId: {type: String, required: true, unique: true},
        issuedToEmail: {type: String, required: true},
        issuedDate: {type: String, required: true},
        expiryDate: {type: String, required: true},
    },
    {
        collection: 'id_data'
    }
);

export default mongoose.models.idData || mongoose.model('idData')