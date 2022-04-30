var express = require('express');
var cors = require('cors');
var app = express();
var port = process.env.PORT || 3001;
var serv = require('http').Server(app);

const mongoose = require('mongoose');
const path = require('path');

require('dotenv').config();

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri);

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established");
});

const userRouter = require('./routes/user');

app.use('/user', userRouter);

app.get('/api', (req, res) => {
    //res.sendFile(__dirname + '/index.html');
    res.json({message: "Hello from server!"});
});

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

serv.listen(port, () => {
    console.log('Server started');
});

var SOCKET_LIST = {}
var PLAYER_LIST = {}

var Player = function(id) {
    var self = {
        x: 250,
        y: 250,
        id: id,
        number: "" + Math.floor(10 * Math.random())
    }
    return self;
}

var USERS = {
    "bob":"asd",
    "aidan": "ivy",
    "bob2":"bob",
    "bob3":"ttt",
}

let User = require('./models/user.model');

// var isValidPassword = function(data,cb) {
//     setTimeout(function() {
//         cb(USERS[data.username] === data.password);
//     },10);
// }

// var isUsernameTaken = function(data) {
//     var user = User.find({}, {username:1});
//     console.log(user);
//     // if() == data.username) && ) 
// }

// var addUser = function(data,cb) {
//     setTimeout(function() {
//         USERS[data.username] = data.password;
//         cb();
//     },10);
// }

var io = require('socket.io')(serv,{
    cors: {
        origin: "http://localhost3000",
        methods: ["GET", "POST"],
    },
});

io.on('connection', function(socket){
    socket.id = Math.random();
    SOCKET_LIST[socket.id] = socket;
    
    var player = Player(socket.id);
    PLAYER_LIST[socket.id] = player;
    console.log('Socket connection');

    socket.on('signIn', function(data) {
        User.findOne({username: data.username, password: data.password}, function(err, result) {
            if (err) return handleError(err);
            
            if(!result) {
                socket.emit('signInResponse', {success:false});
            }
            else {
                socket.emit('signInResponse', {success:true});
            }
        });
    });
      
    socket.on('signUp', function(data) {
        User.findOne({username: data.username, password: data.password}, function(err, result) {
            if (err) return handleError(err);
            console.log(result);
            if(!result) {
                const newUser = new User({username: data.username, password: data.password});
                newUser.save();
                socket.emit('signUpResponse', {success:true});
            }
            else {
                socket.emit('signUpResponse', {success:false});
            }
        });
    });


    socket.on('disconnect', function() {
        delete SOCKET_LIST[socket.id]; 
        delete PLAYER_LIST[socket.id];
    });
});

setInterval (function(){
    var pack = [];
    for(var i in PLAYER_LIST) {
        var player = PLAYER_LIST[i];
        player.x++;
        player.y++;
        pack.push({
            x: player.x,
            y: player.y,
            number: player.number
        })
    }
    for(var i in SOCKET_LIST) {
        var socket = SOCKET_LIST[i];
        socket.emit('newPosition', pack); 

    }
}, 10000/25);



