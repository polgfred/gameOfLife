function LifeUI(id, coords) {
  var board, world

  function buildBoard() {
    var element = document.getElementById(id)
    board = {}

    for (var y = 50; y >= -50; y--) {
      var row = document.createElement('tr')
      element.appendChild(row)

      for (var x = -50; x <= 50; x++) {
        var col = document.createElement('td')
        row.appendChild(col)
        var div = document.createElement('div')
        col.appendChild(div)
        board[new Point(x, y)] = div
      }
    }
  }

  function buildWorld() {
    world = new World()

    coords.forEach(function(coords) {
      world.add(new Point(coords[0], coords[1]))
    })
  }

  function showPopulation() {
    world.population.each(function(p) {
      var div = board[p]
      if (div) {
        div.setAttribute('class', 'alive')
      }
    })
  }

  function hidePopulation() {
    world.population.each(function(p) {
      var div = board[p]
      if (div) {
        div.removeAttribute('class')
      }
    })
  }

  function loopForever() {
    showPopulation()
    setTimeout(function() {
      hidePopulation()
      world.advance()
      loopForever()
    }, 200)
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
