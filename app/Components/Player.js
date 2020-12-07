module.exports = class Player {

  constructor(playerNum){
      this.paddleHeight = 100;
      this.paddleWidth = 15;
      this.playerNum = playerNum;
      if(this.playerNum==1) {
        this.position = {"x":20,"y":600/2 - this.paddleHeight/2};
      }
      else {
        this.position = {"x":1200-20,"y":600/2 - this.paddleHeight/2};
      }
      
      this.direction = "stop";
  }

  updatePos() {

    if(this.direction=="up") 
      this.position.y = Math.max(0,this.position.y-8);

    else if(this.direction=="down") 
      this.position.y = Math.min(this.position.y+8,600-this.paddleHeight);
  }

  resetPos() {
    if(this.playerNum==1) {
      this.position = {"x":20,"y":600/2 - this.paddleHeight/2};
    }
    else {
      this.position = {"x":1200-20,"y":600/2 - this.paddleHeight/2};
    }
  }

}



