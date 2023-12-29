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

let ctx = createCanvasOverlay();
let x;
let y;



class WiiMenu {
  constructor(canvas){
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
  }

  drawCursor() {
    this.ctx.fillRect(x, y, 50, 50);
    console.log(x, y);
  }

  drawWholeScreen(){
    this.ctx.clearRect(0, 0, canvas.width, this.canvas.height);
    this.drawCursor();
  }
}

const wiimenu = new WiiMenu(canvas);
document.addEventListener('mousemove', function(event) {
  x = event.clientX;
  y = event.clientY;

  wiimenu.drawWholeScreen();
});