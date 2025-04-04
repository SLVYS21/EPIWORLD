const User = require('../../models/user.model');
const Lost = require('../../models/Lost/lost.model');
const Comment = require('../../models/Stack/comment.model')
const {upload, get, deleteImg} = require('../image.controller')

const controller = ({
    create: async(req, res) => {
        try {
            const {name, position, status} = req.body;
            const images = req.files;

            if (!images) {
                return res.status(404).json({
                    message: "Images are required"
                });
            }
            if (images.length > 4) {
                return res.status(404).json({
                    message: "Limit of 4 images"
                });
            }
            console.log("Trying creation", req.body, images);
            if (!position || !["found", "lost"].includes(status) || !name) {
                return res.status(404).json({
                    message: "Please fill all the fields"
                });
            }
            const imgs = [];

            for (const image of images) {
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
            const lost = await Lost.create({
                name,
                position,
                images: imgs,
                finder: (status === "found") ? req.user._id : null,
                loser: (status === "lost") ? req.user._id : null
            });
            return res.status(200).json(lost);
        } catch (error) {
            return res.status(500).json({
                message: error.message
            })
        }
    },
    commentLost: async(req, res) => {
        try {
            const {lostId, body, flags} = req.body;

            if ((!lostId) || !body)
                return res.status(404).json({
                    message: "Please set all the essentials"
                });
            const lost = await Post.findById(lostId);
            if (!lost)
                return res.status(404).json({
                    message: "Post not found"
                });
            if (!lost.comment) {
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
                lost: lost._id
            });
            return res.status(200).json(comment);
        } catch (error) {
            return res.status(500).jsons({
                message: error.message
            })
        }
    },
    addImage: async(req, res) => {
        try {
            const lost = await Lost.findById(req.params.id);
            if (!lost)
                return res.status(404).json({
                    message: "Object Lost not found"
                });
            if (lost.finder?.toString() !== req.user._id.toString() && lost.loser?.toString() !== req.user._id.toString()) {
                return res.status(403).json({ message: "You are not authorized to update this object." });
            }
            if (lost.images.length >= 4) {
                return res.status(404).json({
                    message: "Image limits length reached"
                });
            }
            if (!req.image) {
                return res.status(404).json({
                    message: "Please set a valid image"
                })
            }
            const image = await upload(req.image);
            if (!image) {
                return res.status(404).json({
                    message: "Invalid Image"
                });
            }
            lost.images.push({
                name: image.name,
                url: image.url,
                created_at: new Date()
            })
            await lost.save();
            return res.status(200).json({
                message: "Image successfully added"
            });
        } catch (error) {
            return res.status(500).json({
                message: error.message
            })
        }
    },
    deleteImage: async(req, res) => {
        try {
            const image = req.body.image;

            if (!image) {
                return res.status(404).json({
                    message: "What do you want to really delete boy ?"
                });
            }
            const lost = await Lost.findById(req.params.id);
            if (!lost)
                return res.status(404).json({
                    message: "Object Lost not found"
                });
            if (lost.finder?.toString() !== req.user._id.toString() && lost.loser?.toString() !== req.user._id.toString()) {
                return res.status(403).json({ message: "You are not authorized to update this object." });
            }
            for (const img of lost.images) {
                if (img.name === image.name) {
                    await deleteImg(img.name);
                    lost.images.filter(it => it.name === image.name);
                    await lost.save();
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
    update: async(req, res) => {
        try {
            const {lostId, position} = req.body;

            if (!lostId)
                return res.status(404).json({
                    message: "Set the right lost"
                });
            const lost = await Lost.findById(lostId);
            if (!lost)
                return res.status(404).json({
                    message: "Object Lost not found"
                });
            if (lost.finder?.toString() !== req.user._id.toString() && lost.loser?.toString() !== req.user._id.toString()) {
                return res.status(403).json({
                    message: "You are not authorized to update this object."
                });
            }
            if (position) {
                lost.position = position;
            }
            await lost.save();
            return res.status(200).json({
                message: "Updating Done"
            });
        } catch (error) {
            return res.status(500).json({
                message: error.message
            })
        }
    },
    setLoserFinder: async(req, res) => {
        try {
            const {finderId, loserId, lostId} = req.body;
            if ((!loserId && !finderId) || !lostId)
                return res.status(404).json({
                    message: "Set the loserId"
                })
            let loser = {};
            if (loserId)
                loser = await User.findById(loserId);
            else
                loser = await User.findById(finderId);
            if (!loser)
                return res.status(404).json({
                    message: "User not found"
                });
            const lost = await Lost.findById(lostId);
            if (!lost)
                return res.status(404).json({
                    message: "Object lost not found"
                });
            if (lost.type === "Finder" && lost.finder.toString() !== req.user._id.toString())
                return res.status(404).json({
                    message: "Only the finder can set the real Loser"
                });
            if (lost.type === "Loser" && lost.loser.toString() !== req.user._id.toString())
                return res.status(404).json({
                    message: "Only the loser can set his finder"
                });
            lost.loser = (loserId) ? loser._id : lost.loser;
            lost.finder = (finderId) ? loser._id : lost.finder;
            lost.status = "";
            lost.refundAt = Date.now();
            await lost.save();
            return res.status(200).json({
                message: (loserId) ? "Loser set" : "Finder Set"
            });
        } catch (error) {
            return res.status(500).json({
                message: error.message
            })
        }
    },
    iamtheloser: async(req, res) => {
        try {
            const {lostId, loserId} = req.body;
            if (!loserId || !lostId)
                return res.status(404).json({
                    message: "Set the loserId or the lostId int the body"
                });
                const loser = await User.findById(loserId);
                if (!loser || req.query.user._id.toString() !== loser._id.toString())
                    return res.status(404).json({
                        message: "User not found"
                    });
                const lost = await Lost.findById(lostId);
                if (!lost)
                    return res.status(404).json({
                        message: "Object lost not found"
                    });
                
                const lser = lost.losers.find(it => it.user.toString() === loser._id.toString());
                if (!lser) {
                    lost.push({
                        user: loser._id
                    })
                } else {
                    lost.filter(it => it.user.toString() === loser._id.toString());
                }
                await lost.save();
                return res.status(200).json({
                    message: "You're know a loser"
                })
       } catch (error) {
            return res.status(500).json({
                message: error.message
            })
        }
    },
    get: async(req, res) => {
        try {
            const {page = 1, limit = 20/*, status = "default"*/} = req.query;

            const filter = {};
            // if (status)
            //     filter.status = status;
            const losts = await Lost.find(filter).sort({_id: -1}).limit(limit).skip((page - 1) * limit)
            // .select('-losers')
            .populate('finder', 'name email tek')
            .populate('loser', 'name email tek')
            return res.status(200).json(losts);
        } catch (error) {   
            return res.status(500).json({
                message: error.message
            })
        }
    },
    getLosers: async(req, res) => {
        try {
            const {lostId} = req.query;
            if (!lostId)
                return res.status(404).json({
                    message: "Nigga set the lostId"
                });
            const losers = await Lost.findById(lostId)
            .select("losers")
            .populate("losers.user", "name email tek");

        } catch (error) {
            return res.status(500).json({
                message: error.message
            })
        }
    },
    getLostComments: async(req, res) => {
        try {
            const {page = 1, limit = 25, lostId} = req.query;

            if (!lostId)
                return res.status(404).json({
                    message: "please the post Id to allow us to find the comments"
                });
            const posts = await Comment.find({lost: lostId}).populate('poster', 'name email tek')
            .sort({_id: -1})
            .skip((page - 1) * limit)
            .limit(limit)
            return res.status(200).json(posts);
        } catch (error) {
            return res.status(500).json({
                message: error.message
            });
        }
    }
});

module.exports = controller;