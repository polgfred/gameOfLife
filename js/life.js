export class Set {
  constructor() {
    this.storage = {};
  }

  add(e) {
    this.storage[e] = e;
  }

  addAll(es) {
    es.each((e) => this.add(e));
  }

  contains(e) {
    return !!this.storage[e];
  }

  size() {
    return Object.keys(this.storage).length;
  }

  reduce(reducer, a) {
    return Object.keys(this.storage).reduce((a, k) => reducer(a, this.storage[k]), a);
  }

  each(iterator) {
    this.reduce((_, e) => iterator(e));
  }

  filter(predicate) {
    return this.reduce((a, e) => {
      if (predicate(e))
        a.add(e);
      return a;
    }, new Set);
  }
}

var neighboringOffsets = [
  [-1, -1],
  [-1,  0],
  [-1,  1],
  [ 0, -1],
  [ 0,  1],
  [ 1, -1],
  [ 1,  0],
  [ 1,  1]
];

export class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return this.x + ':' + this.y;
  }

  neighbors() {
    return neighboringOffsets.reduce((neighbors, offsets) => {
      neighbors.add(new Point(this.x + offsets[0], this.y + offsets[1]));
      return neighbors;
    }, new Set);
  }

  neighborCountInSet(points) {
    return this.neighbors().reduce((count, n) => points.contains(n) ? count + 1 : count, 0);
  }
}

export class World {
  constructor() {
    this.population = new Set;
  }

  nextGenTestSet() {
    return this.population.reduce((testSet, p) => {
      testSet.add(p);
      testSet.addAll(p.neighbors());
      return testSet;
    }, new Set);
  }

  advance() {
    this.population = this.nextGenTestSet().filter((p) => {
      var neighborCount = p.neighborCountInSet(this.population);

      return this.population.contains(p) ?
        neighborCount == 2 || neighborCount == 3 :
        neighborCount == 3;
    });
  }
}
