import Canvas, {canvas} from "utility/Canvas.js"
import Vec2, { CENTER, CHILL_VECTOR } from "classes/Vec2.js"
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
    draw() {
        Canvas.drawCircle({
            ...this.position,
            radius: RADIUS,
            color: this.color
        })
    }
    inBounds() {
        return (
            this.position.x - RADIUS < canvas.width &&
            this.position.x + RADIUS > 0 &&
            this.position.y + RADIUS > 0 &&
            this.position.y - RADIUS < canvas.height
        )
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