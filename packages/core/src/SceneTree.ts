import Viewport from './Viewport'
import Tree from './Tree'
import GameObject from './GameObject'
import transform from './Transform2DSystem'
import * as Kinematic2D from './Kinematic2D'

export default class SceneTree extends Tree {
  private _pause: boolean

  constructor(viewport: Viewport) {
    super(viewport)
    this._pause = false
    this.mainLoop()
  }

  get viewport(): Viewport {
    return this.root as Viewport
  }

  togglePause() {
    this._pause = !this._pause
  }

  private update(): void {
    const it = this.createIterator()
    while (it.hasNext()) {
      const node = it.next()
      if (node instanceof GameObject) node.onUpdate(0.1)
    }
  }

  private mainLoop(): void {
    const frameRequest = () => {
      if (!this._pause) {
        this.update()
      }

      const canvas = this.viewport.getCanvas()
      transform(canvas, this.viewport, this)
      Kinematic2D.execute(this)

      window.requestAnimationFrame(frameRequest)
    }
    window.requestAnimationFrame(frameRequest)
  }
}
