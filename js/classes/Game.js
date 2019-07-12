import MovingObject from "classes/MovingObject.js"
import Canvas from "utility/Canvas.js"
import Ship from "classes/Ship.js"

const ASTROID_COUNT = 10

export default class Game {
    constructor() {
        this.astroids = []
        this.ship = new Ship()
        this.running = false
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
    checkForShipCollision() {
        this.ship.hit = this.astroids.some(astroid => {
            return (astroid.isCollidedWith(this.ship))
        })
    }
    handleCollisions() {
        if (this.ship.hit) {
            this.end()
        }
    }
    start() {
        this.running = true
        this.tick()
    }
    end() {
        this.running = false
        alert("GAME OVER")
    }
    tick() {
        if (!this.running) {
            return
        }
        Canvas.clear()
        this.repopulateAstroids()
        this.move()
        this.deleteOutOfBounds()
        this.checkForShipCollision()
        this.handleCollisions()
        this.draw()
        requestAnimationFrame(this.tick.bind(this))
    }
}
