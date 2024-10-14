const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

let posts = [
  {
    title: "Test Post",
    content: "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing."
  }
];

let currentUserName = "";

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.set('views', path.join(__dirname, 'views'));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/html/index.html"));
});

app.get("/login", (req, res) => {
  currentUserName = req.query.name;
  const loginMethod = "GET";
  res.send(`Hello ${currentUserName}, you are using the ${loginMethod} method.`);
});

app.post("/login", (req, res) => {
  currentUserName = req.body.name;
  const loginMethod = "POST";
  res.send(`Hello ${currentUserName}, you are using the ${loginMethod} method.`);
});

app.get("/loginejs", (req, res) => {
  currentUserName = req.query.name;
  res.render("test", { name: currentUserName, security: "(GET)" });
});

app.post("/loginejs", (req, res) => {
  currentUserName = req.body.name;
  res.render("test", { name: currentUserName, security: "(POST)" });
});

app.post("/loginh", (req, res) => {
  currentUserName = req.body.name;
  res.redirect("/home");
});

app.get("/home", (req, res) => {
  if (!currentUserName) {
    return res.redirect("/");
  }
  res.render("home", { name: currentUserName, posts: posts, security: "secure (POST)" });
});

app.post("/addPost", (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.send(`<p>Title and content are mandatory. <a href="/home">Go Back</a></p>`);
  }
  posts.push({ title, content });
  res.redirect("/home");
});

app.get("/post/:id", (req, res) => {
  const post = posts[req.params.id];
  res.render("post", { post, id: req.params.id, name: currentUserName });
});

app.post("/editPost/:id", (req, res) => {
  const { title, content } = req.body;
  const postId = req.params.id;

  if (!title || !content) {
    return res.send(`<p>Both title and content are required. <a href='/post/${postId}'>Go Back</a></p>`);
  }

  posts[postId] = { title, content };
  res.redirect(`/post/${postId}`);
});

app.post("/deletePost/:id", (req, res) => {
  posts.splice(req.params.id, 1);
  res.redirect("/home");
});

app.listen(3000, () => {
  console.log("Server is up and running on port 3000");
});
