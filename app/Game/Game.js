var Ball = require("../Components/Ball.js");
var Player = require("../Components/Player.js");

module.exports = class Game {
    constructor() {
        this.firstPlayer = new Player(1);
        this.secondPlayer = new Player(2);
        this.ball = new Ball();
        this.score = [0,0];
        this.updated = false;
    }

    pointScored() {
      this.ball.resetPos();
      this.firstPlayer.resetPos();
      this.secondPlayer.resetPos();
      this.updated = false;
    }

    updateScore() {

        if(this.ball.position.x<0) {
          this.score[1]+=1;
          this.updated = true;
        }
        else if(this.ball.position.x>1200) {
          this.score[0]+=1;
          this.updated = true;
        }

      }
    
    detectPaddleballCollision() {
        if(this.ball.position.x<=this.firstPlayer.paddleWidth+this.ball.radius && this.ball.position.x>0) {
        
          if (this.ball.position.y>=this.firstPlayer.position.y) {
            if (this.ball.position.y <= this.firstPlayer.position.y+(0.3*this.firstPlayer.paddleHeight)) {
              this.ball.speed.x = this.ball.speedMagnitude*Math.cos(-60*Math.PI/180);
              this.ball.speed.y = -this.ball.speedMagnitude*Math.sin(-60*Math.PI/180);
            }
            else if (this.ball.position.y <= this.firstPlayer.position.y+(0.45*this.firstPlayer.paddleHeight)) {
              this.ball.speed.x = this.ball.speedMagnitude*Math.cos(-30*Math.PI/180);
              this.ball.speed.y = -this.ball.speedMagnitude*Math.sin(-30*Math.PI/180);
            }
            else if (this.ball.position.y <= this.firstPlayer.position.y+(0.5*this.firstPlayer.paddleHeight)) {
              this.ball.speed.x = this.ball.speedMagnitude*Math.cos(-10*Math.PI/180);
              this.ball.speed.y = -this.ball.speedMagnitude*Math.sin(-10*Math.PI/180);
            }
            else if (this.ball.position.y <= this.firstPlayer.position.y+(0.55*this.firstPlayer.paddleHeight)) {
              this.ball.speed.x = this.ball.speedMagnitude*Math.cos(10*Math.PI/180);
              this.ball.speed.y = -this.ball.speedMagnitude*Math.sin(10*Math.PI/180);
            }
            
            else if (this.ball.position.y <= this.firstPlayer.position.y+(0.7*this.firstPlayer.paddleHeight)) {
              this.ball.speed.x = this.ball.speedMagnitude*Math.cos(30*Math.PI/180);
              this.ball.speed.y = -this.ball.speedMagnitude*Math.sin(30*Math.PI/180);
            }
            else if (this.ball.position.y <= this.firstPlayer.position.y+(this.firstPlayer.paddleHeight)) {
              this.ball.speed.x = this.ball.speedMagnitude*Math.cos(60*Math.PI/180);
              this.ball.speed.y = -this.ball.speedMagnitude*Math.sin(60*Math.PI/180);
            }
          }
        }
      }
      
    detectPaddleballCollisionS() {
        if(this.ball.position.x>1200-this.secondPlayer.paddleWidth-this.ball.radius && this.ball.position.x<1200) {
        
          if (this.ball.position.y>=this.secondPlayer.position.y) {
            if (this.ball.position.y <= this.secondPlayer.position.y+(0.3*this.secondPlayer.paddleHeight)) {
              this.ball.speed.x = -this.ball.speedMagnitude*Math.cos(-60*Math.PI/180);
              this.ball.speed.y = -this.ball.speedMagnitude*Math.sin(-60*Math.PI/180);
            }
            else if (this.ball.position.y <= this.secondPlayer.position.y+(0.45*this.secondPlayer.paddleHeight)) {
              this.ball.speed.x = -this.ball.speedMagnitude*Math.cos(-30*Math.PI/180);
              this.ball.speed.y = -this.ball.speedMagnitude*Math.sin(-30*Math.PI/180);
            }
            else if (this.ball.position.y <= this.secondPlayer.position.y+(0.5*this.secondPlayer.paddleHeight)) {
              this.ball.speed.x = -this.ball.speedMagnitude*Math.cos(-10*Math.PI/180);
              this.ball.speed.y = -this.ball.speedMagnitude*Math.sin(-10*Math.PI/180);
            }
            else if (this.ball.position.y <= this.secondPlayer.position.y+(0.55*this.secondPlayer.paddleHeight)) {
              this.ball.speed.x = -this.ball.speedMagnitude*Math.cos(10*Math.PI/180);
              this.ball.speed.y = -this.ball.speedMagnitude*Math.sin(10*Math.PI/180);
            }
            else if (this.ball.position.y <= this.secondPlayer.position.y+(0.7*this.secondPlayer.paddleHeight)) {
              this.ball.speed.x = -this.ball.speedMagnitude*Math.cos(30*Math.PI/180);
              this.ball.speed.y = -this.ball.speedMagnitude*Math.sin(30*Math.PI/180);
            }
            else if (this.ball.position.y <= this.secondPlayer.position.y+(this.secondPlayer.paddleHeight)) {
              this.ball.speed.x = -this.ball.speedMagnitude*Math.cos(60*Math.PI/180);
              this.ball.speed.y = -this.ball.speedMagnitude*Math.sin(60*Math.PI/180);
            }
          }
        }
      }
}