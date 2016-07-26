const express = require('express');
const server = express();

server.get('/api/teapot', (req, res, next) => {
    res.status(417);
    res.send('I am a teapot');
});

server.listen(3000, () => {
    console.log('teapot server started on port 3000');
});

module.exports = server;

