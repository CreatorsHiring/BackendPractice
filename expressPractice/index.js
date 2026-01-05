const express = require('express');
const app = express();
const port = 3000;

app.listen(port, ()=>{
    console.log(`You are listening on port ${port}`);
});

app.use((req, res, next) => {
    console.log("Request Received !");
    next();
});


app.get('/', (req,res)=>{
    res.send("This is the main path");
});

app.get('/:username/:id', (req,res)=>{
    
let{username, id} = req.params;

    res.send(`Hello ${username}, your id is ${id}`);
});

app.get("/search", (req,res)=>{
    let {q} = req.query;
    if(!q){
      return res.send("<h1>Please provide a search query</h1>");
    }
    res.send(`<h1>The search result for query: ${q}</h1>`);
});