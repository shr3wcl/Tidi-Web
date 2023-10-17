const ProjectModel = require("../Models/Project");
const ManagerModel = require("../Models/Manager");
const jwt = require("jsonwebtoken");

const ProjectController = {
    addProject: async (req, res) => {
        try {
            const userID = jwt.decode(req.headers.token.split(" ")[1]).id ?? false;
            if (userID) {
                let project = await ProjectModel({
                    title: req.body.title,
                    description: req.body.description,
                });
                project = await project.save();
                const idProject = project._id;
                const manager = await ManagerModel({
                    idUser: userID,
                    idProject: idProject,
                    role: 0
                })
                await manager.save();
                res.status(200).json({ message: "Tạo project thành công" });
            } else {
                res.status(403).json({ message: "Yêu cầu không hợp lệ" });
            }
        } catch (err) {
            res.status(500).json(err);
        }
    },

    deleteProject: async (req, res) => {
        try {
            const userID = jwt.decode(req.headers.token.split(" ")[1]).id ?? false;
            const idProject = req.params.idProject;
            const manager = await ManagerModel.findOne({
                $and: [
                    { idUser: userID },
                    { idProject: idProject }
                ]
            });
            console.log(manager);
            if (manager?.role === 0) {
                await ManagerModel.findByIdAndDelete(manager._id);
                await ProjectModel.findByIdAndDelete(idProject);
                res.status(200).json({ message: "Xoá project thành công" });
            } else {
                res.status(403).json({ message: "Bạn không có quyền xoá" });
            }
        } catch (err) {
            console.log(err);
            res.status(500).json("Lỗi");
        }
    },

    editProject: async (req, res) => {
        try {
            const userID = jwt.decode(req.headers.token.split(" ")[1]).id ?? false;
            const idProject = req.params.idProject;
            const project = await ProjectModel.findOne({ id: idProject });
            const idManager = await ManagerModel.find();
            if (idManager?.role === 0 && project) {
                project.title = req.body.title;
                project.description = req.body.description;
                await project.save();
                res.status(200).json({ message: "Thay đổi thông tin Project thành công" });
            } else {
                res.status(403).json({ message: "Yêu cầu không hợp lệ" });
            }
        } catch (err) {
            res.status(500).json("Lỗi");
        }
    },

    getAllProject: async (req, res) => {
        try {
            const userID = jwt.decode(req.headers.token.split(" ")[1]).id ?? false;
            if (userID) {
                const projects = await ManagerModel.find({ idUser: userID }).populate('idProject');
                res.status(200).json(projects);
            } else {
                res.status(403).json({ message: "Yêu cầu không hợp lệ" });
            }
        } catch
        (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    getDetailProject: async (req, res) => {
        try {
            const userID = jwt.decode(req.headers.token.split(" ")[1]).id ?? false;
            if (userID) {
                const data = await ManagerModel.find({ idUser: userID, idProject: req.params.idProject }).populate("idProject");
                return res.status(200).json(data);
            }
            else {
                return res.status(400).json("Bad request");
            }
        } catch (error) {
            return res.status(500).json("Error");
        }
    }
}

module.exports = ProjectController;
