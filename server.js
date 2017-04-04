var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var user = 1;
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
   io.emit('chat message', 'User Joined!');
    socket.on('disconnect', function () {
        io.emit('chat message', 'User Disconnected!');
    });
});

io.on('connection', function (socket) {
    socket.on('chat message', function (msg) {
        console.log('message: ' + msg);
    });
});

io.on('connection', function(socket){
    socket.on('chat message', function(msg){
        io.emit('chat message', msg);
    }) ;
});

http.listen(3000, function () {
    console.log("Magic is happening on port: 3000");
})