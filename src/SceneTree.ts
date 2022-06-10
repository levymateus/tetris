import { Viewport } from './Viewport'
import { SceneTreeIterator } from './SceneTreeIterator'
import { Iterable, Iterator } from './Interator'
import { Node } from './Node'
import { GameObject } from './GameObject'
import Math from './Math'

function mainLoop(sceneTree: SceneTree) {
  const it = sceneTree.createIterator()
  const viewport = sceneTree.root
  const canvas = viewport.getCanvas()

  viewport.clear()

  while (it.hasNext()) {
    const node = it.next()
    if (node instanceof GameObject) {
      node.onUpdate(0.1)

      // rotation
      canvas.save()

      canvas.translate(node.centre.x, node.centre.y)
      canvas.rotate(Math.degressToRadian(node.rotation))
      canvas.translate(-node.centre.x, -node.centre.y)

      node.draw(canvas)

      canvas.restore()
      // end rotation
    }
  }

  window.requestAnimationFrame(() => mainLoop(sceneTree))
}

export class SceneTree implements Iterable<Node> {
  private _root: Viewport
  private _pause: boolean = false

  constructor(viewport: Viewport) {
    this._root = viewport
    window.requestAnimationFrame(() => mainLoop(this))
  }

  createIterator(): Iterator<Node> {
    return new SceneTreeIterator(this)
  }

  set pause(pause: boolean) {
    this._pause = pause
  }

  get pause() {
    return this._pause
  }

  get root() {
    return this._root
  }
}
