import MovingObject from '/js/classes/MovingObject.js'
import Canvas from '/js/utility/Canvas.js'
import Vec2 from '/js/classes/Vec2.js';
import key from 'keymaster'

const {PI:pi, cos, sin} = Math
const SHIP_RADIUS_BODY = 10
const SHIP_RADIUS_HEAD = 5
export default class Ship extends MovingObject {
    constructor(args) {
        super(args)
        this.direction = -pi/2
        this.color =  '#88f'
    }
    draw() {
        Canvas.drawCircle({
            ...this.position,
            radius: SHIP_RADIUS_BODY,
            color: this.color
        });
        var headPosition = new Vec2({
            x: cos(this.direction) * SHIP_RADIUS_BODY,
            y: sin(this.direction) * SHIP_RADIUS_BODY
        })
        Canvas.drawCircle({
            ...this.position.add(headPosition),
            radius: SHIP_RADIUS_HEAD,
            color: this.color
        });
    }
    move() {
        if(key.isPressed("left")) {
            this.direction -= .1
        }
        if(key.isPressed("right")) {
            this.direction += .1
        }
    }
}