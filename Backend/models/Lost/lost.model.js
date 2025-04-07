const mongoose = require('mongoose');

const lostSchema = new mongoose.Schema({
    images: [{
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
    }],
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        maxlength: 500
    },
    name: {
        type: String,
        required: true,
        maxlength: 255
    },
    position: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["Unsolved", "Solved"],
        default: "Unsolved"
    },
    loser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    finder: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    refundAt: {
        type: Date,
    },
    losers: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        at: {
            type: Date,
            default: Date.now
        }
    }],
    type: {
        type: String,
        enum: ["lost", "found"],
        default: "found"
    },
    comment: {
        type: Boolean,
        default: true
    }
});

lostSchema.post('save', async function () {
    this.updatedAt = Date.now();
    await this.save();
});

module.exports = mongoose.model('Lost', lostSchema);