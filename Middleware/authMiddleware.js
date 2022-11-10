const jwt = require('jsonwebtoken');

const authMiddleware = {
    verifyAccessToken: (req, res, next) => {
        try {
            let accessToken = req.headers.token;
            if (accessToken) {
                accessToken = accessToken.split(" ")[1];
                jwt.verify(accessToken, process.env.KEY_ACCESS_TOKEN_JWT, (err, user) => {
                    if (err) {
                        res.status(404).json({message: "Token không hợp lý"});
                    } else {
                        req.user = user;
                        next();
                    }
                });
            } else {
                res.status(403).json({message: "Bạn không có quyền truy cập"});
            }
        } catch (err) {
            res.status(500).json({message: "Yêu cầu không hợp lệ"});
        }
    },

    verifyAdmin: (req, res, next) => {
        try {
            const admin = jwt.decode(req.headers.token.split(" ")[1]).admin ?? false;

            if (admin === true) {
                next();
            } else {
                res.status(403).json({message: "Bạn không có quyền hạn này"});
            }
        } catch (err) {
            console.log(err);
            res.status(500).json({message: "Yêu cầu không hợp lệ"});
        }
    },

    verifyOwnerOrAdmin: async (req, res, next) => {
        try{
            const admin = jwt.decode(req.headers.token.split(" ")[1])?.admin ?? false;
            let accessToken = req.headers.token;
            let checkOwner = 1;
            if (accessToken) {
                accessToken = accessToken.split(" ")[1] ?? false;
                jwt.verify(accessToken, process.env.KEY_ACCESS_TOKEN_JWT, (err, user) => {
                    if (err) {
                        if(admin){
                            next();
                        }else {
                            res.status(404).json({message: "Token không hợp lý"});
                        }
                    } else {
                        next();
                    }
                });
            }else{
                if(admin){
                    next();
                }else{
                    res.status(403).json({message: "Bạn không có quyền truy cập"});
                }
            }
        }catch(err){
            res.status(500).json({message: "Yêu cầu không hợp lệ"});
        }
    }
}

module.exports = authMiddleware;
