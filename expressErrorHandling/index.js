const express = require('express');
const ExpressError = require('./ExpressError');
const app = express();

app.get("/", (req, res) => {
    res.send("Welcome to the root page!");
});

const auth = ((req, res, next) => {
    const {token} = req.query;
    if(token === "givenaccess"){
        return next();
    }
    console.log(token);
    throw new ExpressError(401, 'Unauthorized access');
});

app.get("/home", auth, (req, res) => {
    res.send("Welcome to the home page!");
});

app.listen(5050, () =>{
    console.log('Server is running on port 5050');
});