const express = require('express')
const http = require('http')
const fs = require('fs')
const app = express()

const port = process.env.PORT || 3000;

http.createServer(function(req, res){
  res.writeHead(200, {'Content-Type': "text/html"})
  const file = fs.createReadStream('index.html')
  file.pipe(res)
}).listen(port);

console.log("server started on port 3000");