const canvas = document.querySelector(`.canvas`);
const eraser = document.querySelector(`.eraser`);
const paintSpray = document.querySelector(`.paint-spray`);
const canvasResize = document.querySelector(`.canvas-resize`);
const resetButton = document.querySelector(`.reset-button`);
let canvasDimension = 16;
let paintOn = false;
let eraseOn = false;
let bucketOn = false;
let canvasPixels = canvasDimension * canvasDimension;

createCanvasPixels();

const pixels = document.querySelectorAll(`.pixels`);

canvas.addEventListener(`pointerdown`, togglePaint);

window.addEventListener(`pointerdown`, getPaintColor);

eraser.addEventListener(`pointerdown`, toggleErase);
window.addEventListener(`keydown`, toggleErase);

paintSpray.addEventListener(`pointerdown`, toggleBucketTool);

canvasResize.addEventListener(`pointerdown`, changeCanvasSize);

window.addEventListener(`resize`, changePixelDimensions);

canvas.addEventListener(`pointerover`, getCoordinates);

canvas.addEventListener(`pointerleave`, captureCanvas);

resetButton.addEventListener(`pointerdown`, reset);

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

  setPixelDimensions();
}

function paint(e) {
  if (e.target.classList.value != `pixels`) {
    return;
  }

  e.target.setAttribute(`style`, e.target.getAttribute(`style`) + ` background-color: ${getPaintColor()};`);
}

function togglePaint() {
  paintOn = !paintOn;
  if (paintOn) {
    canvas.addEventListener(`mouseover`, paint);
    return;
  }
  canvas.removeEventListener(`mouseover`, paint);
}

function getPaintColor() {
  const colorPicker = document.querySelector(`#color-picker`);

  return colorPicker.value;
}

function erase(e) {
  e.target.setAttribute(`style`, e.target.getAttribute(`style`) + ` background-color: white;`);
}

function toggleErase(e) {
  if (e.keyCode != 69 && e.keyCode != undefined) {
    return;
  }

  eraseOn = !eraseOn;

  if (eraseOn) {
    canvas.addEventListener(`mouseover`, erase);

    return;
  }

  canvas.removeEventListener(`mouseover`, erase);
}

function paintAll() {
  pixels.forEach((pixel) => {
    pixel.setAttribute(`style`, pixel.getAttribute(`style`) + ` background-color: ${getPaintColor()};`);
  });
}

function toggleBucketTool() {
  bucketOn = !bucketOn;

  if (bucketOn) {
    canvas.addEventListener(`pointerdown`, paintAll);

    return;
  }

  canvas.removeEventListener(`pointerdown`, paintAll);
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

function changePixelDimensions() {
  if (document.body.clientWidth < 961) {
    pixels.forEach((pixel) => {
      pixel.setAttribute(
        `style`,
        pixel.getAttribute(`style`) + `width: ${320 / canvasDimension}px; height: ${320 / canvasDimension}px;`
      );
    });

    return;
  }
  pixels.forEach((pixel) => {
    pixel.setAttribute(
      `style`,
      pixel.getAttribute(`style`) + `width: ${480 / canvasDimension}px; height: ${480 / canvasDimension}px;`
    );
  });
}

function deleteCanvasPixels() {
  while (canvas.lastChild) {
    canvas.removeChild(canvas.lastChild);
  }
}

function getCoordinates(e) {
  const xCoordinate = document.querySelector(`.x-coordinate`);
  const yCoordinate = document.querySelector(`.y-coordinate`);

  xCoordinate.textContent = `X: ${e.target.dataset.x}`;
  yCoordinate.textContent = `Y: ${e.target.dataset.y}`;
}

function captureCanvas() {
  html2canvas(document.querySelector('.canvas')).then((canvas) => {
    const dataURL = canvas.toDataURL(`image/jpeg`);
    let downloadButton = document.querySelector(`.download-link`);

    downloadButton.href = dataURL;

    // downloadButton = document.querySelector(`.download-link`);
    downloadButton.download = `pixelArt.jpg`;
  });
}

function reset() {
  pixels.forEach((pixel) => {
    pixel.setAttribute(`style`, pixel.getAttribute(`style`) + ` background-color: white;`);
  });
}
