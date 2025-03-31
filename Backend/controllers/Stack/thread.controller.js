const Thread = require('../../models/Stack/thread.model');
const User = require('../../models/user.model');
const Post = require('../../models/Stack/post.model');
const Comment = require('../../models/Stack/comment.model')


const controller = ({
    create: async(req, res) => {
        try {
            const {title, description, logo} = req.body;

            if (!title || !description)
                return res.status(404).json({
                    message: "Need the thread title and description"
                });
            const thread = await Thread.create({
                title,
                description,
                createdBy: req.user._id
            });
            return res.status(200).json(thread);
        } catch (error) {
            return res.status(500).json({
                message: error.message
            })
        }
    },
    deleteThread: async(req, res) => {
        try {
            if (!req.query.threadId)
                return res.status(404).json({
                    message: "Set the thread to delete"
                });
            const thread = await Thread.findById(req.query.threadId);
            if (!thread) {
                return res.status(404).json({
                    message: "Thread not found"
                })
            }
            if (!req.user.admin || (req.user._id.toString() !== thread.createdBy.toString()))
                return res.status(403).json({
                    message: "You are not authorized to delete this thread"
                });
            const posts = await Post.find({threadId: req.query.threadId});
            await Promise.all(posts.map(async (post) => {
                const comments = await Comment.find({ post: post._id });
                await Promise.all([
                    ...comments.map((comment) => Comment.deleteMany({ _id: comment._id })),
                    Post.findByIdAndDelete(post._id)
                ]);
            }));
            // for (const post of posts) {
            //     const comments = await Comment.find({poster: post.poster});
            //     for (const comment of comments) {
            //         const subs = await Comment.find({parent: comment._id});
            //         for (const sub of subs) {
            //             await Comment.findByIdAndDelete(sub._id);
            //         }
            //         await Comment.findByIdAndDelete(comment._id);
            //     }
            //     await Post.findByIdAndDelete(post._id);    
            // }
            await Thread.findByIdAndDelete(req.query.threadId);
            return res.status(200).json({
                message: "Deletion successfully Done"
            })
        } catch (error) {
            return res.status(500).json({
                message: error.message
            });
        }
    },
    getThreadPosts: async(req, res) => {
        try {
            const {threadId, status, page = 1, limit = 25} = req.query;

            if (!threadId)
                return res.status(404).json({
                    message: "Thread Id is required"
                });
            const thread = await Thread.findById(threadId);
            if (!thread)
                return res.status(404).json({
                    message: "Thread not found"
                });
            const query = {};
            if (threadId)
                query.threadId = threadId;
            if (status)
                query.status = status;
            const posts = await Post.find(query)
            .populate("poster")
            // .select("-likes", "-dislikes")
            .sort({_id: -1})
            .skip((page - 1) * limit)
            .limit(limit)

            return res.status(200).json(posts);
        } catch (error) {
            return res.status(500).json({
                message: error.message
            })
        }
    },
    update: async(req, res) => {
        try {
            const {threadId, title, description} = req.body;

            if (!threadId)
                return res.status(404).json({
                    message: "Thread Id is required"
                });
            const thread = await Thread.findById(threadId);
            if (!thread)
                return res.status(404).json({
                    message: "Thread not found"
                });
            if (title && title.trim() && title.trim() !== '') {
                thread.title = title;
            }
            if (description && description.trim() && description.trim() !== '') {
                thread.description = description;
            }
            await thread.save();
            return res.status(200).json(thread);
        } catch (error) {
            return res.status(500).json({
                message: "Description done"
            })
        }
    }
});

module.exports = controller;