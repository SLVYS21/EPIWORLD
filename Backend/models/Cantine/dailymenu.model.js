const mongoose = require('mongoose');

const dailyMenuSchema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now,
        unique: true
    },
    plates: [{
        menuId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Menu"
        },
        variants: [{
            variantId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Variant"
            },
            quantity: {
                type: Number,
                default: 0
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
            first: {
                //In case of promotion for the the {first n} orders
                type: Number,
                default: 0
            }, 
            illimited: {
                type: Boolean,
                default: true
            }    
        }],
        quantity: {
            type: Number,
            default: 0
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
        illimited: {
            type: Boolean,
            default: true
        },
        minPrice: {
            value: {
                type: Number,
                default: 0
            },
            currency: {
                type: String,
                default: "XOF"
            }
        },
        maxPrice: {
            value: {
                type: Number,
                default: 0
            },
            currency: {
                type: String,
                default: "XOF"
            }
        },
        reduc: {
            type: Number,
            default: 0
        }
    }]
});

module.exports = mongoose.model('DailyMenu', dailyMenuSchema);