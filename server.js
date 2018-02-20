const express = require('express');
const bodyParser = require('body-parser');
//const expressHB require('express-handlebars');
const http = require('http');
const path = require('path');
var socketIo = require('socket.io')
var fs = require('fs');
var app = express();
var port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname,'/puplic')));
var server = http.createServer(app);
var io = socketIo(server);

io.on('connection',(socket)=>{
  socket.on('streem',(image)=>{
    socket.broadcast.emit('streem',image);
    //console.log(image);
    //var url = __dirname + '/uploads/' + Date.now()+'.mb4'
    //var stream=fs.createWriteStream(url,{encoding: 'base64'},image);
    
  })
})

app.get('/',(req,res)=>{
  res.send(`
  <h1>go to </h1><a href='/teacher.html'>teacher panel</a>
  <h1>go to </h1><a href='/teacher.html'>live streem panel (student)</a>
  
  `)
})

server.listen(port,()=>{
  console.log(` server listen on port ${port} `)
})

