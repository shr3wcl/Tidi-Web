const UserModel = require("../Models/User");
const jwt = require('jsonwebtoken');

const UserController = {
    getInfo: async (req, res) => {
        try{
            const userID = jwt.decode(req.headers.token.split(" ")[1]).id ?? req.params.idUser;
            if(userID){
                const user = await UserModel.findOne({_id: userID});
                res.status(200).json({user: user});
            }else{
                res.status(403).json({message: "Yêu cầu không hợp lệ"});
            }
        }catch(err){
            res.status(500).json("Error");
        }
    },

    editInfo: async (req, res) => {
        try{
            const userID = jwt.decode(req.headers.token.split(" ")[1]).id;
            if(userID){
                const user = await UserModel.findOne({_id: userID});
                if(user){
                    user.firstName = req.body.firstName;
                    user.lastName = req.body.lastName;
                    user.email = req.body.email;
                    user.gender = req.body.gender;
                    await user.save();
                    res.status(200).json({message: "Cập nhập thông tin thành công"});
                }
                else{
                    res.status(200).json({message: "Không thể cập nhập"});
                }
            }else{
                res.status(403).json({message: "Yêu cầu không hợp lệ"});
            }
        }catch(err){
            res.status(500).json("Lỗi");
        }
    }
}

module.exports = UserController;
