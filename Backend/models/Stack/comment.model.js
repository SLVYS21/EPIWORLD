const mongoose = require('mongoose');

const comment = new mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    flags: [String],
    body: {
        type: String,
        required: true
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    },
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    },
    poster: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    dislikes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    count: {
        likes: {
            type: Number,
            default: 0
        },
        dislikes: {
            type: Number,
            default: 0
        },
        comments: {
            type: Number,
            default: 0
        }
    },
    updated: {
        type: Boolean,
        default: false
    },
    lost: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lost"
    }
});

comment.pre('save', function () {
    this.nblikes = this.likes.length;
    this.nbdislikes = this.dislikes.length;
    this.updatedAt = Date.now;
})

comment.post('save', async function () {
    this.count.likes = this.likes.length;
    this.count.dislikes = this.dislikes.length;
    const comments = await Comment.find({
        parent: this._id
    });
    this.count.comments = comments.length;
    await this.save();
})

module.exports = mongoose.model('Comment', comment)