import Game, { Scene, Square, GameObject, Vector2, Color, Input, randomIntFromInterval } from './core'

const tiles = [
  (speed) => {
    const color = Color.random()
    const tile =  new Tile(
      new Vector2(randomIntFromInterval(0, 12) * 32, 0),
      speed,
      false,
      color
    )
    tile.appendChild(new Square(tile.position.x + 1, tile.position.y + 1, 31, 31).setColor(color.r, color.g, color.b))
    tile.appendChild(new Square(tile.position.x + 33, tile.position.y + 1, 31, 31).setColor(color.r, color.g, color.b))
    return tile
  },
  (speed) => {
    const color = Color.random()
    const tile =  new Tile(
      new Vector2(randomIntFromInterval(0, 12) * 32, 0),
      speed,
      false,
      color
    )
    tile.appendChild(new Square(tile.position.x + 1, tile.position.y + 1, 31, 31).setColor(color.r, color.g, color.b))
    return tile
  },
  (speed) => {
    const color = Color.random()
    const tile =  new Tile(
      new Vector2(randomIntFromInterval(0, 12) * 32, 0),
      speed,
      false,
      color
    )
    tile.appendChild(new Square(tile.position.x + 1, tile.position.y + 1, 31, 31).setColor(color.r, color.g, color.b))
    tile.appendChild(new Square(tile.position.x + 33, tile.position.y + 1, 30, 31).setColor(color.r, color.g, color.b))
    tile.appendChild(new Square(tile.position.x + 1, tile.position.y + 33, 31, 31).setColor(color.r, color.g, color.b))
    return tile
  }
]

class Tile extends GameObject {
  constructor(position, speed, freeze, color) {
    super('Tile', 0, 0)
    this.position = position
    this.speed = speed
    this.freeze = freeze
    this.color = color
  }

  setFreeze() {
    if (!this.freeze) {
      window.dispatchEvent(new CustomEvent('tile-freeze', {
        detail: { node: this }
      }))
    }
    this.freeze = true
  }

  canMove(direction) {
    const { width } = Game.getInstance().world
    if (direction === 'right') {
      return !this.children.some((node) => node.position.x + node.width + 32 >= width)
    }
    if (direction === 'left') {
      return !this.children.some((node) => node.position.x + node.width - 32 <= 0)
    }
  }

  onKeyDown(key) {
    if (!this.freeze && key === 'd' && this.canMove('right')) {
      this.move(32, 0)
    }
    if (!this.freeze && key === 'a' && this.canMove('left')) {
      this.move(-32, 0)
    }
  }

  onCollide() {
    this.setFreeze()
  }

  onOutOfBounds() {
    this.setFreeze()
  }

  start() {
    Game.getInstance().subs(Input.type.KEYBOARD, this)
  }

  update() {
    const world = Game.getInstance().world
    if (this.freeze) return
    if (!this.freeze && this.position.y + 32 < world.height) {
      this.move(0, 32 * this.speed.y)
    } else {
      this.setFreeze()
    }
  }

  notify(type, props) {
    switch (type) {
      case Input.type.KEYBOARD:
        return this.onKeyDown(props.key)
      case 'collide':
        return this.onCollide()
      case 'out-of-bounds':
        return this.onOutOfBounds()
      default:
        return
    }
  }
}

class Tetris {
  constructor() {
    this.speed = new Vector2(0, 0.09)

    this.game = new Game({
      title: 'Tetris',
      width: 32 * 12,
      height: 32 * 12,
    })

    const level = new Scene()
    this.game.addScene(level)

    const createTile = tiles[randomIntFromInterval(0, tiles.length - 1)]
    level.appendChild(createTile(this.speed))

    window.addEventListener('tile-freeze', () => {
      const createTile = tiles[randomIntFromInterval(0, tiles.length - 1)]

      level.appendChild(createTile(this.speed))
    })

    window.addEventListener('keydown', (evt) => {
      if (evt.key === ' ') {
        this.game.pause()
      }
    })

    return this
  }

}

new Tetris()
