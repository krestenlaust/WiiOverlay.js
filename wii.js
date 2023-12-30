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
    }

    /**
     * 
     * @param {CanvasRenderingContext2D} ctx 
     */
    draw(ctx) {
        ctx.drawImage(res_p1_cursor, this.x, this.y);
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
document.addEventListener('mousemove', function (event) {
    wiioverlay.drawWholeScreen();
});