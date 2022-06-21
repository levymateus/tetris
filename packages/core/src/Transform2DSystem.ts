import GameObject from './GameObject'
import Viewport from './Viewport'
import Math from './Math'
import Tree from './Tree'
import Transform2D from './Transform2D'
import Shape2D from './Shape'

export function globalTransform2Dfrom(gameObject: GameObject): Transform2D {
  if (gameObject.parent && gameObject.parent instanceof GameObject) {
    const parentPosition = globalTransform2Dfrom(gameObject.parent)
    const localPosition = gameObject.transform.position
    const globalPosition = parentPosition.position.add(localPosition)

    const parentRotation = globalTransform2Dfrom(gameObject.parent)
    const localRotation = gameObject.transform.rotation
    const globalRotation = parentRotation.rotation.add(localRotation)

    return new Transform2D(
      globalPosition,
      globalRotation,
      gameObject.transform.scale
    )
  }
  return gameObject.transform
}

export default function transform(canvas: CanvasRenderingContext2D, viewport: Viewport, tree: Tree): void {
  const it = tree.createIterator()
  viewport.clear()
  while (it.hasNext()) {
    const node = it.next()
    if (node instanceof GameObject || node instanceof Shape2D) {
      const transform = globalTransform2Dfrom(node)

      // rotation
      canvas.save()
      canvas.translate(transform.rotation.x, transform.rotation.y)

      // TODO: rotacionar posicao
      canvas.rotate(Math.degressToRadian(transform.rotation.z))
      canvas.translate(-transform.rotation.x, -transform.rotation.y)

      node.draw(canvas, transform.position)
      canvas.restore()
      // end rotation
    }
  }
}
