const CommandOBJ = require("../Models/Command");
const jwt = require("jsonwebtoken");

const CommandController = {
    addCommand: async (req, res) => {
        console.log(1);
        try {
            const userID = jwt.decode(req.headers.token.split(" ")[1]).id;
            const idBlog = req.params.idBlog;
            if (idBlog) {
                const newCommand = await CommandOBJ({
                    idBlog: idBlog,
                    idUser: userID,
                    content: req.body.content
                })
                newCommand.save();
                res.status(200).json({ message: "Add comment success" });
            }
            else {
                res.status(403).json({ message: "Bad Request" });
            }
        } catch (err) {
            console.log("Loi: ", err);
            res.status(500).json({message: "Error"});
        }
    },

    getCommand: async (req, res) => {
        try {
            const idBlog = req.params.idBlog;
            if (idBlog) {
                const command = await CommandOBJ.find({ idBlog: idBlog }).select('_id content idUser createdAt').sort('-createdAt').populate('idUser', 'avatar firstName lastName');
                res.status(200).json(command);
            }
            else {
                res.status(403).json({ message: "Bad Request" });
            }
        } catch (err) {
            console.log("err", err);
            res.status(500).json("Error");
        }
    },

    editCommand: async (req, res) => {
        try {
            const idCommand = req.params.idCommand;
            if (idCommand) {
                const command = await CommandOBJ.findOne({ _id: idCommand });
                if (command) {
                    command.content = req.body.content;
                    await command.save();
                    res.status(200).json({ message: "Edit Success" });
                }
            } else {
                res.status(403).json({ message: "Bad Request" });
            }
        } catch (err) {
            console.log("1:", err);
            res.status(500).json("Lỗi");
        }
    },

    deleteCommand: async (req, res) => {
        try {
            const idCommand = req.params.idCommand;
            if (idCommand) {
                await CommandOBJ.findByIdAndDelete({ _id: idCommand });
                res.status(200).json({ message: "Delete Success" });
            } else {
                res.status(403).json({ message: "Bad Request" });
            }
        } catch (err) {
            res.status(500).json("Error");
        }
    }
}

module.exports = CommandController;
