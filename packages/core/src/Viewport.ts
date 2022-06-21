import Node from './Node'
import World2D from './World2D'

export default class Viewport extends Node {
  public width: number = 0
  public height: number = 0

  private world2D: World2D

  constructor(w: number, h: number) {
    super()
    this.width = w
    this.height = h
    this.world2D = new World2D(this)
  }

  getCanvas(): CanvasRenderingContext2D {
    return this.world2D.context
  }

  clear() {
    this.world2D.context.clearRect(0, 0, this.width, this.height)
  }
}
