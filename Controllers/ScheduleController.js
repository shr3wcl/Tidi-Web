const ScheduleModel = require("../Models/Schedule");
const ProjectModel = require("../Models/Project");
const jwt = require("jsonwebtoken");

const ScheduleController = {
    getAll: async (req, res) => {
        try {
            const userID = jwt.decode(req.headers.token.split(" ")[1]).id;
            const idProject = req.params.idProject;
            const checkProject = await ProjectModel.findById(idProject);

            if (idProject && userID && checkProject) {
                const schedule = await ScheduleModel.find({ idProject: idProject });
                res.status(200).json(schedule);
            } else {
                res.status(403).json({ message: "Bad Request" });
            }
        } catch (err) {
            res.status(500).json("Lỗi");
        }
    },

    getDetail: async (req, res) => {
        try {
            const userID = jwt.decode(req.headers.token.split(" ")[1]).id;
            const idSchedule = req.params.idSchedule;
            const schedule = await ScheduleModel.findById(idSchedule);
            if (schedule) {
                res.status(200).json(schedule);
            } else {
                res.status(403).json({ message: "Bad Request" });
            }
        } catch (err) {
            res.status(500).json("Lỗi");
        }
    },

    addSchedule: async (req, res) => {
        try {
            const userID = jwt.decode(req.headers.token.split(" ")[1]).id;
            const idProject = req.params.idProject;
            const checkProject = await ProjectModel.findById(idProject);
            if (idProject && userID && checkProject) {
                const schedule = await ScheduleModel({
                    idProject: idProject,
                    title: req.body.title,
                    description: req.body.description,
                    state: req.body.state,
                    stateAlarm: req.body.stateAlarm,
                    dayStart: req.body.dayStart,
                    dayEnd: req.body.dayEnd
                });
                await schedule.save();
                res.status(200).json({ message: "Add Schedule Success" });
            } else {
                res.status(403).json({ message: "Bad Request" });
            }
        } catch (err) {
            res.status(500).json("Lỗi");
        }
    },

    deleteSchedule: async (req, res) => {
        try {
            const userID = jwt.decode(req.headers.token.split(" ")[1]).id;
            const idSchedule = req.params.idSchedule;
            const checkSchedule = await ScheduleModel.findById(idSchedule);
            if (userID && checkSchedule) {
                await ScheduleModel.findByIdAndDelete(idSchedule);
                res.status(200).json({ message: "Delete Schedule Success" });
            } else {
                res.status(403).json({ message: "Bad Request" });
            }
        } catch (err) {
            res.status(500).json("Lỗi");
        }
    },

    editSchedule: async (req, res) => {
        try {
            const userID = jwt.decode(req.headers.token.split(" ")[1]).id;
            const idSchedule = req.params.idSchedule;
            const checkSchedule = await ScheduleModel.findById(idSchedule);
            if (userID && checkSchedule) {
                checkSchedule.title = req.body.title;
                checkSchedule.description = req.body.description;
                checkSchedule.stateAlarm = req.body.stateAlarm;
                checkSchedule.dayStart = req.body.dayStart;
                checkSchedule.dayEnd = req.body.dayEnd;
                checkSchedule.state = req.body.state;
                await checkSchedule.save();
                res.status(200).json({ message: "Edit Schedule Success" });
            } else {
                res.status(403).json({ message: "Bad Request" });
            }
        } catch (err) {
            res.status(500).json("Lỗi");
        }
    }
}

module.exports = ScheduleController;
