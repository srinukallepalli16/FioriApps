const http = require('http');

const server = http.createServer((req,res)=>{
    const pathname = req.url;

    if(pathname === '/' || pathname==='/overview'){
        res.end('this is the overview');
    }
    else if(pathname=== '/product'){
        res.end('this os product');
    }    
    else{
        res.writeHead(404);
        res.end('Page not found:');
    }
    
    
    console.log("Hi Srinivas");
    res.end('hello from server');

});
server.listen(7890,'127.0.0.1',()=>{
console.log('Lisening to request on port 7890');
});