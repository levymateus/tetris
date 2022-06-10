import { Vector2D } from './Math'
import { GameObject } from './GameObject'

export class Shape2D extends GameObject {
  public color: string

  constructor(
    position: Vector2D,
    rotation: number = 0.0,
    scale: number = 1
  ) {
    super(position, 'Shape2D', rotation, scale)
    this.color = 'black'
  }

  draw(context: CanvasRenderingContext2D): void {
    throw new Error('This method is not implemented')
  }
}

export class Square extends Shape2D {
  private _width: number = 0
  private _height: number = 0

  constructor(x: number, y: number, w: number, h: number) {
    super(new Vector2D(x, y))
    this._width = w
    this._height = h
  }

  get width() {
    return this._width
  }

  get height() {
    return this._height
  }

  draw(context: CanvasRenderingContext2D) {
    context.fillStyle = this.color
    context.fillRect(
      this.position.x,
      this.position.y,
      this._width,
      this._height
    )
  }

  onUpdate(delta: number): void {
    const centre = new Vector2D(
      this.position.x + this.width / 2,
      this.position.y + this.height / 2
    )

    this.translate(new Vector2D(0, 32 * 0.01))
    this.rotate(45 * 0.01, centre)

    if (this.position.y > 300) {
      this.position.y = 1
    }
  }
}
