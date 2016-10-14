var path = require('path');

var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var socketio = require('socket.io');
var pug = require('pug');
var morgan = require('morgan');

var authRouter = require('./routes/auth');
var chatRouter = require('./routes/chat');

var authenticate = require('./middleware/authenticate');

var app = express();
var httpServer = http.Server(app);
var io = socketio(httpServer);

var port = 8080;

// template engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// App-Config
//app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(session({
  secret: "zumgu",
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules')));

// Router
app.use('/auth/', authRouter);
app.use(authenticate)
app.use('/chat/', chatRouter);

require('./config/passport')(passport);

io.on('connect', function (socket) {
  console.log('Socket is connected : ', socket.id);
  io.emit('data', 'welcome');

  socket.on('enter', function(username) {
    io.emit('enter', username + ' 님이 들어오셨습니다.');
  });

  socket.on('chat', function(data) {
    // var username = data.username;
    // var msg = data. msg;
    io.emit('chat', data);
  });

  socket.on('disconnect', function (username) {
    io.emit('disconnect', username + ' 님이 나가셨습니다.');
  })
});

httpServer.listen(port, function () {
  console.log('Server is running on ' + port);
});
