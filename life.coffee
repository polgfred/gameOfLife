class Set
  constructor: -> @storage = {}

  add: (e) -> @storage[e] = e

  addAll: (es) ->
    es.each (e) =>
      @add(e)

  contains: (e) -> !!@storage[e]

  size: -> Object.keys(@storage).length

  reduce: (reducer, a) ->
    Object.keys(@storage).reduce (a, k) =>
      reducer(a, @storage[k])
    , a

  each: (iter) ->
    @reduce (_, e) -> iter(e)

  filter: (pred) ->
    @reduce (a, e) ->
      a.add(e) if pred(e)
      a
    , new Set

class Point
  neighboringOffsets: [
    [-1, -1]
  , [-1,  0]
  , [-1,  1]
  , [ 0, -1]
  , [ 0,  1]
  , [ 1, -1]
  , [ 1,  0]
  , [ 1,  1]
  ]

  constructor: (x, y) ->
    @x = x
    @y = y

  toString: -> "#{@x}:#{@y}"

  neighbors: ->
    @neighboringOffsets.reduce (neighbors, offsets) =>
      neighbors.add(new Point(@x + offsets[0], @y + offsets[1]))
      neighbors
    , new Set

  neighborCountInSet: (points) ->
    @neighbors().reduce (count, n) ->
      if points.contains(n) then count + 1 else count
    , 0

class World
  constructor: -> @pop = new Set

  add: (p) -> @pop.add(p)

  size: -> @pop.size()

  contains: (p) -> @pop.contains(p)

  nextGenTestSet: ->
    @pop.reduce (testSet, p) ->
      testSet.add(p)
      testSet.addAll(p.neighbors())
      testSet
    , new Set

  advance: ->
    @pop = @nextGenTestSet().filter (p) =>
      neighborCount = p.neighborCountInSet(@pop)
      if @contains(p)
        neighborCount == 2 or neighborCount == 3
      else
        neighborCount == 3

# exports
global = exports ? this
global.Set = Set
global.Point = Point
global.World = World
