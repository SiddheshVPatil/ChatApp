const express = require('express')
const app = express()
const http = require('http')
const { Server} = require('socket.io')
const cors = require('cors')
app.use(cors())




const server = http.createServer(app);

const io = new Server(server,{
    cors:{
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
    }
})

io.on('connection',(socket)=>{
    console.log('Client connected ',socket.id)


    socket.on('join_room',(data)=>{
        socket.join(data)
        console.log(`user with id ${socket.id} connected room ${data}`)
    })

    socket.on('send_message',(data)=>{
        console.log(data)
        socket.to(data.room).emit('recieve_message',data)
    })

    socket.on('disconnect',()=>{
        console.log('Client disconnected ',socket.id)
    })
})

server.listen(3001,()=>{
    console.log('server is running on port 3001')
})