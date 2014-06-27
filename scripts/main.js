define(['cs!lifeui'], function(lifeui) {
  // the F-pentomino
  lifeui.LifeUI
    .buildBoard('world')
    .buildWorld([
      [ 0,  1],
      [ 1,  1],
      [-1,  0],
      [ 0,  0],
      [ 0, -1],
    ])
    .loopForever(200);
});
