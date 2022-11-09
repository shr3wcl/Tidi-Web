const CommandOBJ = require("../Models/Command");
const jwt = require("jsonwebtoken");

const CommandController = {
    addCommand: async (req, res) => {
        try{
            const idBlog = req.params.idBlog;
            if(idBlog){
                const userID = jwt.decode(req.headers.token.split(" ")[1]).id;
                const newCommand = await CommandOBJ({
                    idBlog: idBlog,
                    idUser: userID,
                    content: req.body.content
                })
                newCommand.save();
                res.status(200).json({message: "Thêm bình luận thành công"});
            }
            else{
                res.status(403).json({message: "Yêu cầu không hợp lệ"});
            }
        }catch(err){
            console.log(err);
            res.status(500).json("Lỗi");
        }
    },

    getCommand: async (req, res) => {
        try {
            const idBlog = req.params.idBlog;
            if(idBlog){
                const command = await CommandOBJ.find({idBlog: idBlog});
                res.status(200).json({message: "Lấy bình luận thành công", command: command});
            }
            else {
                res.status(403).json({message: "Yêu cầu không hợp lệ"});
            }
        } catch (err) {
            res.status(500).json("Lỗi");
        }
    },

    editCommand: async (req, res) => {
        try{
            const idCommand = req.params.idCommand;
            if(idCommand){
                const command = await CommandOBJ.findOne({_id: idCommand});
                if(command){
                    command.content = req.body.content;
                    await command.save();
                    res.status(200).json({message: "Sửa bình luận thành công"});
                }
            }else{
                res.status(403).json({message: "Yêu cầu không hợp lệ"});
            }
        }catch(err){
            console.log(err);
            res.status(500).json("Lỗi");
        }
    },

    deleteCommand: async (req, res) => {
        try{
            const idCommand = req.params.idCommand;
            if(idCommand){
                await CommandOBJ.findByIdAndDelete({_id: idCommand});
                res.status(200).json({message: "Xoá bình luận thành công"});
            }else{
                res.status(403).json({message: "Yêu cầu không hợp lệ"});
            }
        }catch(err){
            res.status(500).json("Lỗi");
        }
    }
}

module.exports = CommandController;
