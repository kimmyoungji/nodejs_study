const express = require("express");
const app = express();
let posts = [];

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {
    res.json(posts);
})

app.post("/posts",(req,res)=>{
    const {title, name, text} = req.body;

    posts.push({id: posts.length+1, title, name, text, createDt: Date()});
    res.json({title, name, text});
})

app.delete("/posts/:id", (req,res)=>{
    const id = req.params.id;
    const filteredPosts = posts.filter((post)=>post.id !== +id)
    const isLengthChanged = posts.length !== filteredPosts.length;
    if ( isLengthChanged ){
        res.json("OK");
        return;
    }
    res.json("NOT CHANGED");
})

app.listen(3000, ()=>{
    console.log("welcome posts START!");
})

// curl
// curl -X GET http://localhost:3000/
// curl -X POST -d "title=thirdpost&name=myoungji&text='farewell  express.js'" -H Content-Type:application/x-www-form-urlencoded http://localhost:3000/posts
// curl -X DELETE http://localhost:3000/posts/3
