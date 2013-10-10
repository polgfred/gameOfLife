class Set
  constructor: -> @items = {}
  size: -> Object.keys(@items).length
  add: (e) -> @items[e] = e; @
  contains: (e) -> !!@items[e]
  reduce: (f, a) -> Object.keys(@items).reduce ((a, k) => f(a, @items[k])), a
  each: (f) -> @reduce ((_, e) -> f(e)); @
  filter: (pred) -> @reduce ((a, e) -> a.add e if pred e; a), new Set
  addAll: (es) -> es.each ((e) => @add e); @

class Point
  constructor: (x, y) -> @x = x; @y = y
  toString: -> "#{@x}:#{@y}"

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

  neighbors: ->
    @neighboringOffsets.reduce (neighbors, [dx, dy]) =>
      neighbors.add new Point(@x + dx, @y + dy)
    , new Set

  neighborsIn: (points) ->
    @neighbors().reduce ((count, n) -> if points.contains(n) then count + 1 else count), 0

class World
  constructor: -> @pop = new Set
  size: -> @pop.size()
  add: (p) -> @pop.add p
  contains: (p) -> @pop.contains p

  nextGenTestSet: ->
    @pop.reduce ((s, p) -> s.add p; s.addAll p.neighbors()), new Set

  advance: ->
    @pop = @nextGenTestSet().filter (p) =>
      count = p.neighborsIn @pop
      if @contains p
        count == 2 or count == 3
      else
        count == 3

# exports
global = exports ? this
global.Set = Set
global.Point = Point
global.World = World
