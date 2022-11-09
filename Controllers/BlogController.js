const BlogModel = require("../Models/Blog");
const UserModel = require("../Models/User");
const jwt = require('jsonwebtoken');

const BlogController = {
    getAllBlogs: async (req, res) => {
        try {
            const userID = jwt.decode(req.headers.token.split(" ")[1]).id;
            if (userID) {
                const blogs = await BlogModel.find({idOwner: userID});
                res.status(200).json({blogs: blogs});
            } else {
                res.status(404).json({message: "Không tìm thấy người dùng"});
            }
        } catch (err) {
            res.status(500).json("Lỗi");
        }
    },

    getDetailBlog: async (req, res) => {
        try{
            const idBlog = req.params.idBlog;
            if(idBlog){
                const blog = await BlogModel.findOne({_id: idBlog});
                if(blog){
                    res.status(200).json({message: "Lấy data thành công", blog: blog});
                }else{
                    res.status(404).json({message: "Yêu cầu không hợp lệ"});
                }
            }
        }catch(err){
            res.status(404).json({message: "Lỗi"});
        }
    },

    addBlog: async (req, res) => {
        try {
            const userID = jwt.decode(req.headers.token.split(" ")[1]).id;
            if (userID) {
                const newBlog = await BlogModel({
                    idOwner: userID,
                    title: req.body.title,
                    content: req.body.content
                });

                const blog = await newBlog.save();
                res.status(200).json({message: "Đã thêm blog thành công", blog: blog});
            } else {
                res.status(404).json({message: "Thêm blog không thành công"});
            }
        } catch (err) {
            res.status(500).json("Lỗi");
        }
    },

    editBlog: async (req, res) => {
        try{
            const idBlog = req.params?.idBlog;
            if(idBlog){
                const blog = await BlogModel.findOne({_id: idBlog});
                blog.title = req.body.title;
                blog.content = req.body.content;
                await blog.save();
                res.status(200).json({message: "Sửa nội dung blog thành công"});
            }else{
                res.status(403).json({message: "Yêu cầu không hợp lệ"});
            }
        }catch(err){
            res.status(500).json("Lỗi");
        }
    },

    deleteBlog: async (req, res) => {
        try{
            const idBlog = req.params?.idBlog;
            if(idBlog){
                await BlogModel.findByIdAndDelete(idBlog);
                res.status(200).json({message: "Đã xoá thành công"});
            }else{
                res.status(403).json({message: "Xoá không thành công"});
            }
        }catch(err){
            res.status(500).json({message: "Lỗi"});
        }
    },
}

module.exports = BlogController;
