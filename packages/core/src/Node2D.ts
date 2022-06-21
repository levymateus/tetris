/* eslint-disable no-unused-vars */
import { Vector2 } from './Math'
import Node from './Node'

export default abstract class Node2D extends Node {
  /**
   * This draw method is called on each frame.
   * @param context - The canvas 2D context.
   * @param position - The global position relative with the viewport origin.
   */
  abstract draw(context: CanvasRenderingContext2D, position: Vector2): void
}
