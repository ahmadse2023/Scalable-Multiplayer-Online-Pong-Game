var express = require('express');
var socket = require('socket.io');
var Game = require('./Game/Game.js');
const { promisify } = require('util');
const sleep = promisify(setTimeout);

var app = express();
server = app.listen(3000);
app.use(express.static('public'));

var io = socket(server);
var kickoff = 1;
var fsp = {};
var users = {};
var games = {}
var cur_socket = "";
var roomId = Math.floor(Math.random() * Date.now());
io.on('connection', (socket)=>{
    
    socket.join(roomId);
    if(cur_socket=="") {
        cur_socket = socket.id;
    }
    else {
        users[socket.id] = roomId;
        users[cur_socket] = roomId;
        users[roomId] = [cur_socket, socket.id];
        fsp[cur_socket] = 1;
        fsp[socket.id] = 2;
        cur_socket = "";
        games[roomId] = new Game();
        io.to(roomId).emit("startGame");
        gameLoop(roomId);
        roomId = Math.floor(Math.random() * Date.now());
    }
    
    socket.on('up', updatePos);
    socket.on('down', updatePos);
    socket.on('stop', updatePos);

    function updatePos(data) {
        if(fsp[socket.id]==1) {
            games[users[socket.id]].firstPlayer.direction = data;
        }
        else {
          games[users[socket.id]].secondPlayer.direction = data;
        }
      }

      function gameLoop(roomId) {
        const id = setInterval(() => {
          games[roomId].updateScore();
          games[roomId].firstPlayer.updatePos();
          games[roomId].secondPlayer.updatePos();
          if(games[roomId].updated) {
            io.to(roomId).emit('scoreUpdated', games[roomId].score);
            games[roomId].pointScored();
            sleep(5000).then(() => {
              io.to(roomId).emit('backToGame');
              games[roomId].ball.speedMagnitude = 8;
              games[roomId].ball.speed = {'x':kickoff*games[roomId].ball.speedMagnitude, 'y':0};
              kickoff*=-1;
            })
            
          }
          games[roomId].ball.updatePos();
          games[roomId].detectPaddleballCollision();
          games[roomId].detectPaddleballCollisionS();
          if (games[roomId].score[0]<10 && games[roomId].score[1]<10) {
            io.to(roomId).emit("gameState", {
                'paddlePosition': games[roomId].firstPlayer.position.y,
                'paddlePosition2': games[roomId].secondPlayer.position.y,
                "ballPositionX": games[roomId].ball.position.x,
                "ballPositionY": games[roomId].ball.position.y
            })
          } 
          else {
            games[roomId] = null;
            clearInterval(id);
          }
        }, 800 / 60);
      }

})

