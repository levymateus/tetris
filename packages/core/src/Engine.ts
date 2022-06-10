import { SceneTree } from './SceneTree'
import { Square } from './Shape'
import { Viewport } from './Viewport'

export class Engine {
  private instance?: Engine

  constructor(options?: { viewport?: { width?: number; height?: number } }) {
    const viewport = new Viewport(
      options?.viewport?.width || 0,
      options?.viewport?.height || 0
    )
    new SceneTree(viewport)
  }

  getInstance() {
    if (!this.instance) {
      this.instance = new Engine()
    }
    return this.instance
  }
}
