const {random, PI:pi, cos, sin} = Math
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