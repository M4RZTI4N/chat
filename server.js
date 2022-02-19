const express = require('express');
const {createServer} = require('http');
const {Server} = require('socket.io');
require('dotenv').config(); 
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

var nameMap = {}

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/html/index.html');
})
app.use('/static',express.static('static'));
io.on('connection',(socket)=>{
    socket.on('send',(data)=>{
        io.emit('receive',{
            name:nameMap[socket.id],
            message:data
        });
    });
    socket.on('login',(username)=>{
        nameMap[socket.id] = username;
    })
})

const port = process.env.PORT || 3000;
httpServer.listen(port,()=>{
    console.log(`listening on port ${port}`);
});