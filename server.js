const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');
const app = express();


//dotenv config
dotenv.config();

//mongooseDB connection
connectDB();

//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//socket.io config
const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });

  socket.on('message', (data) => {
    console.log('Message received:', data);
    io.emit('message', data); // Broadcast the message to all connected clients
  });
});

//routes
app.use('/api/v1/user',require('./routes/userRoutes'));
app.use('/api/v1/chatRoom',require('./routes/chatRoomRoutes'));

const port = process.env.PORT || 8000;
app.listen(port,(error)=>{
   if(error){
     console.log("Error is running server on port ",port);
   }
   console.log("Server is running on port ",port);
});