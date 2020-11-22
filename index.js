var express = require('express')
const INDEX = '/public/index.html'
const PORT = process.env.PORT || 3000;
const server = express()
  .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
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

    socket.on('sendMessage', message => {
        io.emit('receiveMessage',message)
    })
})

let i = 0



setInterval(() => io.emit('time', ++i), 1000);


