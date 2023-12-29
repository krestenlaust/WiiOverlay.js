function createCanvasOverlay() {
  canvas = document.createElement('canvas');
  document.body.appendChild(canvas);
  canvas.style.position = 'absolute';
  canvas.style.left="0px";
  canvas.style.top="0px";
  canvas.style.zIndex="100";
  canvas.style.width="100%";
  canvas.style.height="100%";
  canvas.style.pointerEvents = 'none';
  canvas.width=canvas.offsetWidth;
  canvas.height=canvas.offsetHeight;

  return canvas;
}

let ctx = createCanvasOverlay().getContext("2d");
