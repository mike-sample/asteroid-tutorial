import Canvas, {canvas} from "utility/Canvas.js"
import Vec2, { CENTER, CHILL_VECTOR } from "classes/Vec2.js"
import Ship from "./Ship";
const RADIUS = 20
const MAX_SPEED = 5
const { random } = Math

export default class MovingObject {
    constructor({position = CENTER, velocity = CHILL_VECTOR} = {}) {
        this.position = position
        this.velocity = velocity
    }

    move () {
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }
    wrap() {
        const outBounds = this.outOfBounds()
        if (!outBounds) {
            return
        } else if (outBounds.direction === "east") {
            this.position.x -= (canvas.width + 2 * RADIUS)
        } else if (outBounds.direction === "west") {
            this.position.x += (canvas.width + 2 * RADIUS)
        } else if (outBounds.direction === "north") {
            this.position.y += (canvas.height + 2 * RADIUS)
        } else if (outBounds.direction === "south") {
            this.position.y -= (canvas.height + 2 * RADIUS)
        }
    }
    decayVelocity() {
        this.velocity.scale(0.99)
    }
    draw() {
        Canvas.drawCircle({
            ...this.position,
            radius: RADIUS,
            color: this.color
        })
    }
    outOfBounds() {
        if (this.position.x - RADIUS > canvas.width) {
            return {axis: "x", direction: "east"}
        } else if (this.position.x + RADIUS < 0) {
            return {axis: "x", direction: "west"}
        } else if (this.position.y + RADIUS < 0) {
            return {axis: "y", direction: "north"}
        } else if (this.position.y - RADIUS > canvas.height) {
            return {axis: "y", direction: "south"}
        } else {
            return null
        }
    }
    static createRandom() {
        const position = Vec2.createRandomInRectangle({width: 500, height: 500})
        const velocity = Vec2.createRandomInRadius(MAX_SPEED)
        return new MovingObject({position, velocity})
    }
    static onBoundsCreateRandom() {
        const movingObject = MovingObject.createRandom()

        const xOrY = random() < .5 ? "x" : "y"
        const newXorY = random() < .5 ? 0 - RADIUS : 500 + RADIUS

        movingObject.position[xOrY] = newXorY

        return movingObject
    }
}
