const mongoose = require('mongoose');

const community = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 255
    },
    description: {
        type: String,
        required: true,
    },
    logo: {
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
    background: {
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
    policy: [{
        rule: {
            type: String,
            required: true
        },
    }],
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    members: [{
        member: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Member"
        },
        role: {
            type: String,
            enum: ["Admin", "Member"],
            required: true
        },
        at: {
            type: Date,
            default: Date.now
        }
    }],
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at:{
        type: Date,
        default: Date.now
    },
    option: {
        type: String,
        enum: ["Free", "Invitation"],
    }
});

module.exports = mongoose.model('Community', community);