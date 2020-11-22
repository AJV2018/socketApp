var express = require('express')
var server = express()

server.get('/',(req,res) => {
    res.send('<h1>Welcome</h1>')
})

server.listen(3000,()=>{
    console.log('listening on 3000 port')
})
