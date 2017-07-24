import paper from 'paper';
import { randNumber } from '../../utilities/helpers';
import settings from '../../utilities/settings';

window.papers = {};

function confetti(selector = '') {
  const pattern = document.querySelector(selector);

  if (!pattern) {
    return;
  }

  window.papers[`${pattern.id}`] = new paper.PaperScope();
  const paperObj = window.papers[`${pattern.id}`];

  paperObj.install(window);

  window.addEventListener('load', () => {
    paperObj.setup(pattern);
    paperObj.activate();

    function area() {
      return paperObj.view.bounds.width * paperObj.view.bounds.height;
    }

    function randColor() {
      const selectedColor = settings.colors[randNumber(0, settings.colors.length)];
      return selectedColor.value;
    }

    function randPosition() {
      return [
        randNumber(1, paperObj.view.bounds.width),
        randNumber(1, paperObj.view.bounds.height)
      ];
    }

    function randPositionX() {
      return Math.round(paperObj.Point.random().x * paperObj.view.size.width);
    }

    const density = 0.02;
    const quantity = Math.round((area() / 100) * density);
    const items = (quantity <= 200) ? quantity : 200;
    const shape = new paperObj.Path.Rectangle({
      point: randPosition(),
      size: [30, 4],
      fillColor: randColor()
    });

    for (let i = 0; i < items; i++) {
      const copy = shape.clone();

      copy.size = [randNumber(20, 30), 4];
      copy.position = new paperObj.Point(randPosition());
      copy.fillColor = randColor();
      copy.blendMode = 'multiply';
      copy.rotate(randNumber(0, 360));

      if (Math.round(i % 5) === 0) {
        copy.scale((i / items) * randNumber(1, 5));
      } else {
        copy.scale(i / items);
      }
    }
    paperObj.view.update();
    const children = paperObj.project.activeLayer.children;

    paperObj.view.onFrame = function () {
      for (let i = 0; i < items; i++) {
        const item = children[i];
        const rotationDirection = (i % 2) ? +1 : -1;

        item.rotate(rotationDirection);
        item.position.y += (item.bounds.width / (item.bounds.width * 2));

        if (item.bounds.top > paperObj.view.size.height) {
          item.position.y = -item.bounds.width;
          item.position.x = randPositionX();
        }
      }
    };

    paperObj.view.update();
    paperObj.view.draw();
  });
}

function background(selector = '', color = 'white') {
  const pattern = document.querySelector(selector);

  if (!pattern) {
    return;
  }

  window.papers[`${pattern.id}`] = new paper.PaperScope();
  const paperObj = window.papers[`${pattern.id}`];

  paperObj.install(window);

  window.addEventListener('load', () => {
    paperObj.setup(pattern);
    paperObj.activate();

    function area() {
      return paperObj.view.bounds.width * paperObj.view.bounds.height;
    }

    function selectColor(name) {
      const selected = settings.colors.find(item => item.name === name);
      return (selected) ? selected.value : name;
    }

    function randPosition() {
      return [
        randNumber(1, paperObj.view.bounds.width),
        randNumber(1, paperObj.view.bounds.height)
      ];
    }

    const density = 0.02;
    const quantity = Math.round((area() / 100) * density);
    const items = (quantity <= 200) ? quantity : 200;
    const shape = new paperObj.Path.Rectangle({
      point: randPosition(),
      size: [30, 4],
      fillColor: selectColor(color)
    });

    for (let i = 0; i < items; i++) {
      const copy = shape.clone();

      copy.size = [30, 4];
      copy.position = new paperObj.Point(randPosition());
      copy.rotate(randNumber(0, 360));

      if (Math.round(i % 5) === 0) {
        copy.scale((i / items) * randNumber(1, 5));
      } else {
        copy.scale(i / items);
      }
    }

    paperObj.view.update();
    paperObj.view.draw();
  });
}

export { confetti, background };
