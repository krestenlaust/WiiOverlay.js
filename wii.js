// Resources: https://www.spriters-resource.com/wii/wiimenu/
class WiiOverlay {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.pointers = [new Pointer(100, 100, 1), new CursorPointer(2)];
    }

    drawWholeScreen() {
        // Clear screen.
        this.ctx.clearRect(0, 0, canvas.width, this.canvas.height);

        // Render home menu.
        this.drawHomeMenu();

        // Render pointers.
        this.drawPointers();

        // Reload this function.
        this.animationRequestID = requestAnimationFrame(() => this.drawWholeScreen());
    }

    drawPointers(){
        this.pointers.forEach(p => p.draw(this.ctx));
    }

    drawHomeMenu(){
        this.ctx.drawImage(res_vid_homemenu, 0, 0);

        // Get the pixel data
        let imageData = this.ctx.getImageData(0, 0, canvas.width, canvas.height);
        let data = imageData.data;

        // Define the green color range to replace with transparency
        const greenMin = [6, 254, 0];
        const greenMax = [180, 255, 178];

        for (var i = 0; i < data.length; i += 4) {
          const isGreen = (
            data[i] >= greenMin[0] && data[i] <= greenMax[0] &&
            data[i + 1] >= greenMin[1] && data[i + 1] <= greenMax[1] &&
            data[i + 2] >= greenMin[2] && data[i + 2] <= greenMax[2]
          );

          if (isGreen) {
            // Set alpha channel to 0 for green pixels
            data[i + 3] = 0;
          }
        }

        // Put the modified pixel data back onto the canvas
        this.ctx.putImageData(imageData, 0, 0);
    }

    openHomeMenu(){
        res_vid_homemenu.play();
    }

    startAnimation(){
        this.animationRequestID = requestAnimationFrame(() => this.drawWholeScreen());
    }

    endAnimation(){
        cancelAnimationFrame(this.animationRequestID);
    }
}

class Pointer {
    constructor(x, y, player) {
        this.x = x;
        this.y = y;
        this.player = player;
        this.pointerType = PointerType.Normal;
    }

    /**
     * 
     * @param {CanvasRenderingContext2D} ctx 
     */
    draw(ctx) {
        const cursorOffsetX = -12;
        const cursorOffsetY = -2;
        ctx.drawImage(this.pointerType, this.x + cursorOffsetX, this.y + cursorOffsetY);
        ctx.fillText(this.player, this.x, this.y);
        //console.log(this.x, this.y, this.player);
    }
}

class CursorPointer extends Pointer {
    constructor(player) {
        super(0, 0, player);

        document.addEventListener('mousemove', (event) => {
            this.x = event.clientX;
            this.y = event.clientY;
        });

        document.addEventListener('mousedown', (_) => {
            this.pointerType = PointerType.Grabbing;
        });
        document.addEventListener('mouseup', (_) => {
            this.pointerType = PointerType.Normal;
        });
    }
}

function initializeSrcElement(elementType, id, src) {
    const newElem = document.createElement(elementType);
    newElem.src = src;
    newElem.id = id;
    newElem.style.display = "none";

    document.body.appendChild(newElem);
}

function initializeImage(id, src) {
    return initializeSrcElement("img", id, src);
}

function initializeVideo(id, src) {
    return initializeSrcElement("video", id, src);
}

initializeImage("res_p1_cursor", "resources/p1_cursor.png");
initializeImage("res_p1_cursor_grabbing", "resources/p1_cursor_grab.png");
initializeVideo("res_vid_homemenu", "resources/homemenu.mp4");

const PointerType = {
    Normal: res_p1_cursor,
    Grabbing: res_p1_cursor_grabbing
}

function createCanvasOverlay() {
    canvas = document.createElement('canvas');
    document.body.appendChild(canvas);
    canvas.style.position = 'absolute';
    canvas.style.left = "0px";
    canvas.style.top = "0px";
    canvas.style.zIndex = "100";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.pointerEvents = 'none';
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    return canvas;
}

let ctx = createCanvasOverlay();

const wiioverlay = new WiiOverlay(canvas);
wiioverlay.startAnimation();
