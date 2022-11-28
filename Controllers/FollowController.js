const FollowModel = require("../Models/Follow");
const { find } = require("../Models/Project");

const FollowController = {
    getAllFollow: async (req, res) => {
        try {
            const idUser = req.params.idUser;
            const data = await FollowModel.find({ idUser: idUser }).select("followers").sort([['updatedAt', -1]]);
            return res.status(200).json(data);
        } catch (error) {
            res.status(500).json("Error");
        }
    },

    addFollower: async (req, res) => {
        try {
            const userID = jwt.decode(req.headers.token.split(" ")[1]).id ?? false;
            if (userID) {
                const listFollower = await FollowModel.findById(req.params.idUser);
                listFollower.followers = [listFollower.followers, { userID }];
            }
        } catch (error) {
            res.status(500).json("Error");
        }
    },

    deleteFollower: async (req, res) => {
        try {
            const userID = jwt.decode(req.headers.token.split(" ")[1]).id;
            if (userID) {
                const listFollower = await FollowModel.findById(req.params.idUser);
                listFollower.followers = [listFollower.followers, { userID }];
            }
        } catch (error) {
            res.status(500).json("Error");
        }
    }
}

module.exports = FollowController;