import mongoose from 'mongoose';

const FormSchema = new mongoose.Schema({
    name: { type: String, required: true }, // Village Name
    dist_name: { type: String, required: true }, // District Name
    state_name: { type: String, required: true } // State Name
}, { timestamps: true });

export default mongoose.model('Form', FormSchema);
