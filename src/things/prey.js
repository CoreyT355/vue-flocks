import DrawableAsset from "./drawableAsset.js";

export default class Prey extends DrawableAsset {
  constructor(x, y, speed = 10, size = 10, color = "#62f442") {
    super(x, y, color);
    this.size = size;
    this.name = `Prey-${this.id}`;
    this.speed = speed;
    this.isFlock = false;
  }
  draw(sketch) {
    if (this.isFlock) {
      this.color = "#42f4e2";
    }
    super.draw(sketch);
  }
}
