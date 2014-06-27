define ['cs!life'], (life) ->
  LifeUI: LifeUI =
    buildBoard: (id) ->
      # build an HTML table and cache <div>s by point
      board = {}
      elem = document.getElementById id
      for y in [50..-50] by -1
        row = document.createElement 'tr'
        elem.appendChild row
        for x in [-50..50] by 1
          col = document.createElement 'td'
          row.appendChild col
          div = document.createElement 'div'
          col.appendChild div
          board[new life.Point x, y] = div
      @board = board
      @
    # build the initial world
    buildWorld: (coords) ->
      world = new life.World
      world.pop.add new life.Point x, y for [x, y] in coords
      @world = world
      @
    # set all the living point cells to class=alive
    showPop: ->
      @world.pop.each (p) =>
        div = @board[p]
        div.setAttribute 'class', 'alive' if div
      @
    # unset all living cells' class attribute
    hidePop: ->
      @world.pop.each (p) =>
        div = @board[p]
        div.removeAttribute 'class' if div
      @
    # show/wait/hide/advance loop
    loopForever: (timeout) ->
      @showPop()
      setTimeout =>
        @hidePop()
        @world.advance()
        @loopForever timeout
      , timeout
      @
