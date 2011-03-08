var life  = require('../life')
  , Point = life.Point
  , Set   = life.Set
  , World = life.World

describe('Point', function() {
  var p, s

  beforeEach(function() {
    p = new Point(0, 0)
    s = p.neighbors()
  })

  it('should know its neighbors', function() {
    expect(s.contains(new Point(0, 1))).toBeTruthy()
    expect(s.contains(new Point(1, 0))).toBeTruthy()
    expect(s.contains(new Point(1, 1))).toBeTruthy()
  })

  it('should not know non-neighbors', function() {
    expect(s.contains(new Point(0, 2))).toBeFalsy()
    expect(s.contains(new Point(2, 0))).toBeFalsy()
    expect(s.contains(new Point(1, 2))).toBeFalsy()
  })
})

describe('World', function() {
  var w

  beforeEach(function() {
    w = new World()
  })

  it('sets a point', function() {
    w.add(new Point(0, 0))
    expect(w.contains(new Point(0, 0))).toBeTruthy()
  })

  it('should kill a point if it has no neighbors', function() {
    w.add(new Point(0, 0))
    w.advance()
    expect(w.contains(new Point(0, 0))).toBeFalsy()
  })

  it('should maintain a block in its original position', function() {
    w.add(new Point(0, 0))
    w.add(new Point(0, 1))
    w.add(new Point(1, 0))
    w.add(new Point(1, 1))

    w.advance()
    expect(w.size()).toEqual(4)
    expect(w.contains(new Point(0, 0))).toBeTruthy()
    expect(w.contains(new Point(0, 1))).toBeTruthy()
    expect(w.contains(new Point(1, 0))).toBeTruthy()
    expect(w.contains(new Point(1, 1))).toBeTruthy()
  })

  it('should oscillate a blinker between two phases', function() {
    w.add(new Point(-1, 0))
    w.add(new Point( 0, 0))
    w.add(new Point( 1, 0))

    w.advance()
    expect(w.size()).toEqual(3)
    expect(w.contains(new Point(0, -1))).toBeTruthy()
    expect(w.contains(new Point(0,  0))).toBeTruthy()
    expect(w.contains(new Point(0,  1))).toBeTruthy()

    w.advance()
    expect(w.size()).toEqual(3)
    expect(w.contains(new Point(-1, 0))).toBeTruthy()
    expect(w.contains(new Point( 0, 0))).toBeTruthy()
    expect(w.contains(new Point( 1, 0))).toBeTruthy()
  })
})
