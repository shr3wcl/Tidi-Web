const TodoModel = require("../Models/Todo");
const ProjectModel = require("../Models/Project");
const jwt = require("jsonwebtoken");

const TodoController = {
    getAll: async (req, res) => {
        try{
            const userID = jwt.decode(req.headers.token.split(" ")[1]).id;
            const idProject = req.params.idProject;
            const checkProject = await ProjectModel.findById(idProject);

            if(idProject && userID && checkProject){
                const todo = await TodoModel.find({idProject: idProject});
                res.status(200).json(todo);
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
            const idTodo = req.params.idTodo;
            const todo = await TodoModel.findById(idTodo);
            if(todo){
                res.status(200).json(todo);
            }else{
                res.status(403).json({message: "Yêu cầu không hợp lệ"});
            }
        }catch(err){
            res.status(500).json("Lỗi");
        }
    },

    addTodo: async (req, res) => {
        try{
            const userID = jwt.decode(req.headers.token.split(" ")[1]).id;
            const idProject = req.params.idProject;
            const checkProject = await ProjectModel.findById(idProject);
            if(idProject && userID && checkProject) {
                const todo = await TodoModel({
                    idProject: idProject,
                    title: req.body.title,
                    content: req.body.content,
                    state: req.body.state,
                });
                await todo.save();
                res.status(200).json({message: "Thêm todo thành công"});
            }else{
                res.status(403).json({message: "Yêu cầu không hơp lệ"});
            }
        }catch(err){
            res.status(500).json("Lỗi");
        }
    },

    deleteTodo: async (req, res) => {
        try{
            const userID = jwt.decode(req.headers.token.split(" ")[1]).id;
            const idTodo = req.params.idTodo;
            const checkTodo = await TodoModel.findById(idTodo);
            if(userID && checkTodo){
                await TodoModel.findByIdAndDelete(idTodo);
                res.status(200).json({message: "Đã xoá todo"});
            }else{
                res.status(403).json({message: "Yêu cầu không hợp lệ"});
            }
        }catch(err){
            res.status(500).json("Lỗi");
        }
    },

    editTodo: async (req, res) => {
        try{
            const userID = jwt.decode(req.headers.token.split(" ")[1]).id;
            const idTodo = req.params.idTodo;
            const checkTodo = await TodoModel.findById(idTodo);
            if(userID && checkTodo){
                checkTodo.title = req.body.title;
                checkTodo.content = req.body.content;
                checkTodo.state = req.body.state;
                await checkTodo.save();
                res.status(200).json({message: "Sửa todo thành công"});
            }else{
                res.status(403).json({message: "Yêu cầu không hợp lệ"});
            }
        }catch(err){
            res.status(500).json("Lỗi");
        }
    }
}

module.exports = TodoController;
