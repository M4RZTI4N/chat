const express = require('express');
const {createServer} = require('http');
const {Server} = require('socket.io');
require('dotenv').config(); 
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/html/index.html');
})
app.use('/static',express.static('static'));

var nameMap = {}


io.on('connection',(socket)=>{

    socket.on('send',(data)=>{
        io.emit('receive',{
            name:nameMap[socket.id],
            message:data
        });
    });
    socket.on('login',(data)=>{
        nameMap[socket.id] = data;
    })
})

const port = process.env.PORT;
httpServer.listen(port,()=>{
    console.log(`listening on port ${port}`);
});