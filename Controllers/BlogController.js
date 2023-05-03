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
    
    getAllBlogBasicPublic: async (req, res) => {
        try {
            // const blogs = await BlogModel.find({ status: true }).select("_id idUser title status createdAt").sort([['updatedAt', -1]]).populate('idUser');
            const blogs = await BlogModel.find({ status: true }).select("_id idUser title status description createdAt").sort([['updatedAt', -1]]).populate('idUser', 'firstName lastName');
            res.status(200).json({ blogs: blogs });
        } catch (error) {
            res.status(401).json("Error");
        }
    },

    getOwnerBasicBlogs: async (req, res) => {
        try {
            const userID = jwt.decode(req.headers.token.split(" ")[1]).id;
            if (userID) {
                const blogs = await BlogModel.find({ idUser: userID }).select('_id idUser title status description createdAt').sort([['createdAt', -1]]).populate('idUser', 'firstName lastName');
                console.log("Helooooooooo");
                res.status(200).json({ blogs: blogs });
            } else {
                res.status(401).json({ message: "Not found user" });
            }
        } catch (error) {
            
        }
    },

    getOwnerAllBlogs: async (req, res) => {
        try {
            const userID = jwt.decode(req.headers.token.split(" ")[1]).id;
            if (userID) {
                const blogs = await BlogModel.find({ idUser: userID }).sort([['createdAt', -1]]);
                res.status(200).json({ blogs: blogs });
            } else {
                res.status(401).json({ message: "Not found user" });
            }
        } catch (err) {
            res.status(401).json({ message: "Error" });
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
                    res.status(404).json({message: "Bad request"});
                }
            }
        } catch (err) {
            res.status(404).json({message: "Error"});
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
                    description: req.body.description,
                    status: req.body.status
                });

                const blog = await newBlog.save();
                // blogFavourites = FavouriteModel({
                //     idBlog: blog._id,
                //     quantity: 0,
                // });
                // await blogFavourites.save();
                res.status(200).json({ blogs: blog });
            } else {
                res.status(404).json({ message: "Add Blog Fail" });
            }
        } catch (err) {
            res.status(500).json({ message: "Error" });
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
                blog.description = req.body.description;
                await blog.save();
                res.status(200).json({ message: "Edit Blog Success" });
            } else {
                res.status(403).json({ message: "Bad Request" });
            }
        } catch (err) {
            console.log(err);
            res.status(500).json("Lỗi");
        }
    },

    deleteBlog: async (req, res) => {
        try {
            console.log(1);
            const idBlog = req.params?.idBlog;
            console.log(idBlog);
            if (idBlog) {
                await BlogModel.findByIdAndDelete(idBlog);
                res.status(200).json({ message: "Delete Success" });
            } else {
                res.status(403).json({ message: "Bad Request" });
            }
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Error" });
        }
    },

    increaseFavorites: async (req, res) => {
        try {
            const userID = jwt.decode(req.headers.token.split(" ")[1]).id;
            const idBlog = req.params?.idBlog;
            const blog = await BlogModel.findOne({ idBlog: idBlog });
            if (blog && userID) {
                const checkData = await FavouriteModel.findOne({ idUser: userID, idBlog: idBlog });
                if (!checkData) {
                    const data = await FavouriteModel({
                        idBlog: idBlog,
                        idUser: userID
                    });
                    await data.save();
                    res.status(200).json({ message: "Success" });
                } else {
                    res.status(200).json({ message: "You liked this post already" });
                }
            } else {
                res.status(403).json({ message: "Error" });
            }
        } catch (err) {
            res.status(500).json({message: "Error"});
        }
    },

    searchBlog: async (req, res) => {
        try {
            const key = req.body.key;
            console.log(123);
            console.log(key);
            const data = await BlogModel.find({ 
                $or: [
                    { title: { $regex: '.*' + key + '.*' } },
                    { content: { $regex: '.*' + key + '.*' } }
                ]
            }).select("_id idUser title status description createdAt").sort([['updatedAt', -1]]).populate('idUser', 'firstName lastName');
            console.log();
            res.status(200).json({blogs: data});
        } catch (error) {
            console.log(err);
            res.status(500).json({message: "Error"});
        }
    },

    renderMobile: async (req, res) => {
        res.sendFile(__dirname + '/../EditorJS/index.html');
    },

    getIdUserOfBlog: async (id) => {
        try {
            const blog = await BlogModel.findOne({ _id: id }).select('idUser');
            return blog;
        } catch (error) {
            console.log(error);
        }
    },

    getAllBlogToSearch: async (req, res) => {
        try {
            const blogs = await BlogModel.find().select("title");
            const users = await UserModel.find().select("firstName lastName");
            res.status(200).json({ data: { blogs, users }});
        } catch (err) {
            res.status(403).json({ message: "Error" });
        }
    },

    getOverview: async (req, res) => {
        try {
            console.log(123123);
            const blogs = await BlogModel.findOne({ _id: req.params.idBlog }).select("_id idUser title status description createdAt").populate('idUser', 'firstName lastName avatar');
            const likes = await FavouriteModel.find({ idBlog: req.params.idBlog }).populate('idUser', 'firstName lastName');
            res.status(200).json({blog: blogs, like: likes});
        } catch (error) {
            res.status(403).json({ message: "Error" });
        }
    }
}

module.exports = BlogController;
