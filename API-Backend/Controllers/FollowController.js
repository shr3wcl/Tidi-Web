const FollowModel = require("../Models/Follow");
const { find } = require("../Models/Project");
const jwt = require("jsonwebtoken");

const FollowController = {
    getAllFollowing: async (req, res) => {
        try {
            const idUser = req.params.idUser;
            const data = await FollowModel.find({ idFollow: idUser }).select('idFollow').sort([['updatedAt', -1]]).populate('idUser', 'avatar firstName lastName createdAt');
            return res.status(200).json({ followers: data });
        } catch (error) {
            res.status(500).json({ message: "Error" });
        }
    },

    getAllFollow: async (req, res) => {
        try {
            const idUser = req.params.idUser;
            const data = await FollowModel.find({ idUser: idUser }).select('idFollow').sort([['updatedAt', -1]]).populate('idFollow', 'avatar firstName lastName createdAt');
            return res.status(200).json({followers: data});
        } catch (error) {
            res.status(500).json({ message: "Error" });
        }
    },

    addFollower: async (req, res) => {
        try {
            const userID = jwt.decode(req.headers.token.split(" ")[1]).id ?? false;
            console.log(userID, req.params.idUser);
            if (userID) {
                const newFollow = await FollowModel({
                    idUser: userID,
                    idFollow: req.params.idUser
                });
                await newFollow.save();
                return res.status(200).json({ message: "Successful" });
            }
            return res.status(403).json({ message: "Error" });

        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Error" });
        }
    },

    deleteFollower: async (req, res) => {
        try {
            const userID = jwt.decode(req.headers.token.split(" ")[1]).id;
            if (userID) {
                await FollowModel.findOneAndDelete({ idUser: userID, idFollow: req.body.idFollow });
                return res.status(200).json({ message: "Successful" });
            }
            return res.status(403).json({ message: "Error" });
        } catch (error) {
            res.status(500).json({ message: "Error" });
        }
    },

    checkFollow: async (req, res) => {
        try {
            const userID = jwt.decode(req.headers.token.split(" ")[1]).id;
            if (userID) {
                const data = await FollowModel.findOne({ idUser: userID, idFollow: req.body.idFollow });
                if (data) {
                    return res.status(200).json({ result: true });                    
                } else {
                    return res.status(200).json({ result: false });
                }
            }
            return res.status(401).json({ message: "Error" });
        } catch (error) {
            console.log(error);
            res.status(500).json({message: "Error"});
        }
    }
}

module.exports = FollowController;