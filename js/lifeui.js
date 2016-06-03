import immutable from 'immutable';
import { Point, World } from './life';

export class UI {
  constructor() {
    this.world = new World;
  }

  buildBoard(id) {
    this.table = document.getElementById(id);

    for (let y = -50; y <= 50; y++) {
      let row = document.createElement('tr');
      this.table.appendChild(row);

      for (let x = -50; x <= 50; x++) {
        let col = document.createElement('td');
        row.appendChild(col);
        let cell = document.createElement('div');
        col.appendChild(cell);
      }
    }

    return this;
  }

  buildWorld(coords) {
    coords.forEach(([ x, y ]) => this.world.add(new Point({ x, y })));

    return this;
  }

  showPopulation() {
    this.world.population.forEach(p => {
      if (p.x >= -50 && p.x <= 50 && p.y >= -50 && p.y <= 50) {
        let col = this.table.children[50 - p.y].children[50 + p.x];
        col.setAttribute('class', 'alive');
      }
    });
  }

  hidePopulation() {
    this.world.population.forEach(p => {
      if (p.x >= -50 && p.x <= 50 && p.y >= -50 && p.y <= 50) {
        let col = this.table.children[50 - p.y].children[50 + p.x];
        col.removeAttribute('class');
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
