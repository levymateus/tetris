import Node from "./Node"
import ID from "./ID"
import { Iterator } from "./Interator"

/**
 * This class implements a iterator for a deep-first-search algorithm in a tree graph.
 */
export default class TreeIterator implements Iterator<Node> {
  private _stack: Node[]
  private _discoveredNodes: Map<ID, Node>
  private _currentNode: Node

  /**
   *
   * @param root - the root node from the tree graph.
   */
  constructor(root: Node) {
    this._stack = []
    this._discoveredNodes = new Map()
    this._currentNode = root

    this._stack.push(root)
  }

  private isDiscovered(node: Node): boolean {
    return !!this._discoveredNodes.get(node.id)
  }

  private markDiscovered(node: Node): void {
    this._discoveredNodes.set(node.id, node)
  }

  next(): Node {
    if (this.hasNext()) {
      const node = this._stack.pop()
      if (node && !this.isDiscovered(node)) {
        this.markDiscovered(node)
        this._currentNode = node
        this._stack.push(...node.childen)
        return node
      }
    }
    return this._currentNode
  }

  hasNext(): boolean {
    return !!this._stack.length
  }
}
