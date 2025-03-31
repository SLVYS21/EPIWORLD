const mongoose = require("mongoose");

const shoppinglistSchema = new mongoose.Schema({
    name: {
        type: String
    },
    level: {
        type: String,
        enum: ["Waiting", "Emergency"],
        default: "Waiting"
    },
    status: {
        type: String,
        enum: ["To do", "Done", "Cancelled"]
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    doneAt: {
        type: Date,
    },
    price: {
        value: {
            type: Number,
            default: 0
        },
        currency: {
            type: String,
            default: 0
        }
    },
    menuId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Menu"
    },
    variants: [{
        variantId: {
            type: String,
            require: true
        },
        quantiy: {
            type: Number,
            default: 0
        },
        damaged: {
            type: Number,
            default: 0
        }
    }],
    quantity: {
        type: Number,
        default: 0
    }
});

shoppinglistSchema.pre('save', function () {
    this.updatedAt = Date.now();
});

module.exports = mongoose.model('Shoppinglist', shoppinglistSchema);
