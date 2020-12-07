var SquareSideLen = 6;
var net = [];
score = [0,0];
var updated = false;
var gamestarted = false;
var paddleHeight = 100;
var paddleWidth = 15;
var playerOne = {"x":20, "y": 600/2 - paddleHeight/2};
var playerTwo = {"x":1200-20, "y":600/2 - paddleHeight/2};
var ball = {"x":1200/2, "y":600/2, "radius":20, "speedMagnitude":8, "speedX":-8, "speedY": 0};
var timer = 5;
var backToWork = false;
var cur_t = 0;
var firstTime = true;
  
// socket = io.connect("https://eupong.herokuapp.com/");
// socket = io.connect("34.89.169.181:3000", {transports: ['websocket']});
socket = io.connect("localhost:3000", {transports: ['websocket']});
socket.on('gameState', updateGameState);
socket.on('startGame', beginGame);
socket.on('scoreUpdated', scoreUpdated);
socket.on('backToGame', backToGame);

function backToGame() {
  backToWork = true;
}

function updateGameState(data) {
  playerOne.y = data['paddlePosition'];
  playerTwo.y = data['paddlePosition2'];
  ball.x = data["ballPositionX"];
  ball.y = data["ballPositionY"];
}

function beginGame() {
  gamestarted = true;
}

function scoreUpdated(data) {
  score[0] = data[0];
  score[1] = data[1];
  updated = true;
}

function setup() {

  createCanvas(1200, 600);

  for (let y=10; y<height-10; y+=SquareSideLen*2) 
    net.push(createVector((width/2)-(SquareSideLen/2),y));
}

function renderBall() {
  noStroke();
  fill(150);
  circle(ball.x, ball.y, ball.radius);
}

function renderPaddles() {
noStroke();
fill(150);
rect(playerOne.x, playerOne.y, paddleWidth, paddleHeight);
rect(playerTwo.x, playerTwo.y, paddleWidth, paddleHeight);
}

function renderNet() {

  for (let i = 0; i<net.length;i++) {
    let x = net[i].x;
    let y = net[i].y;
    rect(x,y,SquareSideLen,SquareSideLen);
  }
}

function draw() {
  background(0);
  noStroke();
  fill(255);

  while(!gamestarted) {
    textAlign(CENTER, CENTER);
    textSize(50);
    text("Finding a match", width/2, height/2);
    return;
  }
  
  textAlign(CENTER, CENTER);
  textSize(100);
  text(score[0], width/3, height/4);

  textAlign(CENTER, CENTER);
  textSize(100);
  text(score[1], width - width/3, height/4);

  if(updated) {
    if(firstTime) {
      cur_t = millis();
      firstTime = false;
    }
    textAlign(CENTER, CENTER);
    textSize(100);
    text(timer, width/2, height/2);

    renderBall();
    renderPaddles(); 
    renderNet();

    if (millis()-cur_t>=1000 && timer > 0) { 
      cur_t = millis();
      timer --;
    }
    if (timer == 0 || backToWork) {
      firstTime = true;
      timer = 5;
      backToWork = false;
      updated = false;
    }
    return;
  }
  
  background(0);
  noStroke();
  fill(255);

  renderBall();
  renderPaddles(); 
  renderNet();

}

function keyPressed() {
  if(keyCode==UP_ARROW) {
    socket.emit("up", "up");
  }
  else if(keyCode==DOWN_ARROW) {
    socket.emit("down", "down");
  }
}

function keyReleased() {
  if(keyCode==UP_ARROW || keyCode==DOWN_ARROW) {
    socket.emit("stop", "stop");
  }    
}





