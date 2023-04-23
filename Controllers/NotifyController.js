const NotifyModel = require("../Models/Notify");
const jwt = require('jsonwebtoken');

const NotificationController = {
    getAll: async (req, res) => {
        try {
            const userID = jwt.decode(req.headers.token.split(" ")[1]).id;
            console.log(userID);
            if (userID) {
                const notification = await NotifyModel.find({ idUser: userID }).sort([['createdAt', -1]]);
                return res.status(200).json({ notification });
            }
            return res.status(403).json({ message: "Error" });
        } catch (error) {
            console.log(error);
            return res.status(403).json({ message: "Error" });
        }
    },

    storeNotify: async (req, res) => {
        try {
            const idUser = req.params.idUser;            
            if (idUser) {
                const notification = await NotifyModel({
                    idUser: idUser,
                    idUserTarget: req.body.idUserTarget ?? "",
                    idTarget: req.body.idTarget ?? "",
                    content: req.body.content
                })

                await notification.save();
                return res.status(200).json({ message: "OK" });
            }
            return res.status(403).json({ message: "Error" });
        } catch (error) {
            return res.status(403).json({ message: "Error" });
        }
    },

    deleteNotify: async (req, res) => {
        try {
            
        } catch (error) {
            
        }
    },

    sendAll: async (req, res) => {
        try {

        } catch (error) {

        }
    },
}

module.exports = NotificationController;