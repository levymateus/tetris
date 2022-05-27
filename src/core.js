const PAINT_RATE = 60; // Paints per second

function uuidv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
}

function randomIntFromInterval(min, max) { // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min)
}

let windowIsLoaded = false;

class Node {
  constructor() {
    this.id = uuidv4();
    this.parent = null;
    this.children = [];
  }

  start() {
    return;
  }

  beforeUpdate() {
    return;
  }

  update() {
    return;
  }

  appendChild(child) {
    child.parent = this;
    this.children.push(child);
    const game = Game.getInstance();
    if (game?.world?.scene) {
      return game.world.scene.appendChild(child);
    } else {
      console.error('Add World Scene Before appendChild()');
      return null;
    }
  }
}

class Collider {
  constructor() {

  }

  test(gameObject) {
    const nodes = Game.getInstance()?.world?.scene.children;

    function testSquares(left, right) {
      return left.position.x < right.position.x + right.width &&
        left.position.x + left.width > right.position.x &&
        left.position.y < right.position.y + right.height &&
        left.height + left.position.y > right.position.y
    }

    const colliders = nodes.filter((node) => gameObject.id !== node.id && gameObject instanceof Square && node instanceof Square && testSquares(gameObject, node))

    return colliders
  }

}

class GameObject extends Node {
  constructor(name, x, y) {
    super();
    this.name = name;
    this.position = new Vector2(x, y);
    this.rotation = new Vector2(0, 0);
    this._visible = true;
  }

  set visible(value) {
    this._visible = value;
    this.children.forEach((node) => {
      node.visible = value;
    });
  }

  get visible() {
    return this._visible;
  }

  notify(type, props) {
    if (this.parent) {
      this.parent.notify(type, props);
    }
    this.children.forEach((node) => node.notify(type, props));
    return;
  }

  paint() {
    return;
  }

  move(x, y) {
    this.position.add(x, y);
    this.children.forEach((node) => node.position.add(x, y));
  }

  destroy() {
    return;
  }
}

class Shape extends GameObject {
  constructor(name, x, y) {
    super(name, x, y);
    this.collider = null;
  }

  paint() {
    throw new Error('This method is no implemented!');
  }

  accept(collider) {
    if (collider instanceof Collider) {
      this.collider = collider;
    } else {
      throw new TypeError('accept() receive a wrong type');
    }
  }
}

class Observer {
  constructor() {
    this.listeners = new Map();
  }

  subs(type, listener) {
    const byType = this.listeners.get(type);
    if (byType) {
      byType.push(listener);
    } else {
      this.listeners.set(type, [listener]);
    }
  }

  notifyAll(event) {
    this.listeners.keys().forEach((type) => {
      this.notifyBy(type, event);
    });
  }

  notifyBy(type, event) {
    if (this.listeners.get(type)) {
      this.listeners.get(type).forEach((listener) => {
        listener.notify(type, event);
      });
    }
  }
}

/**
 * Handle window keyboard and mouse events.
 */
class Input extends Observer {
  static type = {
    KEYBOARD: 'keyboard',
  }

  constructor() {
    super();
    window.addEventListener('keydown', (evt) => {
      this.notifyBy(Input.type.KEYBOARD, evt);
    });
  }
}

class Vector2 {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  add(x, y) {
    this.x += x;
    this.y += y;
    return this;
  }

  sub(x, y) {
    this.x -= x;
    this.y -= y;
    return this;
  }
}

class Color {
  constructor(r, g, b) {
    this.r = r;
    this.g = g;
    this.b = b;
  }

  static random() {
    return new Color(
      randomIntFromInterval(0, 255),
      randomIntFromInterval(0, 255),
      randomIntFromInterval(0, 255)
    )
  }

  set(r, g, b) {
    this.r = r;
    this.g = g;
    this.b = b;
    return this;
  }

  add(r, g, b) {
    this.r += this.r + r <= 255 || this.r >= 0 ? r : 0;
    this.g += this.g + g <= 255 || this.g >= 0 ? g : 0;
    this.b += this.b + b <= 255 || this.b >= 0 ? b : 0;
    return this;
  }

