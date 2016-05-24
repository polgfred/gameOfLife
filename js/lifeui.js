import { Point, World } from './life';

let board;
let world;

export default {
  buildBoard(id) {
    board = {};

    let element = document.getElementById(id);

    for (let y = 50; y >= -50; y--) {
      let row = document.createElement('tr');
      element.appendChild(row);

      for (let x = -50; x <= 50; x++) {
        let col = document.createElement('td');
        row.appendChild(col);
        let div = document.createElement('div');
        col.appendChild(div);
        board[new Point(x, y)] = div;
      }
    }

    return this;
  },

  buildWorld(coords) {
    world = new World;

    coords.forEach(([ x, y ]) => {
      world.population.add(new Point(x, y));
    });

    return this;
  },

  showPopulation() {
    world.population.each((p) => {
      let div = board[p];
      if (div) {
        div.setAttribute('class', 'alive');
      }
    });
  },

  hidePopulation() {
    world.population.each((p) => {
      let div = board[p];
      if (div) {
        div.removeAttribute('class');
      }
    });
  },

  loopForever(delay) {
    this.showPopulation();

    setTimeout(() => {
      this.hidePopulation();
      world.advance();
      this.loopForever(delay);
    }, delay);
  }
};
