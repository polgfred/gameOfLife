/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _lifeui = __webpack_require__(1);
	
	var _lifeui2 = _interopRequireDefault(_lifeui);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	document.addEventListener('DOMContentLoaded', function () {
	  _lifeui2.default.buildBoard('world').buildWorld([[0, 1], [1, 1], [-1, 0], [0, 0], [0, -1]]).loopForever(200);
	}, false);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	var _life = __webpack_require__(2);
	
	var board = void 0;
	var world = void 0;
	
	exports.default = {
	  buildBoard: function buildBoard(id) {
	    board = {};
	
	    var element = document.getElementById(id);
	
	    for (var y = 50; y >= -50; y--) {
	      var row = document.createElement('tr');
	      element.appendChild(row);
	
	      for (var x = -50; x <= 50; x++) {
	        var col = document.createElement('td');
	        row.appendChild(col);
	        var div = document.createElement('div');
	        col.appendChild(div);
	        board[new _life.Point(x, y)] = div;
	      }
	    }
	
	    return this;
	  },
	  buildWorld: function buildWorld(coords) {
	    world = new _life.World();
	
	    coords.forEach(function (_ref) {
	      var _ref2 = _slicedToArray(_ref, 2);
	
	      var x = _ref2[0];
	      var y = _ref2[1];
	
	      world.population.add(new _life.Point(x, y));
	    });
	
	    return this;
	  },
	  showPopulation: function showPopulation() {
	    world.population.each(function (p) {
	      var div = board[p];
	      if (div) {
	        div.setAttribute('class', 'alive');
	      }
	    });
	  },
	  hidePopulation: function hidePopulation() {
	    world.population.each(function (p) {
	      var div = board[p];
	      if (div) {
	        div.removeAttribute('class');
	      }
	    });
	  },
	  loopForever: function loopForever(delay) {
	    var _this = this;
	
	    this.showPopulation();
	
	    setTimeout(function () {
	      _this.hidePopulation();
	      world.advance();
	      _this.loopForever(delay);
	    }, delay);
	  }
	};

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Set = exports.Set = function () {
	  function Set() {
	    _classCallCheck(this, Set);
	
	    this.storage = {};
	  }
	
	  _createClass(Set, [{
	    key: 'add',
	    value: function add(e) {
	      this.storage[e] = e;
	    }
	  }, {
	    key: 'addAll',
	    value: function addAll(es) {
	      var _this = this;
	
	      es.each(function (e) {
	        return _this.add(e);
	      });
	    }
	  }, {
	    key: 'has',
	    value: function has(e) {
	      return !!this.storage[e];
	    }
	  }, {
	    key: 'size',
	    value: function size() {
	      return Object.keys(this.storage).length;
	    }
	  }, {
	    key: 'reduce',
	    value: function reduce(reducer, a) {
	      var _this2 = this;
	
	      return Object.keys(this.storage).reduce(function (a, k) {
	        return reducer(a, _this2.storage[k]);
	      }, a);
	    }
	  }, {
	    key: 'each',
	    value: function each(iterator) {
	      this.reduce(function (_, e) {
	        return iterator(e);
	      });
	    }
	  }, {
	    key: 'filter',
	    value: function filter(predicate) {
	      return this.reduce(function (a, e) {
	        if (predicate(e)) a.add(e);
	        return a;
	      }, new Set());
	    }
	  }]);
	
	  return Set;
	}();
	
	var neighboringOffsets = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
	
	var Point = exports.Point = function () {
	  function Point(x, y) {
	    _classCallCheck(this, Point);
	
	    this.x = x;
	    this.y = y;
	  }
	
	  _createClass(Point, [{
	    key: 'toString',
	    value: function toString() {
	      return this.x + ':' + this.y;
	    }
	  }, {
	    key: 'neighbors',
	    value: function neighbors() {
	      var _this3 = this;
	
	      return neighboringOffsets.reduce(function (neighbors, _ref) {
	        var _ref2 = _slicedToArray(_ref, 2);
	
	        var dx = _ref2[0];
	        var dy = _ref2[1];
	
	        neighbors.add(new Point(_this3.x + dx, _this3.y + dy));
	        return neighbors;
	      }, new Set());
	    }
	  }, {
	    key: 'neighborCountInSet',
	    value: function neighborCountInSet(points) {
	      return this.neighbors().reduce(function (count, n) {
	        return points.has(n) ? count + 1 : count;
	      }, 0);
	    }
	  }]);
	
	  return Point;
	}();
	
	var World = exports.World = function () {
	  function World() {
	    _classCallCheck(this, World);
	
	    this.population = new Set();
	  }
	
	  _createClass(World, [{
	    key: 'nextGenTestSet',
	    value: function nextGenTestSet() {
	      return this.population.reduce(function (testSet, p) {
	        testSet.add(p);
	        testSet.addAll(p.neighbors());
	        return testSet;
	      }, new Set());
	    }
	  }, {
	    key: 'advance',
	    value: function advance() {
	      var _this4 = this;
	
	      this.population = this.nextGenTestSet().filter(function (p) {
	        var neighborCount = p.neighborCountInSet(_this4.population);
	
	        return _this4.population.has(p) ? neighborCount == 2 || neighborCount == 3 : neighborCount == 3;
	      });
	    }
	  }]);

	  return World;
	}();

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgOTEyMjQyNjk2NjM2YzhhN2ZjZDYiLCJ3ZWJwYWNrOi8vLy4vYnVpbGQuanMiLCJ3ZWJwYWNrOi8vLy4vanMvbGlmZXVpLmpzIiwid2VicGFjazovLy8uL2pzL2xpZmUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7OztBQ3RDQTs7Ozs7O0FBRUEsVUFBUyxnQkFBVCxDQUEwQixrQkFBMUIsRUFBOEMsWUFBTTtBQUNsRCxvQkFDRyxVQURILENBQ2MsT0FEZCxFQUVHLFVBRkgsQ0FFYyxDQUNWLENBQUUsQ0FBRixFQUFNLENBQU4sQ0FEVSxFQUVWLENBQUUsQ0FBRixFQUFNLENBQU4sQ0FGVSxFQUdWLENBQUMsQ0FBQyxDQUFGLEVBQU0sQ0FBTixDQUhVLEVBSVYsQ0FBRSxDQUFGLEVBQU0sQ0FBTixDQUpVLEVBS1YsQ0FBRSxDQUFGLEVBQUssQ0FBQyxDQUFOLENBTFUsQ0FGZCxFQVNHLFdBVEgsQ0FTZSxHQVRmO0FBVUQsRUFYRCxFQVdHLEtBWEgsRTs7Ozs7Ozs7Ozs7Ozs7QUNGQTs7QUFFQSxLQUFJLGNBQUo7QUFDQSxLQUFJLGNBQUo7O21CQUVlO0FBQ2IsYUFEYSxzQkFDRixFQURFLEVBQ0U7QUFDYixhQUFRLEVBQVI7O0FBRUEsU0FBSSxVQUFVLFNBQVMsY0FBVCxDQUF3QixFQUF4QixDQUFkOztBQUVBLFVBQUssSUFBSSxJQUFJLEVBQWIsRUFBaUIsS0FBSyxDQUFDLEVBQXZCLEVBQTJCLEdBQTNCLEVBQWdDO0FBQzlCLFdBQUksTUFBTSxTQUFTLGFBQVQsQ0FBdUIsSUFBdkIsQ0FBVjtBQUNBLGVB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QVEsQ0FBeEIsR0FBNEIsS0FBMUM7QUFBQSxRQUF4QixFQUF5RSxDQUF6RSxDQUFQO0FBQ0Q7Ozs7OztLQUdVLEssV0FBQSxLO0FBQ1gsb0JBQWM7QUFBQTs7QUFDWixVQUFLLFVBQUwsR0FBa0IsSUFBSSxHQUFKLEVBQWxCO0FBQ0Q7Ozs7c0NBRWdCO0FBQ2YsY0FBTyxLQUFLLFVBQUwsQ0FBZ0IsTUFBaEIsQ0FBdUIsVUFBQyxPQUFELEVBQVUsQ0FBVixFQUFnQjtBQUM1QyxpQkFBUSxHQUFSLENBQVksQ0FBWjtBQUNBLGlCQUFRLE1BQVIsQ0FBZSxFQUFFLFNBQUYsRUFBZjtBQUNBLGdCQUFPLE9BQVA7QUFDRCxRQUpNLEVBSUosSUFBSSxHQUFKLEVBSkksQ0FBUDtBQUtEOzs7K0JBRVM7QUFBQTs7QUFDUixZQUFLLFVBQUwsR0FBa0IsS0FBSyxjQUFMLEdBQXNCLE1BQXRCLENBQTZCLFVBQUMsQ0FBRCxFQUFPO0FBQ3BELGFBQUksZ0JBQWdCLEVBQUUsa0JBQUYsQ0FBcUIsT0FBSyxVQUExQixDQUFwQjs7QUFFQSxnQkFBTyxPQUFLLFVBQUwsQ0FBZ0IsR0FBaEIsQ0FBb0IsQ0FBcEIsSUFDTCxpQkFBaUIsQ0FBakIsSUFBc0IsaUJBQWlCLENBRGxDLEdBRUwsaUJBQWlCLENBRm5CO0FBR0QsUUFOaUIsQ0FBbEI7QUFPRCIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIDkxMjI0MjY5NjYzNmM4YTdmY2Q2XG4gKiovIiwiaW1wb3J0IGxpZmV1aSBmcm9tICcuL2pzL2xpZmV1aSc7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiB7XG4gIGxpZmV1aVxuICAgIC5idWlsZEJvYXJkKCd3b3JsZCcpXG4gICAgLmJ1aWxkV29ybGQoW1xuICAgICAgWyAwLCAgMV0sXG4gICAgICBbIDEsICAxXSxcbiAgICAgIFstMSwgIDBdLFxuICAgICAgWyAwLCAgMF0sXG4gICAgICBbIDAsIC0xXVxuICAgIF0pXG4gICAgLmxvb3BGb3JldmVyKDIwMCk7XG59LCBmYWxzZSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2J1aWxkLmpzXG4gKiovIiwiaW1wb3J0IHsgUG9pbnQsIFdvcmxkIH0gZnJvbSAnLi9saWZlJztcblxubGV0IGJvYXJkO1xubGV0IHdvcmxkO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGJ1aWxkQm9hcmQoaWQpIHtcbiAgICBib2FyZCA9IHt9O1xuXG4gICAgbGV0IGVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCk7XG5cbiAgICBmb3IgKGxldCB5ID0gNTA7IHkgPj0gLTUwOyB5LS0pIHtcbiAgICAgIGxldCByb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0cicpO1xuICAgICAgZWxlbWVudC5hcHBlbmRDaGlsZChyb3cpO1xuXG4gICAgICBmb3IgKGxldCB4ID0gLTUwOyB4IDw9IDUwOyB4KyspIHtcbiAgICAgICAgbGV0IGNvbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RkJyk7XG4gICAgICAgIHJvdy5hcHBlbmRDaGlsZChjb2wpO1xuICAgICAgICBsZXQgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGNvbC5hcHBlbmRDaGlsZChkaXYpO1xuICAgICAgICBib2FyZFtuZXcgUG9pbnQoeCwgeSldID0gZGl2O1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIGJ1aWxkV29ybGQoY29vcmRzKSB7XG4gICAgd29ybGQgPSBuZXcgV29ybGQ7XG5cbiAgICBjb29yZHMuZm9yRWFjaCgoWyB4LCB5IF0pID0+IHtcbiAgICAgIHdvcmxkLnBvcHVsYXRpb24uYWRkKG5ldyBQb2ludCh4LCB5KSk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICBzaG93UG9wdWxhdGlvbigpIHtcbiAgICB3b3JsZC5wb3B1bGF0aW9uLmVhY2goKHApID0+IHtcbiAgICAgIGxldCBkaXYgPSBib2FyZFtwXTtcbiAgICAgIGlmIChkaXYpIHtcbiAgICAgICAgZGl2LnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnYWxpdmUnKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSxcblxuICBoaWRlUG9wdWxhdGlvbigpIHtcbiAgICB3b3JsZC5wb3B1bGF0aW9uLmVhY2goKHApID0+IHtcbiAgICAgIGxldCBkaXYgPSBib2FyZFtwXTtcbiAgICAgIGlmIChkaXYpIHtcbiAgICAgICAgZGl2LnJlbW92ZUF0dHJpYnV0ZSgnY2xhc3MnKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSxcblxuICBsb29wRm9yZXZlcihkZWxheSkge1xuICAgIHRoaXMuc2hvd1BvcHVsYXRpb24oKTtcblxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5oaWRlUG9wdWxhdGlvbigpO1xuICAgICAgd29ybGQuYWR2YW5jZSgpO1xuICAgICAgdGhpcy5sb29wRm9yZXZlcihkZWxheSk7XG4gICAgfSwgZGVsYXkpO1xuICB9XG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9qcy9saWZldWkuanNcbiAqKi8iLCJleHBvcnQgY2xhc3MgU2V0IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5zdG9yYWdlID0ge307XG4gIH1cblxuICBhZGQoZSkge1xuICAgIHRoaXMuc3RvcmFnZVtlXSA9IGU7XG4gIH1cblxuICBhZGRBbGwoZXMpIHtcbiAgICBlcy5lYWNoKChlKSA9PiB0aGlzLmFkZChlKSk7XG4gIH1cblxuICBoYXMoZSkge1xuICAgIHJldHVybiAhIXRoaXMuc3RvcmFnZVtlXTtcbiAgfVxuXG4gIHNpemUoKSB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKHRoaXMuc3RvcmFnZSkubGVuZ3RoO1xuICB9XG5cbiAgcmVkdWNlKHJlZHVjZXIsIGEpIHtcbiAgICByZXR1cm4gT2JqZWN0LmtleXModGhpcy5zdG9yYWdlKS5yZWR1Y2UoKGEsIGspID0+IHJlZHVjZXIoYSwgdGhpcy5zdG9yYWdlW2tdKSwgYSk7XG4gIH1cblxuICBlYWNoKGl0ZXJhdG9yKSB7XG4gICAgdGhpcy5yZWR1Y2UoKF8sIGUpID0+IGl0ZXJhdG9yKGUpKTtcbiAgfVxuXG4gIGZpbHRlcihwcmVkaWNhdGUpIHtcbiAgICByZXR1cm4gdGhpcy5yZWR1Y2UoKGEsIGUpID0+IHtcbiAgICAgIGlmIChwcmVkaWNhdGUoZSkpXG4gICAgICAgIGEuYWRkKGUpO1xuICAgICAgcmV0dXJuIGE7XG4gICAgfSwgbmV3IFNldCk7XG4gIH1cbn1cblxuY29uc3QgbmVpZ2hib3JpbmdPZmZzZXRzID0gW1xuICBbLTEsIC0xXSxcbiAgWy0xLCAgMF0sXG4gIFstMSwgIDFdLFxuICBbIDAsIC0xXSxcbiAgWyAwLCAgMV0sXG4gIFsgMSwgLTFdLFxuICBbIDEsICAwXSxcbiAgWyAxLCAgMV1cbl07XG5cbmV4cG9ydCBjbGFzcyBQb2ludCB7XG4gIGNvbnN0cnVjdG9yKHgsIHkpIHtcbiAgICB0aGlzLnggPSB4O1xuICAgIHRoaXMueSA9IHk7XG4gIH1cblxuICB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy54ICsgJzonICsgdGhpcy55O1xuICB9XG5cbiAgbmVpZ2hib3JzKCkge1xuICAgIHJldHVybiBuZWlnaGJvcmluZ09mZnNldHMucmVkdWNlKChuZWlnaGJvcnMsIFsgZHgsIGR5IF0pID0+IHtcbiAgICAgIG5laWdoYm9ycy5hZGQobmV3IFBvaW50KHRoaXMueCArIGR4LCB0aGlzLnkgKyBkeSkpO1xuICAgICAgcmV0dXJuIG5laWdoYm9ycztcbiAgICB9LCBuZXcgU2V0KTtcbiAgfVxuXG4gIG5laWdoYm9yQ291bnRJblNldChwb2ludHMpIHtcbiAgICByZXR1cm4gdGhpcy5uZWlnaGJvcnMoKS5yZWR1Y2UoKGNvdW50LCBuKSA9PiBwb2ludHMuaGFzKG4pID8gY291bnQgKyAxIDogY291bnQsIDApO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBXb3JsZCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMucG9wdWxhdGlvbiA9IG5ldyBTZXQ7XG4gIH1cblxuICBuZXh0R2VuVGVzdFNldCgpIHtcbiAgICByZXR1cm4gdGhpcy5wb3B1bGF0aW9uLnJlZHVjZSgodGVzdFNldCwgcCkgPT4ge1xuICAgICAgdGVzdFNldC5hZGQocCk7XG4gICAgICB0ZXN0U2V0LmFkZEFsbChwLm5laWdoYm9ycygpKTtcbiAgICAgIHJldHVybiB0ZXN0U2V0O1xuICAgIH0sIG5ldyBTZXQpO1xuICB9XG5cbiAgYWR2YW5jZSgpIHtcbiAgICB0aGlzLnBvcHVsYXRpb24gPSB0aGlzLm5leHRHZW5UZXN0U2V0KCkuZmlsdGVyKChwKSA9PiB7XG4gICAgICB2YXIgbmVpZ2hib3JDb3VudCA9IHAubmVpZ2hib3JDb3VudEluU2V0KHRoaXMucG9wdWxhdGlvbik7XG5cbiAgICAgIHJldHVybiB0aGlzLnBvcHVsYXRpb24uaGFzKHApID9cbiAgICAgICAgbmVpZ2hib3JDb3VudCA9PSAyIHx8IG5laWdoYm9yQ291bnQgPT0gMyA6XG4gICAgICAgIG5laWdoYm9yQ291bnQgPT0gMztcbiAgICB9KTtcbiAgfVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9qcy9saWZlLmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==