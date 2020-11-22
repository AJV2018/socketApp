var express = require('express')
var server = express()

server.get('/',(req,res) => {
    res.send('<h1>Welcome</h1>')
})

module.exports = server
