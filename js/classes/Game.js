import MovingObject from "classes/MovingObject.js"
import Canvas from "utility/Canvas.js"
import Ship from "classes/Ship.js"

const ASTROID_COUNT = 100

export default class Game {
    constructor() {
        this.astroids = []
        this.ship = new Ship()
    }
    move() {
        this.astroids.forEach(movingObject => {
            movingObject.move()
        })
        this.ship.move()
        this.ship.wrap()
        this.ship.decayVelocity()
    }
    draw() {
        this.astroids.forEach(movingObject => {
            movingObject.draw()
        })
        this.ship.draw()
    }
    deleteOutOfBounds() {
        this.astroids = this.astroids.filter(astroid => {
            return !astroid.outOfBounds()
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
