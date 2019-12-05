var app = require('express')();
var bodyParser = require('body-parser');
var http = require('http').createServer(app);
var io = require('socket.io')(http);

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res) {
  res.sendStatus(200);
});

app.post('/updateQueue', function(req, res) {
  var session = req.body.sessionid;
  io.to(session).emit('update', 'queue');
  console.log(session);
  res.sendStatus(200);
});

app.post('/updateChat', function(req, res) {
  var session = req.body.sessionid;
  io.to(session).emit('update', 'chat');
  console.log(session);
  res.sendStatus(200);
});

app.post('/updateFollowers', function(req, res) {
  var users = req.body.usernames;
  console.log(users);
  users.forEach(user => io.to(user).emit('update', 'followers'));
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

http.listen(PORT, function() {
  console.log(`listening on *:${PORT}`);
});