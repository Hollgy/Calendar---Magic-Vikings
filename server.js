const http = require('http')
const fs = require('fs')
const express = require('express')

const server = express()

server.use('/static', express.static('public'))

server.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
});

server.listen(process.env.PORT || 3000, function (error) {
    if (error) {
        console.log(error)
    }
    console.log('Server is running on port', this.address().port)
})