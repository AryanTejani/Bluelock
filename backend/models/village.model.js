import mongoose from 'mongoose';

const VillageSchema = new mongoose.Schema({
    name: { type: String, required: true }, // Village Name
    locations: [
        {
            dist_name: { type: String, required: true }, // District Name
            state_name: { type: String, required: true }, // State Name
            latitude: { type: String, required: true }, // Latitude
            longitude: { type: String, required: true } // Longitude
        }
    ]
}, { timestamps: true });

export default mongoose.model('Village', VillageSchema);
