function Set() {
  var storage = {}

  this.add = function(e) {
    storage[e] = e
  }

  this.contains = function(e) {
    return !!storage[e]
  }

  this.size = function() {
    return Object.keys(storage).length
  }

  this.forEach = function(iter) {
    Object.keys(storage).forEach(function(e) {
      iter(storage[e])
    })
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
    var neighbors = new Set()

    neighboringOffsets.forEach(function(offsets) {
      neighbors.add(new Point(x + offsets[0], y + offsets[1]))
    })

    return neighbors
  }

  this.neighborCountInSet = function(points) {
    var count = 0

    this.neighbors().forEach(function(n) {
      if (points.contains(n)) {
        count++
      }
    })

    return count
  }
}

function World() {
  var population = new Set()

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
    var testSet = new Set()

    population.forEach(function(p) {
      testSet.add(p)
      p.neighbors().forEach(function(n) {
        testSet.add(n)
      })
    })

    return testSet
  }

  function shouldLive(p) {
    var isAlive = population.contains(p)
      , neighborCount = p.neighborCountInSet(population)

    return isAlive
      ? (neighborCount == 2 || neighborCount == 3)
      : neighborCount == 3
  }

  this.advance = function() {
    var nextGen = new Set()

    nextGenTestSet().forEach(function(p) {
      if (shouldLive(p)) {
        nextGen.add(p)
      }
    })

    population = nextGen
  }
}

exports.Point = Point
exports.Set   = Set
exports.World = World
