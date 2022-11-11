const ManagerModel = require("../Models/Manager");
const ProjectModel = require("../Models/Project");
const jwt = require("jsonwebtoken");

const ManagerController = {
    addMember: async (req, res) => {
        try {
            const userID = jwt.decode(req.headers.token.split(" ")[1]).id;
            const data = await ManagerModel.findOne({
                $and: [
                    {idUser: userID},
                    {idProject: req.params.idProject},
                    {role: 0}
                ]
            });
            if (data) {
                const member = await ManagerModel({
                    idUser: req.body.idUser,
                    idProject: req.params.idProject,
                    role: req.body.role
                })
                await member.save();
                res.status(200).json({message: "Thêm member thành công"});
            } else {
                res.status(403).json({message: "Yêu cầu không hợp lệ"});
            }
        } catch (err) {
            console.log(err);
            res.status(500).json({message: "Lỗi"});
        }
    },

    editRoleMember: async (req, res) => {
        try{
            const userID = jwt.decode(req.headers.token.split(" ")[1]).id;
            const idMember = req.body.idMember;
            const idProject = req.params.idProject;
            if(idMember && idProject){
                const managerCheck = await ManagerModel.find({
                    $and: [
                        {idUser: idMember},
                        {idProject: idProject}
                    ]
                });
                // const manager = JSON.parse(JSON.stringify(managerCheck))[0];
                managerCheck[0].role = req.body.role;
                await managerCheck[0].save();
                res.status(200).json({message: "Sửa vai trò thành viên thành công"});
            }
            else{
                res.status(403).json({message: "Yêu cầu không hợp lệ"});
            }
        }catch(err){
            console.log(err);
            res.status(500).json(err);
        }
    },

    deleteMember: async (req, res) => {
        try{
            const userID = jwt.decode(req.headers.token.split(" ")[1]).id;
            const idMember = req.body.idMember;
            const idProject = req.params.idProject;
            if(idMember && idProject){
                const managerCheck = await ManagerModel.find({
                    $and: [
                        {idUser: idMember},
                        {idProject: idProject}
                    ]
                });
                if(managerCheck){
                    await ManagerModel.findOneAndDelete({
                        $and: [
                            {idUser: idMember},
                            {idProject: idProject}
                        ]
                    });
                    return  res.status(200).json({message: "Xoá thành viên thành công"});
                }
            }
            res.status(403).json({message: "Yêu cầu không hợp lệ"});
        }catch(err){
            res.status(500).json("Lỗi");
        }
    },

    getAllMember: async (req, res) => {
        try{
            const userID = jwt.decode(req.headers.token.split(" ")[1]).id;
            const idProject = req.params.idProject;
            const checkId = await ManagerModel.findOne({
                $and: [
                    {idUser: userID},
                    {idProject: idProject}
                ]
            });
            if(checkId){
                const members = await ManagerModel.find({idProject: idProject}).populate('idUser');
                res.status(200).json(members);
            }
            else {
                res.status(403).json({message: "Yêu cầu không hợp lệ"});
            }
        }catch(err){
            console.log(err);
            res.status(500).json("Lỗi");
        }
    }
}

module.exports = ManagerController;
