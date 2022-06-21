import TreeIterator from './TreeIterator'
import Node from './Node'
import { Iterable, Iterator } from './Interator'

/**
 * A Tree graph base class.
 */
export default class Tree implements Iterable<Node> {
  private _root: Node

  constructor(root: Node) {
    this._root = root
  }

  get root(): Node {
    return this._root
  }

  createIterator(): Iterator<Node> {
    return new TreeIterator(this.root)
  }

  addNode(node: Node, parent?: Node): void {
    if (parent) {
      parent.addChild(node)
    } else {
      this.root.addChild(node)
    }
  }

  removeNode(node: Node): void {
    if (node.parent) {
      node.parent.removeChild(node)
    } else {
      this.root.removeChild(node)
    }
  }
}
