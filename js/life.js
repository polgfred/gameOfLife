import immutable from 'immutable';

const neighboringOffsets = immutable.List([
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
    return neighboringOffsets.reduce(
      (neighbors, [ dx, dy ]) =>
        neighbors.add(new Point({ x: this.x + dx, y: this.y + dy })),
      immutable.Set());
  }

  neighborCountInSet(points) {
    return this.neighbors().reduce(
      (count, n) => points.has(n) ? count + 1 : count, 0);
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
    let testSet = this.population.reduce(
      (testSet, p) => testSet.add(p).union(p.neighbors()),
      immutable.Set());

    this.population = testSet.filter(
      (p) => {
        let neighborCount = p.neighborCountInSet(this.population);
        return this.population.has(p) ?
          neighborCount == 2 || neighborCount == 3 :
          neighborCount == 3;
      });
  }
}
