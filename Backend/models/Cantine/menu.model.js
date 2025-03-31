const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 255
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    variants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Variant"
    }],
    description: {
        type: String,
        required: false
    },
    descriptionHtml: {
        type: String,
        required: false
    },
    images: [{
        type: String
    }],
    mainpic: {
        type: String
    },
    minPrice: {
        value: {
            type: Number,
            default: 0,
        },
        currency: {
            type: String,
            default: "XOF"
        }
    },
    maxPrice: {
        value: {
            type: Number,
            default: 0,
        },
        currency: {
            type: String,
            default: "XOF"
        }
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
    active: {
        type: Boolean,
        default: true
    },
    stock: {
        type: Number,
        default: 0
    },
    deleted: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model("Menu", menuSchema);
