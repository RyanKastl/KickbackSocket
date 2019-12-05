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
  if (!isValidString(session)) {
    console.log("Invalid parameter sent to /updateQueue");
    res.send("/updateQueue requires a 'sessionid' string parameter.");
    return;
  }
  io.to(session).emit('update', 'queue');
  console.log(session);
  res.sendStatus(200);
});

app.post('/updateChat', function(req, res) {
  var session = req.body.sessionid;
  if (!isValidString(session)) {
    console.log("Invalid parameter sent to /updateChat");
    res.send("/updateChat requires a 'sessionid' string parameter.");
    return;
  }
  io.to(session).emit('update', 'chat');
  console.log(session);
  res.sendStatus(200);
});

app.post('/updateFollowers', function(req, res) {
  var users = req.body.usernames;
  console.log(users);
  if (!Array.isArray(users)) {
    console.log("Invalid parameter sent to /updateFollowers");

    res.send("/updateFollowers requires a 'usernames' Array<string> parameter.");
    return;
  }
  users.forEach(function(user) {
    if (isValidString(user)) {
      io.to(user).emit('update', 'followers');
    }
  }); 
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

function isValidString(str) {
  if (str === undefined || !typeof str === 'string' || !str instanceof String) {
    return false;
  }
  return true;
}