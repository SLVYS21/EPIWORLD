const mongoose = require('mongoose');

const variantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        value: {
            type: Number,
            default: 0
        },
        currency: {
            type: String,
            default: "XOF"
        }
    },
    quant: {
        type: Boolean,
        default: false
    },
    defaultStock: {
        type: Number,
        default: 0
    },
    stock: {
        type: Number,
        default: 0
    },
    mainpic: {
        type: String,
    },
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
    menu: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Menu"
    },
    deleted: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Variant', variantSchema);