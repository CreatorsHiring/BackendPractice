const express = require('express');
const path = require('path');
const app = express();

const port = 3000;

app.set('view engine',  'ejs');

app.set('views', path.join(__dirname, 'views'));

app.listen(port, ()=>{
    console.log(`server is running at port ${port}`);
});

app.use((req, res, next) => {
    console.log("Request Received !");
    next();
});


app.get('/', (req,res)=>{
    res.render("home.ejs");
});

app.get('/about', (req,res)=>{
    res.render("about.ejs");
});

app.get("/ig/:username",(req,res)=>{
    const instaData = require('./data.json');
    const {username} = req.params;

    const data = instaData[username];
    const userFollowers = ["Akash","Ankush","Aniket","Yash","Sanket"];

    res.render("instagram.ejs",{data, userFollowers});
});