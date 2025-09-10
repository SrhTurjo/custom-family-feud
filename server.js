
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require("socket.io").listen(server);
const port = Number(process.env.PORT) || 8080;
const { getLocalIP } = require('./getLocalIP');

server.listen(port, () => {
    const localIP = getLocalIP();
    console.log('Server is running:');
    console.log(`- Local:   http://localhost:${port}`);
    console.log(`- LAN:     http://${localIP}:${port}`);
});

app.use('/public', express.static('public'));
app.get('/', (req, res) => res.sendFile(__dirname + '/public/index.html'));

io.sockets.on('connection', (socket) => {
    socket.on('talking',  (data) => io.sockets.emit('listening', data));
});