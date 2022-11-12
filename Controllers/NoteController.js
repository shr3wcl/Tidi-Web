const NoteModel = require("../Models/Note");
const ProjectModel = require("../Models/Project");
const jwt = require("jsonwebtoken");

const NoteController = {
    getAllNote: async (req, res) => {
        try{
            const userID = jwt.decode(req.headers.token.split(" ")[1]).id;
            const idProject = req.params.idProject;
            const checkProject = await ProjectModel.findById(idProject);

            if(idProject && userID && checkProject){
                const notes = await NoteModel.find({idProject: idProject});
                res.status(200).json(notes);
            }else{
                res.status(403).json({message: "Yêu cầu không hợp lệ"});
            }
        }catch(err){
            console.log(err);
            res.status(500).json("Lỗi");
        }
    },

    getDetail: async (req, res) => {
        try{
            const userID = jwt.decode(req.headers.token.split(" ")[1]).id;
            const idNote = req.params.idNote;
            const note = await NoteModel.findById(idNote);
            if(note){
                res.status(200).json(note);
            }else{
                res.status(403).json({message: "Yêu cầu không hợp lệ"});
            }
        }catch(err){
            res.status(500).json("Lỗi");
        }
    },

    addNote: async (req, res) => {
        try{
            const userID = jwt.decode(req.headers.token.split(" ")[1]).id;
            const idProject = req.params.idProject;
            const checkProject = await ProjectModel.findById(idProject);
            if(idProject && userID && checkProject) {
                const note = await NoteModel({
                    idProject: idProject,
                    title: req.body.title,
                    content: req.body.content,
                    state: req.body.state,
                });
                await note.save();
                res.status(200).json({message: "Thêm ghi chú thành công"});
            }else{
                res.status(403).json({message: "Yêu cầu không hơp lệ"});
            }
        }catch(err){
            res.status(500).json("Lỗi");
        }
    },

    deleteNote: async (req, res) => {
        try{
            const userID = jwt.decode(req.headers.token.split(" ")[1]).id;
            const idNote = req.params.idNote;
            const checkNote = await NoteModel.findById(idNote);
            if(userID && checkNote){
                await NoteModel.findByIdAndDelete(idNote);
                res.status(200).json({message: "Đã xoá ghi chú"});
            }else{
                res.status(403).json({message: "Yêu cầu không hợp lệ"});
            }
        }catch(err){
            res.status(500).json("Lỗi");
        }
    },

    editNote: async (req, res) => {
        try{
            const userID = jwt.decode(req.headers.token.split(" ")[1]).id;
            const idNote = req.params.idNote;
            const checkNote = await NoteModel.findById(idNote);
            if(userID && checkNote){
                checkNote.title = req.body.title;
                checkNote.content = req.body.content;
                checkNote.state = req.body.state;
                await checkNote.save();
                res.status(200).json({message: "Sửa ghi chú thành công"});
            }else{
                res.status(403).json({message: "Yêu cầu không hợp lệ"});
            }
        }catch(err){
            res.status(500).json("Lỗi");
        }
    }
}

module.exports = NoteController;
