import { UI } from './js/lifeui';

document.addEventListener('DOMContentLoaded', () => {
  new UI()
    .buildBoard('world')
    .buildWorld([
      [ 0,  1],
      [ 1,  1],
      [-1,  0],
      [ 0,  0],
      [ 0, -1]
    ])
    .loopForever(100);
}, false);
