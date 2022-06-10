import { Vector2D } from './Math'
import { Node } from './Node'

export abstract class Drawable extends Node {
  abstract translate(vec2: Vector2D): void
  abstract rotate(degress: number, centre?: Vector2D): void
  abstract draw(context: CanvasRenderingContext2D): void
}
