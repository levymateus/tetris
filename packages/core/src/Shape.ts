import GameObject from './GameObject'
import { Vector2 } from './Math'

export default class Shape2D extends GameObject {
  public color: string
  public visible: boolean

  constructor(
    position: Vector2
  ) {
    super(position, 'Shape2D')
    this.color = 'black'
    this.visible = true
  }

  // eslint-disable-next-line no-unused-vars
  draw(_context: CanvasRenderingContext2D, _position: Vector2): void {
    throw new Error('This method is not implemented')
  }
}

export class Rect extends Shape2D {
  private _width: number = 0
  private _height: number = 0

  constructor(position: Vector2, w: number, h: number) {
    super(position)
    this._width = w
    this._height = h
  }

  get width(): number {
    return this._width
  }

  get height(): number {
    return this._height
  }

  draw(context: CanvasRenderingContext2D, position: Vector2): void {
    if (this.visible) {
      context.fillStyle = this.color
      context.fillRect(
        position.x,
        position.y,
        this.width,
        this.height
      )
    }
  }
}
