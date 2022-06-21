import { Vector2, Vector3 } from "./Math"

export default class Transform2D {
  private _position: Vector2
  private _rotation: Vector3
  private _scale: Vector2

  constructor(position: Vector2, rotation: Vector3, scale: Vector2) {
    this._position = position
    this._rotation = rotation
    this._scale = scale
  }

  get position() {
    return this._position
  }

  get rotation() {
    return this._rotation
  }

  get scale() {
    return this._scale
  }

  translate(offset: Vector2): void {
    this._position = this.position.add(offset)
  }

  /**
   *
   * @param vec3 - A `Vector3` where x and y is the rotation center and z is the rotation degress around the z axis.
   */
  rotate(vec3: Vector3): void {
    this._rotation.x = vec3.x || this._position.x
    this._rotation.y = vec3.y || this._position.y
    this._rotation.z += vec3.z
  }
}