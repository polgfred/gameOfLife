if (!Function.prototype.bind) { // ECMAScript 5
  Function.prototype.bind = function(context) {
    var self  = this
      , slice = [].slice
      , args  = slice.call(arguments, 1)

    return function() {
      return self.apply(context, args.concat(slice.call(arguments)))
    }
  }
}

function Set() {
  this.storage = {}
}

Set.prototype = {
  add: function(e) {
    this.storage[e] = e
  },

  addAll: function(es) {
    es.each(function(e) {
      this.add(e)
    }.bind(this))
  },

  contains: function(e) {
    return !!this.storage[e]
  },

  size: function() {
    return Object.keys(this.storage).length
  },

  reduce: function(reducer, a) {
    return Object.keys(this.storage).reduce(function(a, k) {
      return reducer(a, this.storage[k])
    }.bind(this), a)
  },

  each: function(iterator) {
    this.reduce(function(_, e) {
      iterator(e)
    })
  },

  filter: function(predicate) {
    return this.reduce(function(a, e) {
      if (predicate(e))
        a.add(e)
      return a
    }, new Set())
  }
}

function Point(x, y) {
  this.x = x
  this.y = y
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

Point.prototype = {
  toString: function() { // for set key
    return this.x + ':' + this.y
  },

  neighbors: function() {
    return neighboringOffsets.reduce(function(neighbors, offsets) {
      neighbors.add(new Point(this.x + offsets[0], this.y + offsets[1]))
      return neighbors
    }.bind(this), new Set())
  },

  neighborCountInSet: function(points) {
    return this.neighbors().reduce(function(count, n) {
      return points.contains(n) ? count + 1 : count
    }, 0)
  }
}

function World() {
  this.population = new Set()
}

World.prototype = {
  add: function(p) {
    this.population.add(p)
  },

  size: function() {
    return this.population.size()
  },

  contains: function(p) {
    return this.population.contains(p)
  },

  nextGenTestSet: function() {
    return this.population.reduce(function(testSet, p) {
      testSet.add(p)
      testSet.addAll(p.neighbors())
      return testSet
    }, new Set())
  },

  advance: function() {
    this.population = this.nextGenTestSet().filter(function(p) {
      var neighborCount = p.neighborCountInSet(this.population)

      return this.contains(p)
        ? neighborCount == 2 || neighborCount == 3
        : neighborCount == 3
    }.bind(this))
  }
}

if (typeof exports != 'undefined') {
  exports.Point = Point
  exports.Set   = Set
  exports.World = World
}
