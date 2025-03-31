const mongoose = require('mongoose');

const threadSchema = new mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    profil: {
        type: String,
        required: true
    },
    backgroup: {
        type: String,
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    validated: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('Thread', threadSchema);
