const express = require('express');
const {createServer} = require('http');
const {Server} = require('socket.io');
require('dotenv').config(); 
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

io.on('connection',(socket)=>{
    console.log(`new connection (id ${socket.id})`)
})

const port = process.env.PORT;
httpServer.listen(port,()=>{
    console.log(`listening on port ${port}`);
});