module.exports = class Ball {
    constructor() {
        this.radius = 20;
        this.position = {'x':1200/2, 'y':600/2};
        this.speedMagnitude = 8;
        this.speed = {'x':-this.speedMagnitude, 'y':0};
    }

    updatePos() {
        this.position.x+=this.speed.x;
        this.position.y+=this.speed.y;
        if(this.position.y < this.radius || this.position.y>600-this.radius) {
            this.speed.y*=-1;
            this.speedMagnitude+=1
        }
    }

    resetPos() {
        this.position = {"x":1200/2, "y":600/2};
        this.speedMagnitude = 0;
        this.speed = {"x":0, "y":0};
    }

}