const {random, PI:pi, cos, sin, hypot} = Math
export default class Vec2 {
    constructor({x = 0, y = 0}) {
        this.x = x
        this.y = y
    }
    add(vector) {
        return new Vec2({
            x: this.x + vector.x,
            y: this.y + vector.y,
        })
    }
    subtract(vector) {
        return new Vec2({
            x: this.x - vector.x,
            y: this.y - vector.y,
        })
    }
    scale(scalar) {
        this.x = this.x * scalar
        this.y = this.y * scalar
    }
    static distance (vector1, vector2) {
        const difference = vector1.subtract(vector2)

        return hypot(
            difference.x,
            difference.y
        )
    }
    static createRandomInRadius(radius) {
        const magnitude = random() * radius
        const angle = random() * 2 * pi
        
        return new Vec2({
            x: cos(angle) * magnitude,
            y: sin(angle) * magnitude
        })
    }
    static createRandomInRectangle({width,height}) {
        return new Vec2({
            x: random() * width,
            y: random() * height
        })
    }
}
export const CENTER = new Vec2({ x: 250, y: 250 })
export const CHILL_VECTOR = new Vec2({ x: 0, y: 0 })
