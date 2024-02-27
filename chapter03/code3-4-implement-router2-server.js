const http = require("http");
const url = require("url");

const server = http.createServer((req,res)=>{
    res.statusCode = 200;
    const path = url.parse(req.url, true).pathname; // true는 쿼리파람도 함께 파싱할지 여부를 결정
    res.setHeader("Content-Type","text/html");
    
    if ( path === "/user" ) {
        user(req,res)
    }else if ( path === "/feed" ) {
        feed(req, res)
    }else {
        notFound(req,res)
    }
})

server.listen("3001",()=>{
    console.log("라우터를 만들어보자!")
})

const user = (req,res)=>{
    const userInfo = url.parse(req.url, true).query;
    res.end(`[user] name : ${userInfo.name}, age: ${userInfo.age}`);
}

const feed = (res,req)=>{
    res.end(`<ul>
    <li>picture1</li>
    <li>picture2</li>
    <li>picture3</li>
    </ul>`)
} 

const notFound = (req,res)=>{
    res.statusCode = 404;
    res.end("404 page not found");
}