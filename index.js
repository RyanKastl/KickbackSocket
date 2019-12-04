var app = require('express')();
var bodyParser = require('body-parser');
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res) {
  res.sendStatus(200);
});

app.post('/updateQueue', function(req, res) {
  var session = req.query.sessionid;
  io.to(session).emit('update', 'queue');
  console.log(session);
  res.sendStatus(200);
});

app.post('/updateChat', function(req, res) {
  var session = req.query.sessionid;
  io.to(session).emit('update', 'chat');
  console.log(session);
  res.sendStatus(200);
});

io.on('connection', function(socket){
  console.log('user connected');

  socket.on('join', function(room) {
    console.log("Joining Room: " + room);

    socket.join(room);
  });

  socket.on('leave', function(room) {
    console.log("Leaving Room: " + room);

    socket.leave(room);
  })

  socket.on('disconnect', function() {
    console.log('user disconnected');
  });
});

http.listen(3000, function() {
  console.log('listening on *:3000');
});