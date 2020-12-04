const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const cors = require('cors')

const port = process.env.PORT || 4000;

const router = require('./router')
const {addUser,removeUser,getUser,getUsersInRoom} = require('./users');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(cors())
app.use(router)

app.get('/test',(req,res)=>{
    console.log('test page');
})

io.on('connect', (socket) => {
    socket.on('join', ({ name, room }, callback) => {
      console.log('connection established')
      const { error, user } = addUser({ id: socket.id, name, room });

      if(error) return callback(error);
  
      socket.join(user.room);

      console.log(getUsersInRoom(room))
  
      socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}.`});
      socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });
  
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
  
      callback();
    });
  
    socket.on('sendMessage', (message, callback) => {
      const user = getUser(socket.id);
      console.log(message,user)
      io.to(user.room).emit('message', { user: user.name, text: message });
      callback();
    });

    socket.on('disconnect',()=>{
        console.log('user disconnected');
        const user = removeUser(socket.id);
        if(user){
          io.to(user.room).emit('message',{user:'admin',text:`${user.name} has disconnected`})
        }
    })
})


server.listen(port,()=>{
    console.log(`server running at port:${port}`)
})

