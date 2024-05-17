// external imports
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");

// internal imports
const {
  notFoundHandle,
  errorHandle,
} = require("./middleware/common/erorrHandle");

const indexRouter = require("./router/indexRouter");
const loginRouter = require("./router/loginRouter");
const signupRouter = require("./router/signupRouter");
const usersRouter = require("./router/usersRouter");
const postRouter = require("./router/postRouter");

// configure
const app = express();
dotenv.config();

// parse cookies
app.use(cookieParser(process.env.COOKIE_SECRET));

// request parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Database Connected");
  })
  .catch((err) => {
    console.log(err);
  });

// allow public access
app.use(express.static(path.join(__dirname, "public")));

// view engine ejs
app.set("view engine", "ejs");

// routing
app.use("/", indexRouter);
app.use("/login", loginRouter);
app.use("/signup", signupRouter);
app.use("/users", usersRouter);
app.use("/post", postRouter);

// 404 not found
app.use(notFoundHandle);

// error handle
app.use(errorHandle);

// creating server
app.listen(process.env.PORT, () => {
  console.log("http://localhost:" + process.env.PORT);
});
