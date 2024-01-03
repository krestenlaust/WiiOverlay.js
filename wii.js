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

        // Render pointers.
        this.pointers.forEach(p => p.draw(this.ctx));
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
        console.log(this.x, this.y, this.player);
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

function initializeImage(id, src) {
    const newImg = document.createElement("img");
    newImg.src = src;
    newImg.id = id;
    newImg.style = "display: none";

    document.body.appendChild(newImg);
}

initializeImage("res_p1_cursor", "resources/p1_cursor.png");
initializeImage("res_p1_cursor_grabbing", "resources/p1_cursor_grab.png");

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
document.addEventListener('mousemove', (_) => wiioverlay.drawWholeScreen());
document.addEventListener('mouseup', (_) => wiioverlay.drawWholeScreen());
document.addEventListener('mousedown', (_) => wiioverlay.drawWholeScreen());