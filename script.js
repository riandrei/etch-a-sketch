const canvas = document.querySelector(`.canvas`);
const canvasResize = document.querySelector(`.canvas-resize`);
let canvasDimension = 16;
let canvasPixels = canvasDimension * canvasDimension;

createCanvasPixels();

canvasResize.addEventListener(`click`, changeCanvasSize);

canvas.addEventListener(`mouseover`, (e) => {
  const xCoordinate = document.querySelector(`.x-coordinate`);
  const yCoordinate = document.querySelector(`.y-coordinate`);

  xCoordinate.textContent = `X: ${e.target.dataset.x}`;
  yCoordinate.textContent = `Y: ${e.target.dataset.y}`;
});

function createCanvasPixels() {
  let x = 1;
  let y = 1;

  for (let i = 1; i < canvasPixels + 1; i++) {
    const pixel = document.createElement(`div`);

    pixel.classList.add(`pixels`);
    pixel.dataset.x = x;
    pixel.dataset.y = y;

    x++;
    if (i % canvasDimension == 0) {
      x = 1;
      y++;
    }

    canvas.appendChild(pixel);
  }
}

function changeCanvasSize() {
  const textCanvasDimensions = document.querySelector(`.canvas-dimensions`);

  do {
    canvasDimension = prompt(`Enter canvas dimension(between 1 and 100): `);

    if (canvasDimension == null) {
      return;
    }

    deleteCanvasPixels();
  } while (canvasDimension < 1 || canvasDimension > 100);

  canvasPixels = canvasDimension * canvasDimension;

  canvas.setAttribute(`style`, `grid-template-columns: repeat(${canvasDimension}, 1fr);`);
  createCanvasPixels();
  setPixelDimensions();

  textCanvasDimensions.firstElementChild.textContent = `Width: ${canvasDimension}`;
  textCanvasDimensions.lastElementChild.textContent = `Height: ${canvasDimension}`;
}

function deleteCanvasPixels() {
  while (canvas.lastChild) {
    canvas.removeChild(canvas.lastChild);
  }
}

function setPixelDimensions() {
  const pixels = document.querySelectorAll(`.pixels`);
  if (document.body.clientWidth < 961) {
    pixels.forEach((pixel) => {
      pixel.setAttribute(`style`, `width: ${320 / canvasDimension}px; height: ${320 / canvasDimension}px;`);
    });

    return;
  }

  pixels.forEach((pixel) => {
    pixel.setAttribute(`style`, `width: ${480 / canvasDimension}px; height: ${480 / canvasDimension}px;`);
  });
}
