import { SceneTree } from './SceneTree'
import { Square } from './Shape'
import { Viewport } from './Viewport'

export class Engine {
  private instance?: Engine
  private sceneThree?: SceneTree

  constructor(options?: { viewport?: { width?: number; heigth?: number } }) {
    const viewport = new Viewport(
      options?.viewport?.width || 0,
      options?.viewport?.heigth || 0
    )
    this.sceneThree = new SceneTree(viewport)
  }

  getInstance() {
    if (!this.instance) {
      this.instance = new Engine()
    }
    return this.instance
  }
}
