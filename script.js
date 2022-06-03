const canvas = document.querySelector(`.canvas`);
const downloadButton = document.querySelector(`.download-link`);
const canvasResize = document.querySelector(`.canvas-resize`);
const eraser = document.querySelector(`.eraser`);
const paintSprayer = document.querySelector(`.paint-sprayer`);
const resetButton = document.querySelector(`.reset-button`);
let canvasDimension = 16;
let count = 1;
let eraseOn = false;
let bucketOn = false;
let canvasPixels = canvasDimension * canvasDimension;

createCanvasPixels();

const pixels = document.querySelectorAll(`.pixels`);

canvas.addEventListener(`pointerleave`, captureCanvas);

resetButton.addEventListener(`pointerdown`, () => {
  pixels.forEach((pixel) => {
    pixel.setAttribute(`style`, pixel.getAttribute(`style`) + ` background-color: white;`);
  });
});

paintSprayer.addEventListener(`pointerdown`, toggleBucketTool);

window.addEventListener(`keydown`, toggleErase);

eraser.addEventListener(`pointerdown`, toggleErase);

window.addEventListener(`pointerdown`, getPaintColor);

window.addEventListener(`resize`, setPixelDimensions);

canvasResize.addEventListener(`pointerdown`, changeCanvasSize);

canvas.addEventListener(`pointerover`, (e) => {
  const xCoordinate = document.querySelector(`.x-coordinate`);
  const yCoordinate = document.querySelector(`.y-coordinate`);

  xCoordinate.textContent = `X: ${e.target.dataset.x}`;
  yCoordinate.textContent = `Y: ${e.target.dataset.y}`;
});

canvas.addEventListener(`pointerdown`, togglePaint);

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

function paint(e) {
  if (e.target.classList.value != `pixels`) {
    return;
  }

  e.target.setAttribute(`style`, e.target.getAttribute(`style`) + ` background-color: ${getPaintColor()};`);
}

function togglePaint() {
  count++;
  if (count % 2 == 0) {
    canvas.addEventListener(`mouseover`, paint);
    return;
  }
  canvas.removeEventListener(`mouseover`, paint);
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

function toggleBucketTool(e) {
  bucketOn = !bucketOn;

  if (bucketOn) {
    canvas.addEventListener(`pointerdown`, paintAll);

    return;
  }

  canvas.removeEventListener(`pointerdown`, paintAll);
}

function getPaintColor() {
  const colorPicker = document.querySelector(`#color-picker`);

  return colorPicker.value;
}

function captureCanvas() {
  html2canvas(document.querySelector('.canvas')).then((canvas) => {
    console.log(`hello`);
    const dataURL = canvas.toDataURL(`image/jpeg`);
    let downloadButton = document.querySelector(`.download-link`);

    downloadButton.href = dataURL;

    downloadButton = document.querySelector(`.download-link`);
    downloadButton.download = `pixelArt.jpg`;
  });
}
