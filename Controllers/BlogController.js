const BlogModel = require("../Models/Blog");
const UserModel = require("../Models/User");
const jwt = require('jsonwebtoken');

const BlogController = {
    getAllBlogs: async (req, res) => {
        try {
            const userID = jwt.decode(req.headers.token.split(" ")[1]).id;
            if(userID){
                const blogs = await BlogModel.find({ idOwner: userID });
                res.status(200).json({ blogs: blogs });
            }else{
                res.status(404).json({message: "Không tìm thấy người dùng"});
            }
        } catch (err) {
            res.status(500).json(err);
        }
    },

    addBlog: async (req, res) => {
        try {
            const userID = jwt.decode(req.headers.token.split(" ")[1]).id;
            if(userID) {
                const newBlog = await BlogModel({
                    idOwner: userID,
                    title: req.body.title,
                    description: req.body.description
                });

                const blog = await newBlog.save();
                res.status(200).json({message: "Đã thêm blog thành công", blog: blog});
            }else{
                res.status(404).json({message: "Thêm blog không thành công"});
            }
        } catch (err) {
            res.status(500).json(err);
        }
    }
}

module.exports = BlogController;
