var socket = io();
var no = 1;
function submitfunction() {
    var from = $('#user').val();
    var message = $('#m').val();
    if (message != '') {
        socket.emit('chatMessage', from, message);
    }
    $('#m').val('').focus();
    return false;
}

function notifyTyping() {
    var user = $('#user').val();
    socket.emit('notifyUser', user);
}

socket.on('chatMessage', function (from, msg) {
    var me = $('#user').val();
    var color = (from == me) ? 'green' : '#009afd';
    var from = (from == me) ? 'Me' : from;
    $('#messages').append('<li><b style="color:' + color + '">' + from + '</b>: ' + msg + '</li>');
});

socket.on('notifyUser', function (user) {
    var me = $('#user').val();
    if (user != me) {
        $('#notifyUser').text(user + ' is typing ...');
    }
    setTimeout(function () { $('#notifyUser').text(''); }, 10000);;
});

$(document).ready(function () {
    var name = makeid();
    $('#user').val(name);
    socket.emit('chatMessage', 'SYSTEM', '<b>' + name + '</b> has joined the discussion');
});

function makeid() {
    var text = "User ";
    var possible = "234";
    text += no;
    no = no+1;

    for (var i = 0; i < 1; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}