import MovingObject from "classes/MovingObject.js"
import Canvas from "utility/Canvas.js"
import Vec2, { CHILL_VECTOR } from "classes/Vec2.js"
import key from "keymaster"

const {PI:pi, cos, sin} = Math
const SHIP_RADIUS_BODY = 10
const SHIP_RADIUS_HEAD = 5
const BULLET_RADIUS = 3
const BULLET_VELOCITY = new Vec2({x: 5, y: 5})

const ACCLERATION = .1
export default class Ship extends MovingObject {
    constructor(args) {
        super(args)
        this.radius = SHIP_RADIUS_BODY
        this.direction = -pi/2
        this.color =  "#88f"
    }
    draw() {
        Canvas.drawCircle({
            ...this.position,
            radius: this.radius,
            color: this.color
        })
        var headPosition = this.getHeadPosition()
        Canvas.drawCircle({
            ...this.position.add(headPosition),
            radius: SHIP_RADIUS_HEAD,
            color: this.color
        })
    }
    getHeadPosition() {
        return new Vec2({
            x: cos(this.direction) * SHIP_RADIUS_BODY,
            y: sin(this.direction) * SHIP_RADIUS_BODY
        })
    }
    move() {
        if (key.isPressed("left")) {
            this.direction -= .1
        }
        if (key.isPressed("right")) {
            this.direction += .1
        }

        this.velocity = this.velocity.add(this.acceleration)
        this.position = this.position.add(this.velocity)
    }
    shoot() {
        return new MovingObject({
            postion: this.getHeadPosition(),
            direction: this.direction,
            velocity: BULLET_VELOCITY,
            radius: BULLET_RADIUS
        })
    }
    get acceleration() {
        if (!key.isPressed("up")) { return CHILL_VECTOR }

        return new Vec2({
            x: ACCLERATION * cos(this.direction),
            y: ACCLERATION * sin(this.direction)
        })
    }
}
