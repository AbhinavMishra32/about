const express = require("express");
const session = require("express-session");
const path = require("path");
const dayjs = require("dayjs");

const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require("dotenv").config();

// app.use('/public', express.static('public'));
app.use(express.static("public"));

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const uri = process.env.API_KEY;
const PORT = process.env.PORT;

const User = require("./model/user");

async function start() {
  try {
    await mongoose.connect(uri);
    app.listen(PORT, () => {
      console.log("Connected to Mongo DB");
      console.log(`App listening at ${PORT}`);
    });
  } catch (err) {
    console.log(err.message);
  }
}

start();

app.use(
  session({
    secret: "abhinavmishrasecretkeyyoyoyo",
    resave: false,
    saveUninitialized: false,
  })
);

app.get("/", (req, res) => {
  res.sendFile("index.html", { root: "public" });
});

app.get("/register", (req, res) => {
  // res.sendFile('public/login/login.html'); //cant work since it doesnt work with relative path. needs full path
  res.sendFile(path.join(__dirname, "public/login/register-new.html"));
});

app.get("/login", (req, res) => {
  // res.sendFile('public/login/login.html'); //cant work since it doesnt work with relative path. needs full path
  res.sendFile(path.join(__dirname, "public/login/signin.html"));
});

app.get("/dashboard", (req, res) => {
  // res.sendFile(path.join(__dirname, 'public/dashboard/dashboard.html'));
  if (req.session.loggedIn) {
    res.render("dashboard", { username: req.session.username });
  } else {
    res.redirect("/login");
  }
});

app.get("/blog", (req, res) => {
  // blog edit
  if (req.session.username === "Abhinav") {
    const { title, author, body } = req.body;
    res.render("blog-edit", {
      username: req.session.username,
      title: title,
      author: author,
      body: body,
    });
  } else {
    //public blog view(ejs) or html
    //render public view blogs
    res.render("blog");
  }
});

app.post("/api/addblog", async (req, res) => {
  console.log(req.body);
  const { title, author, body } = req.body;
  const response = await Blog.create({ title, author, body });
});
//TODO: 1. add more parameters to req from client side, and remove author for admin blogs, and then try to put this into mongodb
//TODO: 2. make a search bar which searches for the blog title and author and displays the blog

app.post("/api/register", async (req, res) => {
  console.log("This credentials server got: " + JSON.stringify(req.body));
  const { username, password } = req.body;
  //creating user in database:
  try {
    const response = await User.create({ username, password });
    req.session.loggedIn = true;
    req.session.username = username;
    console.log("user created successfully! " + "User data: ", response);
    res.json({ status: "OK" });
  } catch (err) {
    if (err.code === 11000) {
      res.status(409).json({ message: "This username has already been taken" });
    } else if (username === "" || password === "") {
      res.json({ message: "Please enter the username or password" });
    } else {
      res.status(500).json({ message: "Something went wrong" });
    }
  }
});

app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username }).lean();

  if (!user) {
    return res.json({
      status: "error",
      error: "Invalid username/password",
      message: "Please enter the correct username or password.",
    });
  } else if (username === user.username && password === user.password) {
    console.log("Credentials matched");
    //check admin access
    if (username === "Abhinav") {
      console.log("Admin logged in...");
      req.session.loggedIn = true;
      req.session.username = username;
      console.log(req.session.username);
      return res.json({
        status: "OK",
        message: "Credentials matched",
        adminAcc: "true",
      });
    }
    // console.log('You can login now!')
    req.session.loggedIn = true;
    req.session.username = username;
    console.log(req.session.username);

    return res.json({ status: "OK", message: "Credentials matched" });
  }
  // res.json({status: 'Username found in database'});
});
app.post("/api/logout", async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send("Error logging out");
    }

    res.send({ status: "OK" });
  });
});

app.post("/api/percentage", (req, res) => {
  const now = dayjs();
  const targetDate = dayjs("2027-09-01");
  const startDate = dayjs("2023-10-09");
  const timeLength = targetDate.diff(startDate, "second");
  const timeFin = now.diff(startDate, "second");

  const percentage = (timeFin / timeLength) * 100;
  return res.json({ percentageTime: percentage });
});
