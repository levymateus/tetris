import Node2D from "./Node2D"
import { Vector2, Vector3 } from "./Math"
import Transform2D from "./Transform2D"

/**
 * A basic GameObject with can be self status change, updated and then drawed in the scene.
 *
 * @extends Node
 * @extends Node2D
 */
export default class GameObject extends Node2D {
  private _transform: Transform2D

  constructor(position: Vector2, name?: string, rotation?: Vector3, scale?: Vector2) {
    super(name)
    this._transform = new Transform2D(
      position,
      rotation || new Vector3,
      scale || new Vector2
      )
    }

    get transform() {
      return this._transform
    }

    // eslint-disable-next-line no-unused-vars
    draw(_context: CanvasRenderingContext2D, _position: Vector2): void {
    return
  }

  /**
   * This method is fired on each frame.
   * @param delta - the timelapsed beetwen frames in milliseconds
   */
  onUpdate(delta: number): void {
    return void delta
  }
}
