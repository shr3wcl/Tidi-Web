const UserModel = require("../Models/User");
const jwt = require('jsonwebtoken');
const BlogModel = require("../Models/Blog");
const ProjectModel = require("../Models/Project");
const ManagerModel = require("../Models/Manager");
const bcrypt = require("bcrypt");
const { use } = require("../Routes/user");



const UserController = {
    // getInfo: async (req, res) => {
    //     try {
    //         // const userID = jwt.decode(req.headers.token.split(" ")[1]).id ?? req.params.idUser;
    //         const accessToken = await req.headers.cookie.split(";")[0].trim().split("=")[1];
    //         const userID = jwt.decode(accessToken);
    //         if (userID) {
    //             const user = await UserModel.findOne({ id: userID });
    //             res.status(200).json({ user: user });
    //         } else {
    //             res.status(403).json({ message: "Yêu cầu không hợp lệ" });
    //         }
    //     } catch (err) {
    //         // console.log(err);
    //         res.status(500).json("Error");
    //     }
    // },

    editInfo: async (req, res) => {
        try {
            const userID = jwt.decode(req.headers.token.split(" ")[1]).id;
            if (userID) {
                const user = await UserModel.findById(userID);
                console.log(user);
                if (user) {
                    user.firstName = req.body.firstName;
                    user.lastName = req.body.lastName;
                    user.email = req.body.email;
                    user.gender = req.body.gender;
                    user.birthday = req.body.birthday;
                    user.location = req.body.location;
                    user.bio = req.body.bio;
                    const userSaved = await user.save();
                    const { password, ...others } = userSaved._doc;
                    res.status(200).json({ user: others, message: "Changed Infomation" });
                }
                else {
                    res.status(401).json({ message: "Cannot update" });
                }
            } else {
                res.status(403).json({ message: "Bad request" });
            }
        } catch (err) {
            console.log(err);
            res.status(401).json("Error");
        }
    },

    changePassword: async (req, res) => {
        try {
            const userID = jwt.decode(req.headers.token.split(" ")[1]).id;
            if (userID) {
                const user = await UserModel.findById(userID);
                const salt = await bcrypt.genSalt(10);
                const oldPassword = req.body.oldPassword;
                if (user) {
                    const checkPassword = await bcrypt.compare(oldPassword, user.password);
                    if (checkPassword) {
                        const hashedPass = await bcrypt.hash(req.body.password, salt);
                        user.password = hashedPass;
                        await user.save();
                        return res.status(200).json({ message: "Updated" });
                    }
                    else {
                        return res.status(400).json({ message: "Wrong password" });
                    }
                }
            }
            return res.status(403).json({ message: "User is empty" })
        } catch (error) {
            res.status(500).json({ message: "Error" });
        }
    },

    getInfo: async (req, res) => {
        try {
            const user = await UserModel.findById(req.params.idUser).select("_id firstName lastName email gender avatar");
            const blog = await BlogModel.find({ idUser: req.params.idUser, status: true });
            const projects = await ManagerModel.find({ idUser: req.params.idUser }).populate({
                path: 'idProject',
                match: { status: true }
            });
            // res.status(200).json({ user, blog, projects });
            res.status(200).json({ user });
        }
        catch (err) {
            console.log(err);
            res.status(200).json({ message: "Error" });
        }
    },

    changeAvatar: async (req, res) => {
        try {
            const userID = jwt.decode(req.headers.token.split(" ")[1]).id;
            if (userID) {
                const user = await UserModel.findById(userID);
                user.avatar = req.body.avatar;
                const newUser = await user.save();
                const { password, ...others } = newUser._doc;
                return res.status(200).json(others);
            }

        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Error" });
        }
    }
}

module.exports = UserController;
