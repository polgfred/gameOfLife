LifeUI =
  board: {}

  world: new World

  buildBoard: (id) ->
    elem = document.getElementById(id)
    for y in [50..-50] by -1
      row = document.createElement('tr')
      elem.appendChild(row)
      for x in [-50..50] by 1
        col = document.createElement('td')
        row.appendChild(col)
        div = document.createElement('div')
        col.appendChild(div)
        @board[new Point(x, y)] = div

  buildWorld: (coords) ->
    coords.forEach (coords) =>
      @world.add(new Point(coords[0], coords[1]))

  showPop: ->
    @world.pop.each (p) =>
      div = @board[p]
      div.setAttribute('class', 'alive') if div

  hidePop: ->
    @world.pop.each (p) =>
      div = @board[p]
      div.removeAttribute('class') if div

  loopForever: ->
    @showPop()
    setTimeout =>
      @hidePop()
      @world.advance()
      @loopForever()
    , 200

  start: (id, coords) ->
    @buildBoard(id)
    @buildWorld(coords)
    @loopForever()

# exports
global = exports ? this
global.LifeUI = LifeUI
