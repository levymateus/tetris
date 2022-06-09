export class ID {
  protected id: string

  constructor() {
    this.id = this.genID()
  }

  equals(id: ID) {
    return id.id === this.id
  }

  private genID(): string {
    // @ts-ignore
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
      (
        c ^
        (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
      ).toString(16)
    )
  }
}
