const express = require("express");
const app = express();
const morgan = require("morgan");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const helmet = require("helmet");
const userRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const postRouter = require("./routes/posts");
const CommentRouter = require("./routes/comments");

dotenv.config();

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log("Mongo connected");
});

//middleware

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use("/uploads", express.static("uploads"));
app.use("/socialapp/api/users", userRouter);
app.use("/socialapp/api/auth", authRouter);
app.use("/socialapp/api/post", postRouter);
app.use("/socialapp/api/post/comment", CommentRouter);

app.get("/", (req, res) => {
  res.send("i am live");
});

app.get("/user", (req, res) => {
  res.send("suer get");
});

app.listen(PORT, () => {
  console.log(`App is running on ${PORT}`);
});
