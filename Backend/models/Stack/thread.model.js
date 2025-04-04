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
        name: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        },
        updated_at: {
            type: Date,
            default: Date.now
        }
    },
    backgroud: {
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
    },
    community: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Community"
    }
});

module.exports = mongoose.model('Thread', threadSchema);
