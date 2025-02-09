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
// Serve static files from the React build directory
app.use(express.static(path.join(__dirname, '../client/dist')));

// Serve the React app for all other routes (for client-side routing)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

// Start the server
const port = 5000; // Use environment variable for port or default to 5000
app.listen(port) // Use template literal for cleaner logging