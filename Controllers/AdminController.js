const UserModel = require("../Models/User");

const AdminController = {
    getAllUser: async (req, res) =>{
        try{
            const users = await UserModel.find();
            res.status(200).json({data: users});
        }catch(err){
            res.status(500).json(err);
        }
    }
}

module.exports = AdminController;
