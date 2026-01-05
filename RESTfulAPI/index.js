const express = require("express");
const methodOverride = require('method-override')
const app = express();
const path = require("path");
const { v4 : uuidv4 } = require('uuid');

const port = 3000;

app.use(methodOverride('_method'));

const posts = [
    {
    id: uuidv4(),
    username: "Akash",
    content: "Elite Programmer"
    },
    {
    id: uuidv4(),   
    username: "SuperSimpleDev",
    content: "JavaScript Programmer"
    },
    {
    id: uuidv4(),
    username: "ApnaCollege",
    content: "Backend Programmer"
    }
];

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req,res) =>{
    res.send("Hello World");
});

//This renders the posts page with all the posts
app.get("/posts", (req,res) =>{
    res.render("index.ejs", {posts});
});

//This renders the form to create a new post
app.get("/posts/new", (req,res)=>{
    res.render("newPost.ejs");

});

//This handles the form submission to create a new post and redirects to /posts also adds the new post to the posts array
app.post("/posts", (req,res)=>{
    const {username, content} = req.body;
    let id = uuidv4();
    posts.push({id ,username, content});
    res.redirect("/posts");
});

//This renders a specific post based on the id passed in the url to see the post in detail
app.get("/posts/:id", (req,res)=>{
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("showPost.ejs", {post});
});

app.get("/posts/:id/edit",(req,res)=>{
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs", {post});
});

app.patch("/posts/:id",(req,res)=>{
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    let newContent = req.body.content;
    post.content = newContent;
    res.redirect("/posts");
});

app.delete("/posts/:id", (req,res) => {
    let {id} = req.params;
    let newPost = posts.filter((p) => id !== p.id);
    posts.length = 0;
    posts.push(...newPost);
    res.redirect("/posts");
});

app.use((req,res)=>{
    console.log("Request Received");
});

app.listen(port, () => {
    console.log(`Listening at port ${port}`);
});
