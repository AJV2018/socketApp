var express = require('express')
var path = require('path')
const INDEX = '/public/index.html'
const PORT = process.env.PORT || 3000;
const server = express()
  .use(express.static(path.join(__dirname, 'public')))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

var socket = require('socket.io')
const io = socket(server)
io.on('connection',(socket) => {
    console.log('New connection established')
    io.emit('heading',new Date().toTimeString())

    socket.on('start',(socket)=>{
        console.log('Start called on server')
    })

    socket.on('salutations', (elem1, elem2, elem3) => {
        console.log(elem1, elem2, elem3);
      });

    socket.on('sendMessage', data => {
        io.emit('receiveMessage',data)
    })
})

setInterval(() => io.emit('time', new Date().toLocaleString()), 1000);


