const BlogModel = require("../Models/Blog");
const UserModel = require("../Models/User");
const FavouriteModel = require("../Models/Favourite");
const jwt = require('jsonwebtoken');

const BlogController = {
    getAllBlogAdmin: async (req, res) => {
        try {
            const blogs = await BlogModel.find();
            res.status(200).json({ blogs: blogs });
        } catch (err) {
            res.status(500).json({ message: "Error" });
        }
    },

    getAllBlogPublic: async (req, res) => {
        try {
            const blogs = await BlogModel.find({ status: true }).sort([['updatedAt', -1]]).populate('idUser');
            res.status(200).json({ blogs });
        } catch (error) {
            res.status(500).json("Error");
        }
    },

    getOwnerAllBlogs: async (req, res) => {
        try {
            const userID = jwt.decode(req.headers.token.split(" ")[1]).id;
            if (userID) {
                const blogs = await BlogModel.find({ idUser: userID }).sort([['createdAt', -1]]);
                res.status(200).json({ blogs: blogs });
            } else {
                res.status(404).json("Not found user");
            }
        } catch (err) {
            res.status(500).json("Error");
        }
    },

    getDetailBlog: async (req, res) => {
        try {
            const idBlog = req.params.idBlog;
            if (idBlog) {
                const blog = await BlogModel.findOne({ _id: idBlog }).populate('idUser', 'firstName lastName avatar');
                const blogFavourite = await FavouriteModel.findOne({ idBlog: blog?._id }) ?? 0;
                const data = { ...blog._doc, favourites: blogFavourite.quantity };
                if (blog) {
                    res.status(200).json({ blog: data });
                } else {
                    res.status(404).json("Bad Request");
                }
            }
        } catch (err) {
            res.status(404).json("Error");
        }
    },

    addBlog: async (req, res) => {
        try {
            const userID = jwt.decode(req.headers.token.split(" ")[1]).id;
            if (userID) {
                const newBlog = await BlogModel({
                    idUser: userID,
                    title: req.body.title,
                    content: req.body.content,
                    status: req.body.status
                });

                const blog = await newBlog.save();
                // blogFavourites = FavouriteModel({
                //     idBlog: blog._id,
                //     quantity: 0,
                // });
                // await blogFavourites.save();
                res.status(200).json(blog);
            } else {
                res.status(404).json("Add Blog Fail");
            }
        } catch (err) {
            res.status(500).json("Error");
        }
    },

    editBlog: async (req, res) => {
        try {
            const idBlog = req.params?.idBlog;
            if (idBlog) {
                const blog = await BlogModel.findOne({ _id: idBlog });
                blog.title = req.body.title;
                blog.content = req.body.content;
                blog.status = req.body.status;
                await blog.save();
                res.status(200).json({ message: "Edit Blog Success" });
            } else {
                res.status(403).json({ message: "Bad Request" });
            }
        } catch (err) {
            res.status(500).json("Lỗi");
        }
    },

    deleteBlog: async (req, res) => {
        try {
            const idBlog = req.params?.idBlog;
            if (idBlog) {
                await BlogModel.findByIdAndDelete(idBlog);
                res.status(200).json({ message: "Delete Success" });
            } else {
                res.status(403).json({ message: "Bad Request" });
            }
        } catch (err) {
            res.status(500).json({ message: "Error" });
        }
    },

    increaseFavorites: async (req, res) => {
        try {
            const userID = jwt.decode(req.headers.token.split(" ")[1]).id;
            const idBlog = req.params?.idBlog;
            if (idBlog) {
                const blog = await FavouriteModel.findOne({ idBlog: idBlog }, (err, favouriteBlog) => {
                    if (err) {
                        res.status(403).json({ message: "Error" });
                    } else {
                        console.log(favouriteBlog);
                    }
                });
                if (blog) {
                    blog.quantity++;
                    blog.save();
                    res.status(200).json({ message: "Đã like" });
                } else {
                    res.status(403).json({ message: "Yêu cầu không hợp lệ" });
                }
            } else {
                res.status(403).json({ message: "Yêu cầu không hợp lệ" });
            }
        } catch (err) {
            res.status(500).json("Lỗi");
        }
    },

    searchBlog: async (req, res) => {
        try {
            const key = req.body.key;
            const data = await BlogModel.find({
                $or: [
                    { title: { $regex: '.*' + key + '.*' } },
                    { content: { $regex: '.*' + key + '.*' } }
                ]
            });
            res.status(200).json(data);
        } catch (err) {
            res.status(500).json("Error");
        }
    }
}

module.exports = BlogController;
