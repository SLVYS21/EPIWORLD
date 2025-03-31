const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    customerName: { //For externs
        type: String,
        maxlength: 255
    },
    placedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: false
    },
    trackingNumber: {
        type: String,
        required: true,
        unique: true,
        uppercase: true
    },
    items: [{
        menuId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Menu",
            required: true
        },
        variants: [{
            variantId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Variant"
            },
            quantity: {
                type: Number,
                default: 0,
                min: 1
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
        }],
        quantity: {
            type: Number,
            default: 1
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
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    man: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    status: {
        type: String,
        enum: ["waiting", "confirmed", "cooking", "shipping", "delivered", "canceled"],
        default: "waiting"
    },
    totalPrice: {
        value: {
            type: Number,
            default: 0
        },
        currency: {
            type: String,
            default: "XOF"
        }
    },
    note: {
        type: String,
        maxlength: 500
    },
    payment: {
        type: String,
        enum: ["MTN Mobile Money", "Espèces", "Moov Money", "Celtis Cash"]
    },
});

orderSchema.pre('save', function () {
    this.updatedAt = new Date.now();
});

module.exports = mongoose.model('Order', orderSchema);
 