<template>
    <div>
        <vue-p5 v-on="{setup, draw}"></vue-p5>
    </div>
</template>

<script>
import VueP5 from "vue-p5";
import { Point, Rectangle, QuadTree, Circle } from "../quadtree.js";
import Hunter from "../things/hunter";
import Prey from "../things/prey";
import Scavenger from "../things/scavenger";

export default {
  components: {
    "vue-p5": VueP5
  },
  data: () => {
    return {
      creatures: []
    };
  },
  mounted() {
    for (let scavengerTotal = 0; scavengerTotal < 3; scavengerTotal++) {
      this.creatures.push(new Scavenger(20, 20, 1, 10, "#43bf35"));
    }
    for (let hunterTotal = 0; hunterTotal < 3; hunterTotal++) {
      this.creatures.push(new Hunter(20, 20, 2, 10));
    }
    for (let preyTotal = 0; preyTotal < 500; preyTotal++) {
      this.creatures.push(new Prey(750, 550, 3, 5));
    }
  },
  methods: {
    setup(sketch) {
      sketch.createCanvas(1024, 768);
      this.creatures.forEach(creature => {
        creature.draw(sketch);
      });
    },
    draw(sketch) {
      let boundary = new Rectangle(1024 / 2, 768 / 2, 1024 / 2, 768 / 2);
      var qtree = new QuadTree(boundary, 4);
      sketch.background("grey");

      this.creatures.forEach(creature => {
        if (creature.isAlive) {
          let creaturePoint = new Point(
            creature.currentPosition.x,
            creature.currentPosition.y,
            creature
          );
          qtree.insert(creaturePoint);

          let range = new Circle(
            creature.currentPosition.x,
            creature.currentPosition.y,
            creature.size * 2
          );

          let points = qtree.query(range);
          for (const other of points) {
            if (creature != other.userData) {
              let d = sketch.dist(
                creature.currentPosition.x,
                creature.currentPosition.y,
                other.userData.currentPosition.x,
                other.userData.currentPosition.y
              );
              if (
                creature.constructor.name === "Prey" &&
                other.userData.constructor.name === "Prey"
              ) {
                creature.destination.x = other.userData.destination.x;
                creature.destination.y = other.userData.destination.y;
                creature.isFlock = true;

                other.userData.isFlock = true;
              }
              if (d < creature.size / 2 + other.userData.size / 2) {
                if (
                  (creature.constructor.name === "Hunter" &&
                    other.userData.constructor.name === "Prey") ||
                  (creature.constructor.name === "Prey" &&
                    other.userData.constructor.name === "Hunter")
                ) {
                  creature.isAlive = false;
                }
                if (
                  creature.constructor.name === "Prey" &&
                  other.userData.constructor.name === "Prey"
                ) {
                  creature.currentPosition.x += 1;
                  creature.currentPosition.y += 1;
                }
              }
            }
          }
          creature.move();
        }

        creature.draw(sketch);
      });
    }
  }
};
</script>
