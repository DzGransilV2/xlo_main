const mongoose = require('mongoose');

// Define the schema for a car post with nested location object
const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true, // Title is required
        trim: true      // Trim whitespace from title
    },
    brand: {
        type: String,
        required: true, // Brand is required
        trim: true      // Trim whitespace from brand
    },
    description: {
        type: String,
        required: true, // Description is required
        trim: true      // Trim whitespace from description
    },
    mileage: {
        type: Number,
        required: true, // Mileage is required
    },
    price: {
        type: Number,
        required: true, // Price is required
    },
    fuel: {
        type: String,
        enum: ['CNG & Hybrids', 'Diesel', 'Electric', 'LPG', 'Petrol'], // Enum for fuel types
        required: true // Fuel type is required
    },
    transmission: {
        type: String,
        enum: ['Automatic', 'Manual'], // Enum for transmission types
        required: true // Transmission type is required
    },
    owner: {
        type: String,
        enum: ['1', '2', '3', '4', '5', '5+'], // Enum for owner count
        required: true // Owner count is required
    },
    location: {
        state: {
            type: String,
            required: true // State is required
        },
        city: {
            type: String,
            required: true // City is required
        },
        neighbourhood: {
            type: String,
            required: true // Neighbourhood is required
        }
    },
    manufactured: {
        type: Date,
        required: true // Date of manufacture is required
    },
    uid: {
        type: String,
        required: true
    },
    propics: {
        type: [String], // Array of strings to store multiple URLs
        required: true 
    },
    splatFileURL: {
        type: String,  // String to store the URL of the uploaded .splat file
        required: false
    }
}, {
    timestamps: true // Automatically add createdAt and updatedAt fields
});

module.exports = mongoose.model('posts', postSchema);
