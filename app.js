const app = require('express')();
const server = require('http').Server(app); /* http einai tou node js , no install needed*/
const io = require('socket.io')(server);

server.listen(3000);
app.get('/', (req , res) => {
    return res.sendFile(__dirname + '/index.html');
});
io.on('connection', (socket) => {
    console.log(socket.id + ' connected');
    socket.emit('news', {
        message: 'paok ole'
    });
    socket.on('new-message', (data) => {
        io.emit('server-message', data);
    });

    socket.on('disconnect', () => {
        console.log(socket.id + ' disconnected');
    });

});
