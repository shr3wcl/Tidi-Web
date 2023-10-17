const TaskModel = require("../Models/Task");
const ProjectModel = require("../Models/Project");
const jwt = require("jsonwebtoken");

const TaskController = {
    getAll: async (req, res) => {
        try{
            const userID = jwt.decode(req.headers.token.split(" ")[1]).id;
            const idProject = req.params.idProject;
            const checkProject = await ProjectModel.findById(idProject);
            if(idProject && userID && checkProject){
                const tasks = await TaskModel.find({idProject: idProject});
                res.status(200).json(tasks);
            }else{
                res.status(403).json({message: "Yêu cầu không hợp lệ"});
            }
        }catch(err){
            res.status(500).json("Lỗi");
        }
    },

    getDetail: async (req, res) => {
        try{
            const userID = jwt.decode(req.headers.token.split(" ")[1]).id;
            const idTask = req.params.idTask;
            const task = await TaskModel.findById(idTask);
            if(task){
                res.status(200).json(task);
            }else{
                res.status(403).json({message: "Yêu cầu không hợp lệ"});
            }
        }catch(err){
            console.log(err);
            res.status(500).json("Lỗi");
        }
    },

    addTask: async (req, res) => {
        try{
            const userID = jwt.decode(req.headers.token.split(" ")[1]).id;
            const idProject = req.params.idProject;
            const checkProject = await ProjectModel.findById(idProject);
            if(idProject && userID && checkProject) {
                const task = await TaskModel({
                    idProject: idProject,
                    title: req.body.title,
                    description: req.body.description,
                    dayStart: req.body.dayStart,
                    dayEnd: req.body.dayEnd,
                    state: req.body.state,
                });
                await task.save();
                res.status(200).json({message: "Thêm task thành công"});
            }else{
                res.status(403).json({message: "Yêu cầu không hơp lệ"});
            }
        }catch(err){
            console.log(err);
            res.status(500).json("Lỗi");
        }
    },

    deleteTask: async (req, res) => {
        try{
            const userID = jwt.decode(req.headers.token.split(" ")[1]).id;
            const idTask = req.params.idTask;
            const checkTask = await TaskModel.findById(idTask);
            if(userID && checkTask){
                await TaskModel.findByIdAndDelete(idTask);
                res.status(200).json({message: "Đã xoá task"});
            }else{
                res.status(403).json({message: "Yêu cầu không hợp lệ"});
            }
        }catch(err){
            res.status(500).json("Lỗi");
        }
    },

    editTask: async (req, res) => {
        try{
            const userID = jwt.decode(req.headers.token.split(" ")[1]).id;
            const idTask = req.params.idTask;
            const checkTask = await TaskModel.findById(idTask);
            if(userID && checkTask){
                checkTask.title = req.body.title;
                checkTask.description = req.body.description;
                checkTask.dayStart = req.body.dayStart;
                checkTask.dayEnd = req.body.dayEnd;
                checkTask.state = req.body.state;
                await checkTask.save();
                res.status(200).json({message: "Sửa task thành công"});
            }else{
                res.status(403).json({message: "Yêu cầu không hợp lệ"});
            }
        }catch(err){
            res.status(500).json("Lỗi");
        }
    }
}

module.exports = TaskController;
