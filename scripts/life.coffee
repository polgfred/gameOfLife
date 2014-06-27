define [], ->
  Set: class Set
    constructor: ->
      @items = {}
    add: (item) ->
      @items[item] = item
      @
    contains: (item) ->
      !! @items[item]
    each: (iterator) ->
      iterator(item) for own _, item of @items
      @
    reduce: (reducer, memo) ->
      memo = reducer(memo, item) for own _, item of @items
      memo
    filter: (predicate) ->
      set = new Set
      set.add item for own _, item of @items when predicate item
      set
    count: (predicate) ->
      count = 0
      count += 1 for own _, item of @items when predicate item
      count
    size: ->
      @count -> true
    addAll: (set) ->
      set.each (item) => @add item
      @

  Point: class Point
    constructor: (x, y) ->
      @x = x
      @y = y
    toString: ->
      "#{@x}:#{@y}"
    neighbors: ->
      neighbors = new Set
      neighbors.add new Point @x + dx, @y + dy for [dx, dy] in @neighboringOffsets
      neighbors
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

  World: class World
    constructor: ->
      @pop = new Set
    testPop: ->
      @pop.reduce (pop, p) ->
        pop.add p
        pop.addAll p.neighbors()
      , new Set
    shouldLive: (p) ->
      alive = p.neighbors().count (q) => @pop.contains q
      alive == 3 or ((@pop.contains p) and alive == 2)
    advance: ->
      @pop = @testPop().filter (p) => @shouldLive p
