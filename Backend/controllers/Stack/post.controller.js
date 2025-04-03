const { nblikes } = require('../../models/Stack/comment.model');
const Post = require('../../models/Stack/post.model');
const User = require('../../models/user.model')
const Comment = require('../../models/Stack/comment.model')
const {upload, get, deleteImg} = require('../image.controller');

const controller = ({
    create: async(req, res) => {
        try {
            const {title, body, type, flags, threadId} = req.query;

            const files = req.files;
            if (files) {
                if (files.length > 4) {
                    return res.status(404).json({
                        message: "Files are limit to 4 as length"
                    });
                }
                const imgs = [];                
                for (const image of files) {
                    const ret = await upload(image);
                    if (ret) {
                        imgs.push({
                            name: ret.name,
                            url: ret.url,
                            updated_at: new Date()
                        });
                        continue;
                    }
                    return res.status(410).json({
                        message: "Invalid Image"
                    })
                }
    
            }
            if (!type || !body || !["Info", "Problem"].includes(type) || !title) {
                return res.status(404).json({
                    message: "Type and some body are required"       
                });
            }
            const post = await Post.create({
                body,
                type,
                flags,
                files: imgs,
                title
            })
            return res.status(200).json(post);
        } catch (error) {
            return res.status(500).json({
                message: error.message
            })
        }
    },
    addFile: async(req, res) => {
        try {
            const post = await Post.findById(req.params.id);
            if (!post)
                return res.status(404).json({
                    message: "Object post not found"
                });
            if (post.poster.toString() !== req.user._id.toString()) {
                return res.status(403).json({ message: "You are not authorized to update this object." });
            }
            if (post.files.length >= 4) {
                return res.status(404).json({
                    message: "Image limits length reached"
                });
            }
            if (!req.file) {
                return res.status(404).json({
                    message: "Please set a valid image"
                })
            }
            const file = await upload(req.file);
            if (!file) {
                return res.status(404).json({
                    message: "Invalid Image"
                });
            }
            post.files.push({
                name: file.name,
                url: file.url,
                created_at: new Date()
            })
            await post.save();
            return res.status(200).json({
                message: "Image successfully added"
            });
        } catch (error) {
            return res.status(500).json({
                message: error.message
            })
        }
    },
    deleteFile: async(req, res) => {
        try {
            const file = req.body.file;

            if (!file) {
                return res.status(404).json({
                    message: "What do you want to really delete boy ?"
                });
            }
            const post = await Post.findById(req.params.id);
            if (!post)
                return res.status(404).json({
                    message: "Object Post not found"
                });
            if (post.poster.toString() !== req.user._id.toString()) {
                return res.status(403).json({ message: "You are not authorized to update this object." });
            }
            for (const img of post.files) {
                if (img.name === file.name) {
                    await deleteImg(img.name);
                    post.files.filter(it => it.name === file.name);
                    await post.save();
                    return res.status(200).json({
                        message: "Deleting done"
                    });
                }
            }
            return res.status(404).json({
                message: "Image not found"
            });

        } catch (error) {
            return res.status(500).json({
                message: error.message
            })
        }
    },
    changeStatus: async(req, res) => {
        try {
            const postId = req.query.postId;

            if (!postId)
                return res.status(404).json({
                    message: "The postId is required"
                });
            const post = await Post.findById(postId);
            if (!post) {
                return res.status(404).json({
                    message: "post not found"
                });
            }
            if (post.poster.toString() !== req.user._id.toString() || !req.user.admin) {
                return res.status(404).json({
                    message: "You can't delete this post"
                });
            }
        } catch (error) {
            return res.status(500).json({
                message: error.message
            })
        }
    },
    getUserPost: async(req, res) => {
        try {
            const {page = 1, limit = 25, type, status} = req.query;

            if (type)
                query.type = type;
            if (status)
                query.status = status;
            query.poster = req.user._id;
            const posts = await Post.find(query).populate('poster', 'name email tek')
            .sort({__id: -1})
            .limit(limit).skip((page - 1) * limit);

            return res.status(200).json(posts);
        } catch (error) {
            return res.status(500).json({
                message: error.message
            })
        }
    },
    getPosts: async(req, res) => {
        try {
            const {page = 1, limit = 25, type, status} = req.query;

            const query = {};
            if (type)
                query.type = type;
            if (status)
                query.status = status;
            query.threadId = null;
            const posts = await Post.find(query).populate('poster', 'name email tek')
            .limit(limit).skip((page - 1) * limit);
            return res.status(200).json(posts);
        } catch (error) {
            return res.status(500).json({
                message: error.message
            });
        }
    },
    findByFlag: async(req, res) => {
        try {
            const flags = req.body;
            const {page = 1, limit = 25} = req.query;
            const query = {};
            if (flags) {
                query.flags = {$in: flags}
            }
            const posts = await Post.find(query).limit(limit).skip((page - 1) * limit).sort({count: {
                likes: -1,
            }}).populate('poster', 'email name tek');
            return res.status(200).json(posts);
        } catch (error) {
            return res.status(500).json({
                message: error.message
            })
        }
    },
    deletePost: async(req, res) => {
        try {
            const postId = req.query.postId;

            if (!postId)
                return res.status(404).json({
                    message: "The postId is required"
                });
            const post = await Post.findById(postId);
            if (!post) {
                return res.status(404).json({
                    message: "post not found"
                });
            }
            if (post.poster.toString() !== req.user._id.toString() || !req.user.admin) {
                return res.status(404).json({
                    message: "You can't delete this post"
                });
            }
            for (const img of post.files) {
                await deleteImg(img.name);
            }
            const comments = await Comment.find({poster: post.poster});
            for (const comment of comments) {
                const subs = await Comment.find({parent: comment._id});
                for (const sub of subs) {
                    await Comment.findByIdAndDelete(sub._id);
                }
                await Comment.findByIdAndDelete(comment._id);
            }
            await Post.findByIdAndDelete(post._id);
            return res.status(200).json({
                message: "Deletion done"
            });
        } catch (error) {
            return res.status(500).json({
                message: error.message
            })
        }
    },
    deleteComment: async(req, res) => {
        try {
            const commentId = req.query.postId;

            if (!commentId)
                return res.status(404).json({
                    message: "The Comment Id is required"
                });
            const comment = await Comment.findById(commentId);
            if (!comment) {
                return res.status(404).json({
                    message: "Comment not found"
                });
            }
            if (comment.poster.toString() !== req.user._id.toString() || !req.user.admin) {
                return res.status(404).json({
                    message: "You can't delete this post"
                });
            }
            const subs = await Comment.find({parent: comment._id});
            for (const sub of subs) {
                await Comment.findByIdAndDelete(sub._id);
            }
            await Comment.findByIdAndDelete(comment._id);
            return res.status(200).json({
                message: "Deleting done"
            })
        } catch (error) {
            return res.status(500).json({
                message: error.message
            })
        }
    },
    commentPost: async(req, res) => {
        try {
            const {postId, body, flags} = req.body;

            if ((!postId) || !body)
                return res.status(404).json({
                    message: "Please set all the essentials"
                });
            const post = await Post.findById(postId);
            if (!post)
                return res.status(404).json({
                    message: "Post not found"
                });
            if (!post.comment) {
                return res.status(403).json({
                    message: "Comment are not allowed"
                })
            }
            if (body.trim() === '' || !body.trim())
                return res.status(404).json({
                    message: "Body cannot be empty"
                });
            const comment = await Comment.create({
                poster: req.user._id,
                body,
                flags,
                post: post._id
            });
            return res.status(200).json(comment);
        } catch (error) {
            return res.status(500).jsons({
                message: error.message
            })
        }
    },
    getPostComments: async(req, res) => {
        try {
            const postId = req.query.postId;

            if (!postId) {
                return res.status(404).json({
                    message: "Please set the post"
                })
            }
            const post = await Post.findById(postId);
            if (!post)
                return res.status(404).json({
                    message: "Passage not found"
                });
            const {page = 1, limit = 25} = req.query;
            const comments = await Comment.find({post: post._id})
            .populate("poster", 'name email tek')
            .sort({nblikes: -1})
            .skip((page - 1) * limit)
            .limit(limit);
            return res.status(200).json(comments);
        } catch (error) {
            return res.status(500).json({
                message: error.message
            })
        }
    },
    getSubComments: async(req, res) => {
        try {
            const commentId = req.query.commentId;
            if (!commentId) {
                return res.status(404).json({
                    message: "Please set the commentId"
                })
            }
            const comment = await Comment.findById(commentId);
            if (!comment)
                return res.status(404).json({
                    message: "Comment not found"
                });
            const subs = await Comment.find({parent: commentId}).select("-likes -dislikes");
            return res.status(200).json(subs);
        } catch (error) {
            return res.status(500).json({
                message: error.message
            })
        }
    },
    likePost: async(req, res) => {
        try {
            const postId = req.query.postId;

            if (!postId) {
                return res.status(404).json({
                    message: "Please set the post"
                })
            }
            const post = await Post.findById(postId).populate('poster');
            if (!post)
                return res.status(404).json({
                    message: "Passage not found"
                });
            if (post.likes.includes(req.user._id)) {
                post.likes.filter(it => it.toString() !== req.user._id.toString());
                post.poster.points -= 2;
                await post.poster.save();
            } else {
                post.likes.push(
                    req.user._id);
                post.poster.points += 2;
                await post.poster.save();
            }
            await post.save();
            return res.status(200).json({
                message: "Post Liked"
            })
        } catch (error) {
            return res.status(500).json({
                message: error.message
            });
        }
    },
    likeComment: async(req, res) => {
        try {
            const commentId = req.query.commentId;

            if (!commentId) {
                return res.status(404).json({
                    message: "Please set the post"
                })
            }
            const comment = await Comment.findById(commentId).populate('poster');
            if (!comment)
                return res.status(404).json({
                    message: "Passage not found"
                });
            if (comment.likes.includes(req.user._id)) {
                comment.likes.filter(it => it.toString() !== req.user._id.toString());
                comment.poster.points -= 1;
                await comment.poster.save();
            } else {
                comment.likes.push(req.user._id);
                comment.poster.points += 1;
                await comment.poster.save();
            }
            await comment.save();
            return res.status(200).json({
                message: "Comment liked"
            });
        } catch (error) {
            return res.status(500).json({
                message: error.message
            })
        }
    },
    dislikePost: async(req, res) => {
        try {
            const postId = req.query.postId;

            if (!postId) {
                return res.status(404).json({
                    message: "Please set the post"
                })
            }
            const post = await Post.findById(postId);
            if (!post)
                return res.status(404).json({
                    message: "Passage not found"
                });
            if (post.dislikes.includes(req.user._id)) {
                post.dislikes.filter(it => it.toString() !== req.user._id.toString());
            } else {
                post.dislikes.push(
                    req.user._id);
            }
            await post.save();
            return res.status(200).json({
                message: "Updating done"
            })
        } catch (error) {
            return res.status(500).json({
                message: error.message
            });
        }
    },
    dislikeComment: async(req, res) => {
        try {
            const commentId = req.query.commentId;

            if (!commentId) {
                return res.status(404).json({
                    message: "Please set the post"
                })
            }
            const comment = await Comment.findById(commentId);
            if (!comment)
                return res.status(404).json({
                    message: "Passage not found"
                });
            if (comment.dislikes.includes(req.user._id)) {
                comment.dislikes.filter(it => it.toString() !== req.user._id.toString());
            } else {
                comment.dislikes.push(req.user._id);
            }
            await comment.save();
            return res.status(200).json({
                message: "Comment Unliked"
            })
        } catch (error) {
            return res.status(500).json({
                message: error.message
            })
        }
    },
    updateComment: async(req, res) => {
        try {
            const commentId = req.body.commentId;
            const body = req.body.body;

            if (!commentId || body)
                return res.status(404).json({
                    message: "Let's tell something broow"
                });
            const comment = await Comment.findById(commentId);
            if (!comment)
                return res.status(404).json({
                    message: "Comment not found"
                });
            if (req.user._id.toString() !== comment.poster.toString())
                return res.status(404).json({
                    message: "Only the poster could edit"
                });
            const tr = body.trim();
            if (!tr || tr === "")
                return res.status(404).json({
                    message: "Body cannot be empty"
                });
            comment.body = body;
            await comment.save();
            return res.status(200).json({
                message: "Updating Done"
            });
        } catch (error) {
            return res.status(500).json({
                message: error.message
            });
        }
    }
});

module.exports = controller;
