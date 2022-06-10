
export interface Iterator<T> {
  next(): T
  hasNext(): boolean
}

export interface Iterable<T> {
  createIterator(): Iterator<T>
}
