const canvas = document.querySelector(`.canvas`);

for (let i = 1; i < 257; i++) {
  const pixel = document.createElement(`div`);
  canvas.appendChild(pixel);
}
