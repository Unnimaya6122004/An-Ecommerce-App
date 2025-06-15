import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({   
    name: {
        type: String,
        required: true,
        trim: true, // Trim whitespace from the name
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: false,
    },
    address: {
        type: String,
        required: true,
    },  
    answer: {
        type: String,
        required: true,
    },
    role: {
        type: Number,
        default: 0,
    }
    }, {
    timestamps: true// Automatically manage createdAt and updatedAt fields    
})
export default mongoose.model('users', userSchema);