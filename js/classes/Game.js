import MovingObject from '/js/classes/MovingObject.js'
import Canvas from '/js/utility/Canvas.js'

const {random} = Math
const ASTROID_COUNT = 100

export default class Game {
    constructor() {
        this.astroids = []
    }
    move() {
        this.astroids.forEach(movingObject => {
            movingObject.move();
        })
    }
    draw() {
        this.astroids.forEach(movingObject => {
            movingObject.draw();
        })
    }
    deleteOutOfBounds() {
        this.astroids = this.astroids.filter(astroid => {
            return astroid.inBounds()
        })
    }
    repopulateAstroids() {
        while(this.astroids.length < ASTROID_COUNT) {
            this.astroids.push(MovingObject.onBoundsCreateRandom())
        }
    }
    tick() {
        Canvas.clear()
        this.repopulateAstroids()
        this.move()
        this.deleteOutOfBounds()
        this.draw()
        requestAnimationFrame(this.tick.bind(this))
    }
}