const User = require('../models/user.model')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

const userController = ({
    signup: async(req, res) => {
        try {
            const {name, email, password, genre, profil, birthdate} = req.body;

            if (!name || !email || !password || !genre || !["M", "F"].includes(genre) || !birthdate)
                return res.status(404).json({
                    message: "Please fill the the required fields"
                });
            const exist = await User.findOne({email});
            if (exist)
                return ree.status(403).json({
                    message: "Already exist. Let login"
                });
            
            const user = await User.create({
                name,
                email,
                genre,
                profil,
                password: bcrypt.hash(password, 10),
                birthdate: new Date(birthdate)
            });
            const users = await User.find();
            if (users.length === 1)
                user.admin = true;
            await user.save();
            return res.status(200).json({
                message: "Account Successfully created"
            });
        } catch (error) {
            return res.status(500).json({
                message: error.message
            })
        }
    },
    login: async(req, res) => {
        try {
            const {email, password} = req.query;

            if (!email || !password)
                return res.status(404).json({
                    message: "Fill the fields"
                });
            const user = await User.findOne({email});
            if (!user) {
                return res.status(404).json({
                    message: "Sorry you are not registered on this platform"
                });
            }
            if (!await user.compare(password))
                return res.status(404).json({
                    message: "Invalid Password"
                });
            const _user = await User.findById(user._id).select("-password")
            return res.status(200).json({
                user: _user,
                token: generateToken(user._id)
            });
        } catch (error) {
            return res.status(500).json({
                message: error.message
            })
        }
    },
    changeStatus: async(req, res) => {
        try {
            const {status, userId} = req.body;

            if (!status || !userId || !["Waiting", "Validated", "Bloqued"].includes(status))
                return res.status(500).json({
                    message: "Please fill the fields for updating"
                });
            const user = await User.findById(userId).select("status");
            if (!user)
                return res.status(404).json({
                    message: "User not found"
                });
            user.status = status;
            await user.save();
            return res.status(200).json(user);
        } catch (error) {
            return res.status(500).json({
                message: error.message
            })
        }
    },
    upgrade: async(req, res) => {
        try {
            const {userId, tek, admin, cantine} = req.body;

            if (!userId || (!tek || !["Tek 1", "Tek 2", "Tek 3", "Coding", "Msc Pro 1", "Msc Pro 2", "Pedago", "Cantine", "Bocal"].includes(tek) && cantine === undefined && admin === undefined))
                return res.status(403).json({
                    message: "Please fill the correct fields"
                });
            const user = await User.findOne(userId).select("-password");
            if (!user) {
                return res.status(404).json({
                    message: "User not found"
                })
            }
            if (!req.user.admin)
                return res.status(403).json({
                    message: "You're not allowed to make this action"
                });
            if (tek)
                user.tek = tek;
            if (admin !== undefined)
                user.admin = admin;
            if (cantine !== undefined)
                user.cantine = cantine;
            await user.save();
            return res.status(200).json({
                message: "Updgrading done"
            });
        } catch (error) {
            return res.status(500).json({
                message: error.message
            })
        }
    },
    getProfile: async(req, res) => {
        try {
            const userId = req.body.userId;

            if (!userId)
                return res.status(404).json({
                    message: "The userId is required"
                });
            const user = await User.findById(userId).select("-password -status");
            if (!user) {
                return res.status(404).json({
                    message: 'User not found'
                });
            }
            if (!req.user.admin && !req.user._id.toString() === user._id.toString())
                return res.status(403).json({
                    message: "You're not allowd to do this"
                });
            return res.status(200).json(user);
        } catch (error) {
            return res.status(500).json({
                message: error.message
            })
        }
    },
    updateProfile: async(req, res) => {
        try {

        } catch (error) {
            return res.status(500).json({
                message: error.message
            })
        }
    },
    getWaiters: async(req, res) => {
        try {
            const {page = 1, limit = 25} = req.query;

            const users = await User.find({
                status: "Waiting"
            })
            .select("-password")
            .sort({_id: -1})
            .skip((page - 1) * limit)
            .limit(limit)
            return res.status(200).json(users);
        } catch (error) {
            return res.status(500).json({
                message: error.message
            })
        }
    },
    getUsers: async(req, res) => {
        try {
            const {page = 1, limit = 25, status} = req.query;

            const query = {}
            if (status)
                query.status = {};
            const users = await User.find(query)
            .select("-password")
            .sort({_id: -1})
            .skip((page - 1) * limit)
            .limit(limit)
            return res.status(200).json(users);
        } catch (error) {
            return res.status(500).json({
                message: error.message
            })
        }
    }
})

module.exports = userController;