  toString() {
    const str = `rgb(${this.r}, ${this.g}, ${this.b})`;
    return str;
  }
}

class Square extends Shape {
  constructor(x, y, width, height) {
    super('Square', x, y);
    this.width = width;
    this.height = height;
    this.color = new Color(0, 0, 0);
    this.accept(new Collider())
  }

  beforeUpdate() {
    if (this.collider) {
      const colliders = this.collider.test(this);
      if (colliders.length) {
        colliders.forEach((collisor) => this.notify('collide', { collisor }))
      }
    }
  }

  paint() {
    const game = Game.getInstance();
    game.context.fillStyle = this.color.toString();
    game.context.fillRect(
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }

  setColor(r, g, b) {
    this.color.set(r, g, b);
    return this;
  }

  move(x, y) {
    this.position.add(x, y);
  }
}

class World extends Node {
  constructor(width, height) {
    super(0, 0);
    this.width = width;
    this.height = height;
    this.scene = null;
  }

  addScene(scene) {
    this.scene = scene;
  }

  update() {
    if (this.scene) {
      this.scene.update();
    }
  }

  paint() {
    if (this.scene) {
      this.scene.paint();
    }
  }
}

/**
 * Manage the nodes in the scene.
 */
class Scene extends Node {
  constructor() {
    super(0, 0);
  }

  appendChild(node) {
    node.start();
    this.children.push(node);
    return node;
  }

  update() {
    const world = Game.getInstance().world;
    this.children.forEach((node) => {
      if (
        node instanceof GameObject &&
        node.position.y <= world.height &&
        node.position.x <= world.width
      ) {
        node.beforeUpdate();
        node.update();
      }
    });
  }

  paint() {
    this.children.forEach((node) => {
      if (node instanceof GameObject && node.visible) {
        node.paint();
      }
    });
  }
}

/**
 * Manage the world, input, context, window.
 */
class Game extends Input {
  constructor({ title, width, height }) {
    super();
    this.running = false;
    this.context = null;
    this.world = new World(width, height);

    this.setTitle(title);

    if (!Game._instance) {
      Game._instance = this;
    }

    return Game._instance;
  }

  static getInstance() {
    return this._instance;
  }

  setTitle(title) {
    this.title = title;
    document.title = title;
  }

  /**
   * The game loop updates and paint the nodes.
   */
  static loop({ context }) {
    const game = Game.getInstance();

    if (game) {
      game.context = context;
    }

    if (game && game.running) {
      game.update();
      game.paint();
    }
  }

  start() {
    this.running = true;

    let canvas = document.getElementById('canvas');
    if (!canvas) {
      canvas = document.createElement('canvas');
      canvas.id = 'canvas';
    }

    if (windowIsLoaded) {
      console.log('%c width: %d, height: %d', 'color: blue', this.world.width, this.world.height);

      if (canvas) {
        canvas.style = `
          background-color: black;
          border: 4px solid rgb(0, 0, 200);
          box-sizing: border-box;
        `;
        canvas.width = this.world.width;
        canvas.height = this.world.height;
      }

      const context = canvas.getContext('2d');
      document.getElementById('root').appendChild(canvas);

      Game.loop({ context });
      window.setInterval(function () {
        Game.loop({ context });
      }, 1000 / PAINT_RATE);
    }
  }

  stop() {
    this.running = false;
  }

  pause() {
    this.running = !this.running;
  }

  addScene(scene) {
    this.world.addScene(scene);
    scene.parent = this;
  }

  clear() {
    this.context.clearRect(0, 0, this.world.width, this.world.height);
  }

  update() {
    if (this.world) {
      this.world.update();
    }
  }

  paint() {
    if (this.world) {
      this.clear();
      this.world.paint();
    }
  }

}

function load() {
  windowIsLoaded = true;
  const game = Game.getInstance();
  if (game) {
    game.start();
  }
}

window.addEventListener('load', load);

export { Scene, Node, Square, Observer, Input, GameObject, Vector2, Collider, Color, randomIntFromInterval };
export default Game;
