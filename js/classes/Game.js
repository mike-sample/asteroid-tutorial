import MovingObject from "classes/MovingObject.js"
import Canvas from "utility/Canvas.js"
import Ship from "classes/Ship.js"
import key from "keymaster"

const ASTEROID_COUNT = 10

export default class Game {
    constructor() {
        this.asteroids = []
        this.bullets = []
        this.ship = new Ship()
        this.running = false
    }
    move() {
        this.asteroids.forEach(asteroid => {
            asteroid.move()
        })
        this.bullets.forEach(bullet => {
            bullet.move()
        })
        this.ship.move()
        this.ship.wrap()
        this.ship.decayVelocity()
    }
    draw() {
        this.asteroids.forEach(asteroid => {
            asteroid.draw()
        })
        this.bullets.forEach(bullet => {
            bullet.draw()
        }) 
        this.ship.draw()
    }
    deleteOutOfBounds() {
        this.asteroids = this.asteroids.filter(asteroid => {
            return !asteroid.outOfBounds()
        })
    }
    repopulateAsteroids() {
        while(this.asteroids.length < ASTEROID_COUNT) {
            this.asteroids.push(MovingObject.onBoundsCreateRandom())
        }
    }
    checkForShipCollision() {
        this.ship.hit = this.asteroids.some(asteroid => {
            return (asteroid.isCollidedWith(this.ship))
        })
    }
    handleCollisions() {
        if (this.ship.hit) {
            this.end()
        }
    }
    start() {
        this.running = true
        key("space", () => { 
            this.bullets.push(this.ship.shoot())
        })
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
        this.repopulateAsteroids()
        this.move()
        this.deleteOutOfBounds()
        this.checkForShipCollision()
        this.handleCollisions()
        this.draw()
        requestAnimationFrame(this.tick.bind(this))
    }
}
