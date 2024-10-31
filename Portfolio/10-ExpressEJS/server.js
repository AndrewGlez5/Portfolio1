const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const https = require("https");
const express = require("express");

app.use(express.static("assets"));
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'templates'));

let user = "";
const sampleText = 
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sollicitudin eros a metus ultricies, a varius felis gravida. Vestibulum non mi at lacus lacinia feugiat at sed elit.";

let postsList = [
  {
    heading: "Example Article",
    details: sampleText
  }
];

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/assets/html/welcome.html"));
});

app.get("/signin", (req, res) => {
  user = req.query.user;
  res.send(`Hello, ${user}. You've signed in via GET.`);
});

app.post("/signin", (req, res) => {
  user = req.body.user;
  res.send(`Hello, ${user}. You've signed in via POST.`);
});

app.get("/signin-view", (req, res) => {
  user = req.query.user;
  res.render("signin", { user, methodType: "GET" });
});

app.post("/signin-view", (req, res) => {
  user = req.body.user;
  res.render("signin", { user, methodType: "POST" });
});

app.post("/signin-dashboard", (req, res) => {
  user = req.body.user;
  res.redirect("/dashboard");
});

app.get("/dashboard", (req, res) => {
  if (!user) {
    return res.redirect("/");
  }
  res.render("dashboard", { user, postsList, methodType: "secure POST" });
});

app.post("/createArticle", (req, res) => {
  const { heading, details } = req.body;
  if (!heading || !details) {
    return res.send(`<p>Both title and content are required <a href="/dashboard">Return</a></p>`);
  }
  postsList.push({ heading, details });
  res.redirect("/dashboard");
});

app.get("/article/:index", (req, res) => {
  const article = postsList[req.params.index];
  res.render("article", { article, index: req.params.index, user });
});

app.post("/updateArticle/:index", (req, res) => {
  const { heading, details } = req.body;
  const articleIndex = req.params.index;

  if (!heading || !details) {
    return res.send(`<p>Title and content are required <a href='/article/${articleIndex}'>Return</a></p>`);
  }

  postsList[articleIndex] = { heading, details };
  res.redirect(`/article/${articleIndex}`);
});

app.post("/deleteArticle/:index", (req, res) => {
  postsList.splice(req.params.index, 1);
  res.redirect("/dashboard");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});