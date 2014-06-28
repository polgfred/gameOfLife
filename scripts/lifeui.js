define(['life'], function(life) {
  var board, world

  return {
    buildBoard: function(id) {
      board = {}

      var element = document.getElementById(id)

      for (var y = 50; y >= -50; y--) {
        var row = document.createElement('tr')
        element.appendChild(row)

        for (var x = -50; x <= 50; x++) {
          var col = document.createElement('td')
          row.appendChild(col)
          var div = document.createElement('div')
          col.appendChild(div)
          board[new life.Point(x, y)] = div
        }
      }

      return this
    },

    buildWorld: function(coords) {
      world = new life.World

      coords.forEach(function(coords) {
        world.add(new life.Point(coords[0], coords[1]))
      })

      return this
    },

    showPopulation: function() {
      world.population.each(function(p) {
        var div = board[p]
        if (div) {
          div.setAttribute('class', 'alive')
        }
      })
    },

    hidePopulation: function() {
      world.population.each(function(p) {
        var div = board[p]
        if (div) {
          div.removeAttribute('class')
        }
      })
    },

    loopForever: function(delay) {
      this.showPopulation()

      setTimeout(function() {
        this.hidePopulation()
        world.advance()
        this.loopForever(delay)
      }.bind(this), delay)
    }
  }
})
