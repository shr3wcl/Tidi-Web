const BlogModel = require("../Models/Blog");
const UserModel = require("../Models/User");

const BlogController = {
    getAllBlogs: async (req, res) => {
        try{
            const userID = req.session.user?._id;
            const blogs = await BlogModel.find({idOwner: userID});
            console.log(req.session.user);
            res.status(200).json({blogs: blogs});
        }catch(err){
            res.status(500).json(err);
        }
    },

    addBlog: async (req, res) => {
        try{
            const newBlog = await BlogModel({
                idOwner: req.session.user._id,
                title: req.body.title,
                description: req.body.description
            });

            const blog = await newBlog.save();
            res.status(200).json({message: "Đã thêm blog thành công", blog: blog});
        }catch(err){
            res.status(500).json(err);
        }
    }
}

module.exports = BlogController;
