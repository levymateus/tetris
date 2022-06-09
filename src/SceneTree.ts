import { GameObject } from './GameObject'
import MainLoop from './MainLoop'
import Math, { Vector2D } from './Math'
import { Viewport } from './Viewport'

function mainLoop(viewport: Viewport) {
  window.requestAnimationFrame(() => mainLoop(viewport))
}

export class SceneTree extends MainLoop {
  private root: Viewport
  private _pause: boolean = false

  constructor(viewport: Viewport) {
    super()
    this.root = viewport
  }

  set pause(pause: boolean) {
    this._pause = pause
  }

  get pause() {
    return this._pause
  }

  mainLoop() {
    window.requestAnimationFrame(() => mainLoop(this.root))
  }
}
