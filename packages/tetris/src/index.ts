import { run, addNode, Rect, Vector2, KinematicBody2D } from "../../core/src/index"
import { Vector3 } from "../../core/src/Math"

import "./style.css"

const DEBUG = true

class Collisor extends Rect {
  constructor(position: Vector2, w: number, h: number, visible: boolean) {
    super(position, w, h)
    this.visible = visible
  }
}

class KTile extends KinematicBody2D {
  private width: number
  private height: number
  private speed: Vector2
  private initialState: { position: Vector2 }

  constructor(
    position: Vector2,
    name: string,
    speed: Vector2,
    color: string,
    w: number,
    h: number,
    dg: number
  ) {
    const coll = new Collisor(new Vector2(), 32 + 32 + 1, h, DEBUG)

    super(position, coll, name)

    this.speed = speed
    this.initialState = {
      position: position.clone()
    }
    this.width = w
    this.height = h

    const a = new Rect(new Vector2(0, 0), this.width, this.height)
    a.color = color
    addNode(a, this)

    const b = new Rect(new Vector2(32, 0), this.width, this.height)
    b.color = color
    addNode(b, this)

    this.rotate(new Vector3(
      this.transform.position.x + this.width / 2,
      this.transform.position.y + this.height / 2,
      dg
    ))
  }

  onUpdate(): void {
    if (this.isCollide) {
      debugger
      this.transform.position.set(this.initialState.position)
    }
    this.move(this.speed)
  }
}

function game() {
  run(() => {
    const node3 = new KTile(new Vector2(0, 0), 'tile-1', new Vector2(0, 0.5), 'red', 32, 32, 0)
    addNode(node3)

    const node4 = new KTile(new Vector2(128, 0), 'tile-2', new Vector2(0.2, 0), 'green', 32, 32, 0)
    addNode(node4)
  })
}

game()
