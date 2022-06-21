import GameObject from './GameObject'
import Engine from './Engine'
import Node from './Node'
import type { Options } from './type'
import { Rect } from './Shape'
import Math, { Vector2 } from './Math'
import KinematicBody2D from './Kinematic2D'

/**
 * This function starts the engine.
 * @param onStart - This callback is called once window load.
 * @param options - The optional option parameter.
 */
export function run(onStart: Function, options?: Options) {
  window.addEventListener('load', () => {
    new Engine(options)
    onStart()
  })
}

/**
 * Append a node in the running scene.
 * @param node - node arg.
 * @param parent - optional parent node.
 */
export function addNode(node: Node, parent?: Node) {
  const engine = Engine.getInstance()
  engine.sceneTree.addNode(node, parent)
}

/**
 * Remove a specific node from the running scene.
 * @param node - The node to remove from.
 */
export function removeNode(node: Node) {
  const engine = Engine.getInstance()
  engine.sceneTree.removeNode(node)
}

export { GameObject, Rect, Math, Vector2, KinematicBody2D }
