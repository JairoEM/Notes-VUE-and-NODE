var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('nick', function(nick){
      console.log('a user has been named as '+ nick);
      socket.broadcast.emit('nickUser', nick);
      socket.on('chat message', function(msg){
        console.log(nick +': ' + msg);
        io.emit('chat message', {
          nick : nick, 
          msg : msg});
      });

      socket.on('disconnect', function(){
        console.log('user disconnected');
        socket.broadcast.emit('nickOff', nick);
      });
    });
});