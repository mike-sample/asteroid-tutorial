import Canvas from '/js/utility/Canvas.js'

export default class MovingObject {
    constructor() {
        this.position = {x: 250, y: 250};
        this.velocity = {x: 1, y: 1};
    }
    move () {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }
    draw() {
        Canvas.drawCircle({
            ...this.position,
            radius: 20 
        });
    }
}