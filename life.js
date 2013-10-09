// Generated by CoffeeScript 1.6.3
(function() {
  var Point, Set, World, global;

  Set = (function() {
    function Set() {
      this.storage = {};
    }

    Set.prototype.add = function(e) {
      return this.storage[e] = e;
    };

    Set.prototype.addAll = function(es) {
      var _this = this;
      return es.each(function(e) {
        return _this.add(e);
      });
    };

    Set.prototype.contains = function(e) {
      return !!this.storage[e];
    };

    Set.prototype.size = function() {
      return Object.keys(this.storage).length;
    };

    Set.prototype.reduce = function(reducer, a) {
      var _this = this;
      return Object.keys(this.storage).reduce(function(a, k) {
        return reducer(a, _this.storage[k]);
      }, a);
    };

    Set.prototype.each = function(iter) {
      return this.reduce(function(_, e) {
        return iter(e);
      });
    };

    Set.prototype.filter = function(pred) {
      return this.reduce(function(a, e) {
        if (pred(e)) {
          a.add(e);
        }
        return a;
      }, new Set);
    };

    return Set;

  })();

  Point = (function() {
    Point.prototype.neighboringOffsets = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];

    function Point(x, y) {
      this.x = x;
      this.y = y;
    }

    Point.prototype.toString = function() {
      return "" + this.x + ":" + this.y;
    };

    Point.prototype.neighbors = function() {
      var _this = this;
      return this.neighboringOffsets.reduce(function(neighbors, offsets) {
        neighbors.add(new Point(_this.x + offsets[0], _this.y + offsets[1]));
        return neighbors;
      }, new Set);
    };

    Point.prototype.neighborCountInSet = function(points) {
      return this.neighbors().reduce(function(count, n) {
        if (points.contains(n)) {
          return count + 1;
        } else {
          return count;
        }
      }, 0);
    };

    return Point;

  })();

  World = (function() {
    function World() {
      this.pop = new Set;
    }

    World.prototype.add = function(p) {
      return this.pop.add(p);
    };

    World.prototype.size = function() {
      return this.pop.size();
    };

    World.prototype.contains = function(p) {
      return this.pop.contains(p);
    };

    World.prototype.nextGenTestSet = function() {
      return this.pop.reduce(function(testSet, p) {
        testSet.add(p);
        testSet.addAll(p.neighbors());
        return testSet;
      }, new Set);
    };

    World.prototype.advance = function() {
      var _this = this;
      return this.pop = this.nextGenTestSet().filter(function(p) {
        var neighborCount;
        neighborCount = p.neighborCountInSet(_this.pop);
        if (_this.contains(p)) {
          return neighborCount === 2 || neighborCount === 3;
        } else {
          return neighborCount === 3;
        }
      });
    };

    return World;

  })();

  global = typeof exports !== "undefined" && exports !== null ? exports : this;

  global.Set = Set;

  global.Point = Point;

  global.World = World;

}).call(this);

/*
//@ sourceMappingURL=life.map
*/
