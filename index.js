const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const session = require('express-session');
const connectDB = require("./connectDB");
const authRoute = require("./Routes/auth");
const adminRoute = require("./Routes/admin");
const userRoute = require("./Routes/user");

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 5 * 60 * 1000
    }
}
))

app.use("/v1/auth", authRoute);
app.use("/v1/admin", adminRoute);
app.use("/v1/user", userRoute);
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log("Server is running..."));
