import lifeui from './js/lifeui';

document.addEventListener('DOMContentLoaded', () => {
  lifeui
    .buildBoard('world')
    .buildWorld([
      [ 0,  1],
      [ 1,  1],
      [-1,  0],
      [ 0,  0],
      [ 0, -1]
    ])
    .loopForever(200);
}, false);
