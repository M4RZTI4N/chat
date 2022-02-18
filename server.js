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
io.on('connection',(socket)=>{
    console.log(`new connection (id ${socket.id})`);
    socket.on('send',(data)=>{
        console.log(`new message from socket ${socket.id}: ${data}`);
    });
})

const port = process.env.PORT;
httpServer.listen(port,()=>{
    console.log(`listening on port ${port}`);
});