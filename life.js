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

function Point(x, y) {
	this.toString = function() { // for hash key
		return x + ':' + y
	}

  this.neighbors = function() {
    var neighbors = new Set()

    Point.neighboringOffsets.forEach(function(offsets) {
      neighbors.add(new Point(x + offsets[0], y + offsets[1]))
    })

    return neighbors
  }

  this.neighborsAndSelf = function() {
    var neighborsAndSelf = this.neighbors()
    neighborsAndSelf.add(this)
    return neighborsAndSelf
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

Point.neighboringOffsets = [
    [-1, -1]
  , [-1,  0]
  , [-1,  1]
  , [ 0, -1]
  , [ 0,  1]
  , [ 1, -1]
  , [ 1,  0]
  , [ 1,  1]
]

function World() {
	var points = new Set()

	this.add = function(p) {
		points.add(p)
	}

  this.size = function() {
    return points.size()
  }

	this.contains = function(p) {
		return points.contains(p)
	}

  function shouldLive(p) {
    var isAlive = points.contains(p)
      , neighborCount = p.neighborCountInSet(points)

    return isAlive
      ? (neighborCount == 2 || neighborCount == 3)
      : neighborCount == 3
  }

	this.advance = function() {
    var nextGen = new Set()

		points.forEach(function(p) {
      p.neighborsAndSelf().forEach(function(q) {
        if (shouldLive(q)) {
          nextGen.add(q)
        }
      })
		})

    points = nextGen
	}
}

exports.Point = Point
exports.Set   = Set
exports.World = World
