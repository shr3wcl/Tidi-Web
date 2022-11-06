const jwt = require('jsonwebtoken');

const authMiddleware = {
    verifyAccessToken: (req, res, next) => {
        try{
            let accessToken = req.session.token.accessToken;
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
        }catch(err){
            res.status(500).json({message: "Yêu cầu không hợp lệ"});
        }
    },

    verifyAdmin: (req, res, next) => {
        try{
            authMiddleware.verifyAccessToken(req, res, ()=>{
                if(req.user.admin === true){
                    next();
                }
                else{
                    res.status(403).json({message: "Bạn không có quyền hạn này"});
                }
            });
        }catch(err){
            res.status(500).json({message: "Yêu cầu không hợp lệ"});
        }
    },

    verifyOwner: (req, res, next) => {
        authMiddleware.verifyAccessToken(req, res, ()=>{
            if(req.user.id === req.params.id){
                next();
            }
            else{
                res.status(403).json({message: "Yêu cầu không hợp lệ"});
            }
        })
    }
}

module.exports = authMiddleware;
