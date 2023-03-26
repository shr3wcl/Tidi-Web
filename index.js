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

dotenv.config();

connectDB();

const app = express();

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

app.get("/file/:filename", (req, res) => {
    res.send()
})

app.use("/v1/auth", authRoute);
app.use("/v1/admin", adminRoute);
app.use("/v1/user", userRoute);
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log("Server is running..."));
