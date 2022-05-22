const canvas = document.querySelector(`.canvas`);
let x = 1;
let y = 1;

createCanvasPixels();

canvas.addEventListener(`mouseover`, (e) => {
  const xCoordinate = document.querySelector(`.x-coordinate`);
  const yCoordinate = document.querySelector(`.y-coordinate`);

  xCoordinate.textContent = `X: ${e.target.dataset.x}`;
  yCoordinate.textContent = `Y: ${e.target.dataset.y}`;
});

function createCanvasPixels() {
  for (let i = 1; i < 257; i++) {
    const pixel = document.createElement(`div`);

    pixel.classList.add(`pixels`);
    pixel.dataset.x = x;
    pixel.dataset.y = y;

    x++;
    if (i % 16 == 0) {
      x = 1;
      y++;
    }

    canvas.appendChild(pixel);
  }
}
