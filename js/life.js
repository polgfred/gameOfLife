import immutable from 'immutable';

const neighboringOffsets = immutable.Set([
  [-1, -1],
  [-1,  0],
  [-1,  1],
  [ 0, -1],
  [ 0,  1],
  [ 1, -1],
  [ 1,  0],
  [ 1,  1]
]);

export class Point extends immutable.Record({ x: 0, y: 0 }) {
  neighbors() {
    return neighboringOffsets.map(([ dx, dy ]) => new Point({ x: this.x + dx, y: this.y + dy }));
  }

  neighborCountInSet(points) {
    return this.neighbors().count(p => points.has(p));
  }
}

export class World {
  constructor() {
    this.population = immutable.Set();
  }

  add(p) {
    this.population = this.population.add(p);
  }

  advance() {
    let testSet = this.population.flatMap(p => p.neighbors().add(p));

    this.population = testSet.filter(p => {
      let neighborCount = p.neighborCountInSet(this.population);
      return this.population.has(p) ?
        neighborCount == 2 || neighborCount == 3 :
        neighborCount == 3;
    });
  }
}
