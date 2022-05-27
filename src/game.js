import Game, { Scene, Square, GameObject, Vector2, Color, Input, randomIntFromInterval } from './core';

class Tile extends GameObject {
  constructor(position, speed, freeze, color) {
    super('Tile', 0, 0);
    this.position = position;
    this.speed = speed;
    this.freeze = freeze;
    this.color = color;
    this.appendChild(new Square(this.position.x, this.position.y, 32, 32).setColor(color.r, color.g, color.b));
  }

  setFreeze() {
    if (!this.freeze) {
      window.dispatchEvent(new CustomEvent('tile-freeze', {
        detail: { node: this }
      }))
    }
    this.freeze = true;
  }

  onKeyDown(key) {
    const world = Game.getInstance().world;
    if (!this.freeze && key === 'd' && this.position.x + 32 < world.width) {
      this.move(32, 0);
    }
    if (!this.freeze && key === 'a' && this.position.x > 0) {
      this.move(-32, 0);
    }
  }

  onCollide() {
    this.setFreeze();
  }

  start() {
    Game.getInstance().subs(Input.type.KEYBOARD, this);
  }

  update() {
    const world = Game.getInstance().world;
    if (this.freeze) return;
    if (!this.freeze && this.position.y + 32 < world.height) {
      this.move(0, 32 * this.speed.y);
    } else {
      this.setFreeze();
    }
  }

  notify(type, props) {
    switch (type) {
      case Input.type.KEYBOARD:
        return this.onKeyDown(props.key);
      case 'collide':
        return this.onCollide()
      default:
        return;
    }
  }
}

class Tetris {
  constructor() {
    this.speed = new Vector2(0, 0.075);
    this.tiles = 1;

    this.game = new Game({
      title: 'Tetris',
      width: 32 * 12,
      height: 32 * 12,
    });

    const level = new Scene();
    this.game.addScene(level);

    const tile = new Tile(
      new Vector2(randomIntFromInterval(0, 12) * 32, 0),
      this.speed,
      false,
      Color.random()
    );
    level.appendChild(tile);

    window.addEventListener('tile-freeze', (evt) => {
      if (this.tiles >= 10) {
        return this.game.stop();
      }

      const tile = new Tile(
        new Vector2(randomIntFromInterval(0, 12) * 32, 0),
        this.speed,
        false,
        Color.random()
      );

      level.appendChild(tile);
      this.tiles += 1;
    })

    window.addEventListener('keydown', (evt) => {
      if (evt.key === ' ') {
        this.game.pause();
      }
    })

    return this;
  }

  start() {
    this.game.start();
  }
}

new Tetris().start();
