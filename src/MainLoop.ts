function mainLoop() {
  window.requestAnimationFrame(mainLoop);
}

export default class MainLoop {
  constructor() {
    this.mainLoop();
  }

  protected mainLoop() {
    window.requestAnimationFrame(mainLoop);
  }
}
