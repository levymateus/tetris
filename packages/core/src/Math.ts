import { Coord } from "./type"

export class Vector2 {
  public x: number = 0
  public y: number = 0

  constructor(x?: number, y?: number) {
    this.x = x || 0
    this.y = y || 0
  }

  public set({ x, y }: Vector2 | Coord): void {
    this.x = x
    this.y = y
  }

  public add({ x, y }: Vector2 | Coord): Vector2 {
    return new Vector2(this.x + x, this.y + y)
  }

  public mult({ x, y }: Vector2 | Coord): Vector2 {
    return new Vector2(this.x * x, this.y * y)
  }

  public clone(): Vector2 {
    return new Vector2(this.x, this.y)
  }
}

export class Vector3 extends Vector2 {
  public z: number

  constructor(x?: number, y?: number, z?: number) {
    super(x, y)
    this.z = z || 0
  }

  public add({ x, y, z }: Vector3 | Coord): Vector3 {
    return new Vector3(this.x + x, this.y + y, this.z + z)
  }
}

export default class Math {
  static degressToRadian(degress: number): number {
    return (degress * window.Math.PI) / 180
  }
}
