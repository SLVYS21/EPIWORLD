const { default: mongoose } = require('mongoose')
const Community = require('../../models/Stack/community.model')

const exist = async function(name)
{
    const communities = await Community.find();

    for (const community of communities) {
        if (community.toLowerCase().trim() === name.toLowerCase().trim())
            return true;
    }
    return false;
}

const communityController = ({
    create: async(req, res) => {
        try {
            const {name, description, option} = req.body;

            if (!option || !name || !description || ["Free", "Invitation"].includes(option))
                return res.status(403).json({
                    message: "Set the good parameters"
                });
            if (!exist) {
                return res.status(404).json({
                    message: "Community with this name already exist"
                });
            }
            const community =  await Community.create({
                name,
                description,
                validated: req.user.admin,
                created_by: req.user._id,
                members: [{
                    member: req.user._id,
                    role: "Admin"
                }]
            });
        } catch (error) {
            return res.status(500).json({
                message: error.message
            })
        }
    },
    updateMember: async(req, res) => { //Upgrade or downgrade member
        try {
             
        } catch (error) {
            return res.status(500).json({
                message: error.message
            })            
        }        
    },
    addMember: async(req, res) => {
        try {
             
        } catch (error) {
            return res.status(500).json({
                message: error.message
            });
        }
    },
    deleteMember: async(req, res) => {
        try {

        } catch(error) {
            return res.status(500).json({
                message: error.message
            })
        }
    },
    getWaiters: async(req, res) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;

            const waiters = await Community.find({validated: false})
            .skip((page - 1) * limit)
            .limit(limit);
            
            return res.status(200).json(waiters);
        } catch (error) {
            return res.status(500).json({
                message: error.message
            })
        }
    },
    validateCommunity: async(req, res) => {
        try {

        } catch (error) {
            return res.status(500).json({
                message: error.message
            })
        }
    },
    setPolicies: async(req, res) => {
        try {

        } catch (error) {
            return res.status(500).json({
                message: error.message
            })
        }        
    },
    update: async(req, res) => {
        try {
            const {name, description} = req.body;

            const community = await Community.findById(req.params.id);
            if (!community)
                return res.status(404).json({
                    message: "Community not found"
                });
            if (req.user.admin)
                return res.status
        } catch (error) {
            return res.status(500).json({
                message: error.message
            })
        }
    },
    delete: async(req, res) => {
        try {

        } catch (error) {
            return res.status(500).json({
                message: error.message
            })
        }
    },
    getMembers: async(req, res) => {
        try {
            const community = await Community.findById(req.params.id);
            if (!community) {
                return res.status(404).json({
                    message: "Community not found"
                });
            }
            
        } catch (error) {
            return res.status(500).json({
                message: error.message
            })
        }
    },
    getCommunityPost: async(req, res) => {
        try {

        } catch (error) {
            return res.status(500).json({
                message: error.message
            })
        }
    },
    getCommunities: async(req, res) => {
        try {

        } catch (error) {
            return res.status(500).json({
                message: error.message
            })
        }
    },
    joinCommunity: async(req, res) => {
        try {

        } catch (error) {
            return res.status(500).json({
                message: error.message
            });
        }
    },
    inviteMember: async(req, res) => {
        try {

        } catch (error) {
            return res.status(500).json({
                message: error.message
            })
        }
    },
    acceptInvitation: async(req, res) => {
        try {

        } catch (error) {
            return res.status(500).json({
                message: error.message
            })
        }
    }
});

module.exports = communityController;