import { addNode } from "./API"
import GameObject from "./GameObject"
import { Vector2, Vector3 } from "./Math"
import Shape2D, { Rect } from "./Shape"
import { globalTransform2Dfrom } from "./Transform2DSystem"
import Tree from "./Tree"

export default class KinematicBody2D extends GameObject {
  private _collisor: Shape2D
  protected _isCollide: boolean

  constructor(
    position: Vector2,
    collisor: Shape2D,
    name?: string,
  ) {
    super(position, name, new Vector3)
    this._collisor = collisor
    this._isCollide = false
    collisor.color = 'rgba(0, 66, 245, 0.6)'
    addNode(collisor, this)
  }

  get isCollide() {
    return this._isCollide
  }

  set isCollide(isCollide: boolean) {
    this._isCollide = isCollide
  }

  get collisor() {
    return this._collisor
  }

  move(offset: Vector2): void {
    this.transform.translate(offset)
  }

  rotate(vec3: Vector3): void {
    this.transform.rotate(vec3)
  }
}

function testRectRectCollision(arg1: Rect, arg2: Rect) {
  const positionA = arg1.transform.position
  const positionB = arg2.transform.position
  return positionA.x < positionB.x + arg2.width &&
    positionA.x + arg1.width > positionB.x &&
    positionA.y < positionB.y + arg2.height &&
    arg1.height + positionA.y > positionB.y
}

export function execute(tree: Tree) {
  const it = tree.createIterator()
  const prev = []
  while (it.hasNext()) {
    const node = it.next()

    prev.forEach((prevNode) => {
      if (
        node.id !== prevNode.id &&
        prevNode instanceof KinematicBody2D &&
        prevNode.collisor instanceof Rect &&
        node instanceof KinematicBody2D &&
        node.collisor instanceof Rect
      ) {
        const transformA = globalTransform2Dfrom(node.collisor)
        const transformB = globalTransform2Dfrom(prevNode.collisor)

        const rectA = new Rect(transformA.position, node.collisor.width, node.collisor.height)
        const rectB = new Rect(transformB.position, prevNode.collisor.width, node.collisor.height)

        node.isCollide = testRectRectCollision(rectA, rectB)
        prevNode.isCollide = testRectRectCollision(rectB, rectA)
      }
    })

    prev.push(node)
  }
}
