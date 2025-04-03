const mongoose = required('mongoose');

const event = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 255
    },
    description: {
        type: String,
        required: true
    },
    from: {
        type: Date,
        default: Date.now,
        required: true
    },
    to: {
        type: Date,
        default: Date.now,
        required: true
    },
    images: [{
        type: String
    }],
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    },
    by: {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        community: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Community"
        }
    },
    registers: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        at: {
            type: Date,
            default: Date.now
        }
    }],
    validated: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Event', event);