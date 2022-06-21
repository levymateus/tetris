import SceneTree from './SceneTree'
import Viewport from './Viewport'
import { Options } from './type'

export default class Engine {
  static _instance: Engine
  private _sceneTree: SceneTree

  constructor(options?: Options) {
    const viewport = new Viewport(
      options?.viewport?.width || window.innerWidth,
      options?.viewport?.height || window.innerHeight
    )

    this._sceneTree = new SceneTree(viewport)

    if (!Engine._instance) {
      Engine._instance = this
    }

    return Engine._instance
  }

  get sceneTree(): SceneTree {
    return this._sceneTree
  }

  static getInstance() {
    if (!Engine._instance) {
      Engine._instance = new Engine()
    }
    return Engine._instance
  }
}
