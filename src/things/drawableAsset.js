export default class DrawableAsset {
  constructor(startingX, startingY, color = "#f00") {
    this.id = Math.random() * startingX * startingY;
    this.currentPosition = {
      x: this.getCoordinate(1024),
      y: this.getCoordinate(768)
    };
    this.destination = {
      x: this.getCoordinate(1024),
      y: this.getCoordinate(768)
    };
    this.color = color;
    this.isAlive = true;
  }
  draw(sketch) {
    if (this.isAlive === false) {
      this.color = "#000";
    }
    sketch.noStroke();
    sketch.fill(this.color);
    sketch.ellipse(
      this.currentPosition.x,
      this.currentPosition.y,
      this.size,
      this.size
    );
  }
  move() {
    if (
      this.checkCollision(
        this.currentPosition.x,
        this.currentPosition.y,
        this.destination.x,
        this.destination.y,
        5
      )
    ) {
      this.destination.x = this.getCoordinate(1024);
      this.destination.y = this.getCoordinate(768);
    }
    const v = [
      this.destination.x - this.currentPosition.x,
      this.destination.y - this.currentPosition.y
    ];
    // normalize the points
    const length = Math.sqrt(v[0] * v[0] + v[1] * v[1]);
    const normalized = [v[0] / length, v[1] / length];
    this.currentPosition.x += normalized[0] * this.speed;
    this.currentPosition.y += normalized[1] * this.speed;
  }
  checkCollision(x1, y1, x2, y2, distance) {
    const xDiff = x1 - x2;
    const yDiff = y1 - y2;
    return Math.sqrt(xDiff * xDiff + yDiff - yDiff) <= distance;
  }
  getCoordinate(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
}
