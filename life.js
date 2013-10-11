// Generated by CoffeeScript 1.6.3
(function() {
  var Point, Set, World, global,
    __hasProp = {}.hasOwnProperty;

  Set = (function() {
    function Set() {
      this.items = {};
    }

    Set.prototype.add = function(item) {
      this.items[item] = item;
      return this;
    };

    Set.prototype.contains = function(item) {
      return !!this.items[item];
    };

    Set.prototype.each = function(iterator) {
      var item, _, _ref;
      _ref = this.items;
      for (_ in _ref) {
        if (!__hasProp.call(_ref, _)) continue;
        item = _ref[_];
        iterator(item);
      }
      return this;
    };

    Set.prototype.reduce = function(reducer, memo) {
      var item, _, _ref;
      _ref = this.items;
      for (_ in _ref) {
        if (!__hasProp.call(_ref, _)) continue;
        item = _ref[_];
        memo = reducer(memo, item);
      }
      return memo;
    };

    Set.prototype.filter = function(predicate) {
      var item, set, _, _ref;
      set = new Set;
      _ref = this.items;
      for (_ in _ref) {
        if (!__hasProp.call(_ref, _)) continue;
        item = _ref[_];
        if (predicate(item)) {
          set.add(item);
        }
      }
      return set;
    };

    Set.prototype.count = function(predicate) {
      var count, item, _, _ref;
      count = 0;
      _ref = this.items;
      for (_ in _ref) {
        if (!__hasProp.call(_ref, _)) continue;
        item = _ref[_];
        if (predicate(item)) {
          count += 1;
        }
      }
      return count;
    };

    Set.prototype.size = function() {
      return this.count(function() {
        return true;
      });
    };

    Set.prototype.addAll = function(set) {
      var _this = this;
      set.each(function(item) {
        return _this.add(item);
      });
      return this;
    };

    return Set;

  })();

  Point = (function() {
    function Point(x, y) {
      this.x = x;
      this.y = y;
    }

    Point.prototype.toString = function() {
      return "" + this.x + ":" + this.y;
    };

    Point.prototype.neighbors = function() {
      var dx, dy, neighbors, _i, _len, _ref, _ref1;
      neighbors = new Set;
      _ref = this.neighboringOffsets;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        _ref1 = _ref[_i], dx = _ref1[0], dy = _ref1[1];
        neighbors.add(new Point(this.x + dx, this.y + dy));
      }
      return neighbors;
    };

    Point.prototype.neighboringOffsets = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];

    return Point;

  })();

  World = (function() {
    function World() {
      this.pop = new Set;
    }

    World.prototype.testPop = function() {
      return this.pop.reduce(function(pop, p) {
        pop.add(p);
        return pop.addAll(p.neighbors());
      }, new Set);
    };

    World.prototype.shouldLive = function(p) {
      var alive,
        _this = this;
      alive = p.neighbors().count(function(q) {
        return _this.pop.contains(q);
      });
      return alive === 3 || ((this.pop.contains(p)) && alive === 2);
    };

    World.prototype.advance = function() {
      var _this = this;
      return this.pop = this.testPop().filter(function(p) {
        return _this.shouldLive(p);
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
