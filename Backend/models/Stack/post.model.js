const mongoose = require('mongoose');
const Comment = require('./comment.model')

const postSchema = new mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    files: [{
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
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    type: {
        type: String,
        enum: ["Info", "Problem"]
    },
    status: {
        type: String,
        enum: ["Unsolved", "Solved"]
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    dislikes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    poster: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
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
    threadId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Thread"
    },
    community: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Community"
    },
    comment: {
        type: Boolean,
        default: true
    }
})

postSchema.pre('save', function () {
    this.updatedAt = Date.now()
});

postSchema.post('save', async function () {
    this.count.likes = this.likes.length;
    this.count.dislikes = this.dislikes.length;
    const comments = await Comment.find({
        post: this._id,
        parent: null
    });
    this.count.comments = comments.length;
    await this.save();
})

module.exports = mongoose.model('Post', postSchema);