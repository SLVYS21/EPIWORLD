const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    birthdate: {
        type: Date,
        default: Date.now,
        required: true,
    },
    profile: {
        //By default The epitech  
        name: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true,
        },
        updated_at: {
            type: Date,
            default: Date.now
        }
    },
    legend: {
        type: String,
        default: "Just a chill Guy"
    },
    genre: {
        type: String,
        enum: ["F", "M"],
        required: true
    },
    password:{
        type: String,
        required: true
    },
    level: {
        type: Number,
        default: 1
    },
    points: {
        type: Number,
        default: 0
    },
    cantine: {
        type: Boolean,
        default: false
    },
    admin: {
        type: Boolean,
        default: false
    },
    tek: {
        type: String,
        enum: ["Tek 1", "Tek 2", "Tek 3", "Coding", "Msc Pro 1", "Psc Pro 2", "Pedago"],
    },
    status: {
        type: String,
        enum: ["Waiting", "Validated", "Bloqued"],
        default: "Waiting"
    },
    fav: [{
        post: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post"
        },
        at: {
            type: Date,
            default: Date.now
        }
    }]
})

userSchema.methods.compare = async (password) => {
    return bcrypt.compare(password, this.password);
}

userSchema.post('save', async function () {

    //Update the level
});
module.exports = mongoose.model('User', userSchema)