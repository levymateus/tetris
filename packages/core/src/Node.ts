import { ID } from './ID'

export class Node {
  public id: string
  private _parent?: Node
  private _children: Node[] = []
  private _name: string = ''

  constructor(name?: string) {
    this.id = ID.get()
    this._name = name || `Node-${this.id}`
  }

  get parent() {
    return this._parent
  }

  get childen() {
    return this._children
  }

  get name() {
    return this._name
  }

  addChild(node: Node) {
    this._children.push(node)
  }
}
