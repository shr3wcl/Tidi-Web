const jwt = require("jsonwebtoken");
const FileModel = require("../Models/files");
var path = require('path');

const FileController = {
    getAllFile: async (req, res) => {
        try {
            const userID = jwt.decode(req.headers.token.split(" ")[1]).id;
            const files = await FileModel.find({ idUser: userID }).sort([['createdAt', -1]]);
            res.status(200).json(files);
        } catch (error) {
            res.status(500).json("err");
        }
    },

    uploadFile: async (req, res) => {
        try {
            const userID = jwt.decode(req.headers.token.split(" ")[1]).id;
            if (userID) {
                console.log(req.file);
                const newFile = await FileModel({
                    idUser: userID,
                    nameStorage: req.file.filename,
                    nameFile: req.file.originalname
                });
                await newFile.save();
                res.status(200).json("Success");
            } else {
                res.status(404).json("Thêm blog không thành công");
            }
        } catch (err) {
            console.log(err);
            res.status(500).json("err");
        }
    },

    getFile: async (req, res) => {
        try {
            const userID = jwt.decode(req.headers.token.split(" ")[1]).id;
            if (userID) {
                const file = await FileModel.find({ idUser: userID, nameStorage: req.params.nameFile });
                var options = {
                    root: path.join(`${__dirname}./../public/file`)
                };
                res.sendFile(file[0].nameStorage, { root: path.resolve(__dirname, '../public/file') });
            }
        } catch (error) {
            res.status(404).json("err");
        }
    }
}

module.exports = FileController;
