var express = require('express');
var app = express();

// Settings for CORS
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080');

    // Request methods you wish to allow
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.header('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});


app.use(express.static(__dirname + '/public'));
var server = app.listen(3000);
var io = require('socket.io').listen(server);

var allTasks = [{
    order: "First Task",
    priority: "Low",
    date: "06/02/2019",
    status: false
}];

// SOCKET.IO
io.on('connection', function(socket){
    console.log('User connected');
    socket.emit('allTasks', JSON.stringify(allTasks));

    socket.on('allTasks', function(data){
        allTasks = JSON.parse(data); 
    });





    // socket.on('nick', function(nick){
    //     console.log('a user has been named as '+ nick);
    //     socket.broadcast.emit('nickUser', nick);
    //     socket.on('chat message', function(msg){
    //         console.log(nick +': ' + msg);
    //         io.emit('chat message', {
    //         nick : nick, 
    //         msg : msg});
    //     });

    //     socket.on('disconnect', function(){
    //       console.log('user disconnected');
    //       socket.broadcast.emit('nickOff', nick);
    //     });
    // });
    socket.on('disconnect', function(){
        console.log('User disconnected');
    });
});