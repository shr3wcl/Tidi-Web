const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require("./connectDB");
const authRoute = require("./Routes/auth");
const adminRoute = require("./Routes/admin");
const userRoute = require("./Routes/user");
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path');
const ejs = require("ejs");
const BlogController = require("./Controllers/BlogController");
const authMiddleware = require("./Middleware/authMiddleware");
const jwt = require('jsonwebtoken');

dotenv.config();

connectDB();

const app = express();
app.set("views", path.join(__dirname, "views"));

app.set('view engine', 'ejs');
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json({
    limit: '50mb'
}));

const dir = path.join(__dirname, 'public');
app.use(express.static(dir));

app.use(bodyParser.urlencoded({
    limit: '50mb',
    parameterLimit: 100000,
    extended: true
}));

app.get("/get/:id", (req, res) => {
    res.sendFile(__dirname + '/EditorJS/index.html');
})

app.get("/get/:id/edit", authMiddleware.verifyAccessToken, async (req, res) => {
    try {
        const user = await BlogController.getIdUserOfBlog(req.params.id);
        const userID = jwt.decode(req.headers.token.split(" ")[1]).id;
        if (user.idUser == userID) {
            res.sendFile(__dirname + '/EditorJS/index.html');
        }
        else {
            res.status(403).json({ message: "Error" });
        }
    } catch (error) {
        console.log(error);
        res.status(403).json({ message: "Error" });
    }
})

app.get("/file/:filename", (req, res) => {
    res.send()
})

app.use("/v1/auth", authRoute);
app.use("/v1/admin", adminRoute);
app.use("/v1/user", userRoute);
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log("Server is running..."));
