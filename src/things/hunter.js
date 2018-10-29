import DrawableAsset from "./drawableAsset.js";

export default class Hunter extends DrawableAsset {
  constructor(x, y, speed = 5, size = 20, color = "#f00") {
    super(x, y, color);
    this.size = size;
    this.name = `Hunter-${this.id}`;
    this.speed = speed;
    this.isHunting = false;
  }
}
