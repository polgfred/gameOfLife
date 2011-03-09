function Set() {
  var storage = {}

  this.add = function(e) {
    storage[e] = e
  }

  this.addAll = function(es) {
    es.each(function(e) {
      this.add(e)
    }.bind(this))
  }

  this.contains = function(e) {
    return !!storage[e]
  }

  this.size = function() {
    return Object.keys(storage).length
  }

  var reduce = this.reduce = function(reducer, a) {
    return Object.keys(storage).reduce(function(a, k) {
      return reducer(a, storage[k])
    }, a)
  }

  this.each = function(iterator) {
    reduce(function(_, e) {
      iterator(e)
    })
  }

  this.filter = function(predicate) {
    return reduce(function(a, e) {
      if (predicate(e))
        a.add(e)
      return a
    }, new Set())
  }
}

var neighboringOffsets = [
    [-1, -1]
  , [-1,  0]
  , [-1,  1]
  , [ 0, -1]
  , [ 0,  1]
  , [ 1, -1]
  , [ 1,  0]
  , [ 1,  1]
]

function Point(x, y) {
  // for set key
  this.toString = function() {
    return x + ':' + y
  }

  this.neighbors = function() {
    return neighboringOffsets.reduce(function(neighbors, offsets) {
      neighbors.add(new Point(x + offsets[0], y + offsets[1]))
      return neighbors
    }, new Set())
  }

  this.neighborCountInSet = function(points) {
    return this.neighbors().reduce(function(count, n) {
      return points.contains(n) ? count + 1 : count
    }, 0)
  }
}

function World() {
  var population = new Set()

  this.population = function() {
    return population
  }

  this.add = function(p) {
    population.add(p)
  }

  this.size = function() {
    return population.size()
  }

  this.contains = function(p) {
    return population.contains(p)
  }

  function nextGenTestSet() {
    return population.reduce(function(testSet, p) {
      testSet.add(p)
      testSet.addAll(p.neighbors())
      return testSet
    }, new Set())
  }

  this.advance = function() {
    population = nextGenTestSet().filter(function(p) {
      var neighborCount = p.neighborCountInSet(population)

      return population.contains(p)
        ? neighborCount == 2 || neighborCount == 3
        : neighborCount == 3
    })
  }
}

var exports = exports || window
exports.Point = Point
exports.Set   = Set
exports.World = World
