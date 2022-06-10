import { SceneTree } from "./SceneTree"
import { Node } from "./Node"
import { ID } from "./ID"
import { Iterator } from "./Interator"

/**
 * This class implements a iterator for a deep-first-search algorithm in a tree graph.
 */
export class SceneTreeIterator implements Iterator<Node> {
  private stack: Node[]
  private discoveredNodes: Map<ID, Node>
  private currentNode: Node

  constructor(collection: SceneTree) {
    this.stack = []
    this.discoveredNodes = new Map()
    this.currentNode = collection.root

    this.stack.push(collection.root)
  }

  private isDiscovered(node: Node): boolean {
    return !!this.discoveredNodes.get(node.id)
  }

  private markDiscovered(node: Node): void {
    this.discoveredNodes.set(node.id, node)
  }

  next(): Node {
    if (this.hasNext()) {
      const node = this.stack.pop()
      if (node && !this.isDiscovered(node)) {
        this.markDiscovered(node)
        this.currentNode = node
        this.stack.push(...node.childen)
        return node
      }
    }
    return this.currentNode
  }

  hasNext(): boolean {
    return !!this.stack.length
  }
}
