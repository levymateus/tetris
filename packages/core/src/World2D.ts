import Viewport from './Viewport'

export default class World2D {
  private _context: CanvasRenderingContext2D
  public viewport: Viewport

  constructor(viewport: Viewport) {
    this.viewport = viewport
    const canvas = document.createElement('canvas')

    if (canvas) {
      canvas.width = viewport.width
      canvas.height = viewport.height
      document.body.appendChild(canvas)
    }

    const context = canvas.getContext('2d')

    if (context) {
      this._context = context
    } else {
      throw new Error('Cant get the canvas context')
    }

  }

  get context(): CanvasRenderingContext2D {
    return this._context
  }
}
