const StorageModel = require("../Models/Storage");
const jwt = require("jsonwebtoken");

const StorageController = {
    getAll: async (req, res) => {
        try {
            const idUser = jwt.decode(req.headers.token.split(" ")[1]).id;
            if (idUser) {
                const storage = await StorageModel.find({ idUser: idUser }).populate({
                    path: "idBlog", select: "_id title", populate: {
                        path: "idUser", select: "_id firstName lastName avatar"
                    }
                }).sort([['createdAt', -1]]);
                return res.status(200).json(storage);
            }
            res.status(404).json("Not found");
        } catch (err) {
            res.status(500).json("Error");
        }
    },

    add: async (req, res) => {
        try {
            const idUser = jwt.decode(req.headers.token.split(" ")[1]).id;
            if (idUser) {
                const checkEmpty = await StorageModel.findOne({ idBlog: req.body.idBlog, idUser: idUser });
                if (checkEmpty) {
                    return res.status(200).json("Bài viết đã được lưu");
                }
                const data = await StorageModel({
                    idUser: idUser,
                    idBlog: req.body.idBlog
                });
                await data.save();
                return res.status(200).json("Successful");
            }
            res.status(403).json("Not Found");
        } catch (error) {
            console.log(error);
            res.status(500).json("Error");
        }
    },

    delete: async (req, res) => {
        try {
            const idUser = jwt.decode(req.headers.token.split(" ")[1]).id;
            if (idUser) {
                await StorageModel.findOneAndDelete({ idUser: idUser, idBlog: req.params.idBlog });
                return res.status(200).json("Successful");
            }
            return res.status(404).json("Not found");
        } catch (error) {
            console.log(error);
            return res.status(500).json("Error");
        }
    }
}

module.exports = StorageController;
