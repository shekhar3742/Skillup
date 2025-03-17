const express = require("express");
const app = express();
const jsonweb = require("jsonwebtoken");
const mongoose = require('mongoose');

const { userRouter } = require("./routes/user");
const { courseRouter } = require("./routes/course");
const { adminRouter } = require("./routes/admin");


app.use(express.json());

mongoose.connect("mongodb+srv://divyanshushekhar3742:85NG166x6copS5cI@cluster0.rjq2s.mongodb.net/Skillup")

app.use("api/v1/user", userRouter);
app.use("api/v1/course", courseRouter);
app.use("api/v1/admin", adminRouter) ; 





app.listen(3000);