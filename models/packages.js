// import mongoose from 'mongoose';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create package
const PackageSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    start_date: {
        type: Date
    },
    end_date: {
        type: Date
    },
    description: {
        type: String,
        required: true
    },
    is_active: {
        type: Boolean,
        default: false
    },
    create_at: {
        type: Date,
        default: Date.now
    }
})

module.exports = Package = mongoose.model('Package', PackageSchema);