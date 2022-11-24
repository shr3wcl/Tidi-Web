const UserModel = require("../Models/User");
const bcrypt = require("bcrypt");
const tokenOBJ = require("./TokenController");
const jwt = require('jsonwebtoken');


const AuthController = {
    register: async (req, res) => {
        try {
            const checkUsername = await UserModel.findOne({ username: req.body.username });
            const checkEmail = await UserModel.findOne({ email: req.body.email });
            if (checkUsername) {
                res.status(403).json({ message: "Tên người dùng đã tồn tại" });
            }
            if (checkEmail) {
                res.status(403).json({ message: "Email đã được sử dụng" });
            }
            const salt = await bcrypt.genSalt(10);
            const hashedPass = await bcrypt.hash(req.body.password, salt);

            const newUser = await UserModel({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                username: req.body.username,
                email: req.body.email,
                gender: req.body.gender,
                password: hashedPass
            });

            const user = await newUser.save();
            res.status(200).json({ message: "Đăng ký thành công", user: user });
        } catch (err) {
            console.error(err);
        }
    },

    login: async (req, res) => {
        try {
            const user = await UserModel.findOne({ username: req.body.username });
            if (!user) {
                res.status(404).json({ message: "Không tìm thấy tên người dùng" });
            } else {
                const checkPassword = await bcrypt.compare(req.body.password, user.password);
                if (!checkPassword) {
                    res.status(404).json({ message: "Sai mật khẩu" });
                } else {
                    const accessToken = tokenOBJ.generateAccessToken(user);
                    const refreshToken = tokenOBJ.generateRefreshToken(user);
                    res.cookie("refreshToken", refreshToken, {
                        httpOnly: true,
                        secure: false,
                        path: "/",
                        sameSite: "strict",
                    });
                    const { password, ...others } = user._doc;
                    res.status(200).json({ message: "Đăng nhập thành công", user: { ...others }, token: { accessToken: accessToken, refreshToken: refreshToken } });
                }
            }

        } catch (err) {
            console.log(err);
        }
    },

    logout: async (req, res) => {
        try {
            res.removeHeader("token");
            res.clearCookie("accessToken");
            res.clearCookie("refreshToken");
            res.status(200).json({ message: "Đăng xuất thành công" });
        } catch (err) {
            res.status(500).json(err);
        }
    },

    requestRefreshToken: async (req, res) => {
        try {
            const refreshToken = await req.headers.refreshtoken;
            if (!refreshToken) {
                res.status(401).json("You're not authenticated")
            } else {
                jwt.verify(refreshToken, process.env.KEY_REFRESH_TOKEN_JWT, async (err, user) => {
                    if (err) {
                        console.log(err);
                    } else {
                        const newAccessToken = tokenOBJ.generateAccessToken(user);
                        const newRefreshToken = tokenOBJ.generateRefreshToken(user);
                        res.cookie("refreshToken", newRefreshToken, {
                            httpOnly: true,
                            secure: false,
                            path: "/",
                            sameSite: "strict",
                        });
                        res.status(200).json({
                            accessToken: newAccessToken,
                            refreshToken: newRefreshToken,
                        });
                    }
                    // refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
                });
            }
        } catch (err) {
            console.log(err);
            res.status(500).json("Lỗi");
        }
    },
}

module.exports = AuthController;
