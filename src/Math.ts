export class Vector2D {
  public x: number = 0
  public y: number = 0

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }

  public add(vec2: Vector2D) {
    return new Vector2D(this.x + vec2.x, this.y + vec2.y)
  }
}

export default class Math {
  static degressToRadian(degress: number) {
    return (degress * window.Math.PI) / 180
  }
}
