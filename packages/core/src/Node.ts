import ID from './ID'

/**
 * A base class that implements a basic node.
 */
export default class Node {
  private _id: string
  private _parent: Node | null
  private _children: Node[] = []
  private _name: string

  constructor(name?: string) {
    this._id = ID.get()
    this._parent = null
    this._name = name || `Node-${this.id}`
  }

  get id(): string {
    return this._id
  }

  get parent(): null | Node {
    return this._parent
  }

  get childen(): Node[] {
    return this._children
  }

  get name(): string {
    return this._name
  }

  protected forEachChild(callback: (node: Node) => void): void {
    this.childen.forEach((node) => callback(node))
  }

  addChild(node: Node): void {
    node._parent = this
    this.childen.push(node)
  }

  removeChild(node: Node): void {
    const index = this.childen.findIndex(n => n.id === node.id)
    this.childen.splice(index, 1)
  }

}
