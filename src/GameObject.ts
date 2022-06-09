import { Drawable } from "./Drawable"
import { Vector2D } from "./Math"

export class GameObject extends Drawable {
  public centre: Vector2D
  public rotation: number
  public scale: number

  private _position: Vector2D

  constructor(position: Vector2D, name?: string, rotation?: number, scale?: number) {
    super(name)
    this._position = position
    this.rotation = rotation || 0
    this.centre = position
    this.scale = scale || 1.0
  }

  get position() {
    return this._position
  }

  protected set position(position: Vector2D) {
    this._position = position
  }

  translate(vec2: Vector2D): void {
    this.position = this.position.add(vec2)
  }

  rotate(degress: number, centre?: Vector2D) {
    this.rotation += degress
    if (centre) {
      this.centre = centre
    }
  }

  draw(context: CanvasRenderingContext2D): void {
    throw new Error("Method not implemented.")
  }

  onStart() {

  }

  onUpdate(delta: number) {

  }
}