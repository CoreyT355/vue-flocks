import DrawableAsset from "./drawableAsset.js";

export default class Scavenger extends DrawableAsset {
  constructor(x, y, speed = 5, size = 20, color = "#f00") {
    super(x, y, color);
    this.size = size;
    this.name = `Scavenger-${this.id}`;
    this.speed = speed;
    this.isScavenging = false;
  }
  draw(sketch) {
    super.draw(sketch);
  }
  findCorpse(deadCreatures) {
    deadCreatures.forEach(deadCreature => {
      this.destination.x = deadCreature.currentPosition.x;
      this.destination.y = deadCreature.currentPosition.y;
    });
  }
}
