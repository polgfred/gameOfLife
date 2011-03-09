function LifeUI(element, coords) {
  var board, world

  function buildBoard() {
    var row, col, div, p

    board = {}

    for (var y = 50; y >= -50; y--) {
      row = $('<tr>')
      element.append(row)

      for (var x = -50; x <= 50; x++) {
        col = $('<td>')
        div = $('<div>')
        row.append(col)
        col.append(div)

        p = new Point(x, y)
        board[p] = div
      }
    }
  }

  function buildWorld() {
    world = new World()

    coords.forEach(function(coords) {
      world.add(new Point(coords[0], coords[1]))
    })
  }

  function togglePopulation() {
    world.population.each(function(p) {
      if (board[p]) {
        board[p].toggleClass('alive')
      }
    })
  }

  function loopForever() {
    togglePopulation()
    setTimeout(function() {
      togglePopulation()
      world.advance()
      loopForever()
    }, 250)
  }

  this.start = function() {
    buildBoard()
    buildWorld()
    loopForever()
  }
}

if (typeof exports != 'undefined') {
  exports.LifeUI = LifeUI
}
