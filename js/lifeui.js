import immutable from 'immutable';
import { Point, World } from './life';

let board;
let world;

export class UI {
  constructor() {
    this.board = immutable.Map();
    this.world = new World;
  }

  buildBoard(id) {
    let element = document.getElementById(id);

    for (let y = 50; y >= -50; y--) {
      let row = document.createElement('tr');
      element.appendChild(row);

      for (let x = -50; x <= 50; x++) {
        let col = document.createElement('td');
        row.appendChild(col);
        let div = document.createElement('div');
        col.appendChild(div);
        this.board = this.board.set(new Point({ x, y }), div);
      }
    }

    return this;
  }

  buildWorld(coords) {
    coords.forEach(([ x, y ]) => {
      this.world.add(new Point({ x, y }));
    });

    return this;
  }

  showPopulation() {
    this.world.population.forEach((p) => {
      let div = this.board.get(p);
      if (div) {
        div.setAttribute('class', 'alive');
      }
    });
  }

  hidePopulation() {
    this.world.population.forEach((p) => {
      let div = this.board.get(p);
      if (div) {
        div.removeAttribute('class');
      }
    });
  }

  loopForever(delay) {
    this.showPopulation();

    setTimeout(() => {
      this.hidePopulation();
      this.world.advance();
      this.loopForever(delay);
    }, delay);
  }
};
