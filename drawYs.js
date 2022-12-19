/**  @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvasWorkplace');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let drawing = false;
ctx.shadowOffsetX = 10;
ctx.shadowOffsetY = 10;
ctx.shadowBlur = 10;
ctx.shadowColor = 'rgba(0,0,0,0.5)';
ctx.globalCompositeOperation = 'destination-over';



class Root {
    constructor(x, y, colorSp, humidity) {
        this.x = x;
        this.y = y;
        this.speedX = Math.random() * 4 - 2;
        this.speedY = Math.random() * 4 - 2;
        this.maxSize = Math.random() * 7 + 20;
        this.size = 0;
        this.vs = Math.random() * 0.2 + 0.5;
        this.vax = Math.random() * 0.6 - 0.3;
        this.angleX = Math.random() * 6.2;
        this.vay = Math.random() * 0.6 - 0.3;
        this.angleY = Math.random() * 6.2;
        this.lightness = 10;
        this.angle = 0;
        this.va = Math.random() * 0.02 + 0.05;
        this.colorSp = colorSp;
        this.humidity = humidity;
    }

    update() {
        this.x += this.speedX + Math.sin(this.angleX);
        this.y += this.speedY + Math.sin(this.angleY);
        this.size += this.vs;
        this.size = Math.round(this.size)
        this.angleX += this.vax;
        this.angleY += this.vay;
        this.angle += this.va;
        if (this.lightness < 70) this.lightness += 0.25;
        if (this.size < this.maxSize) {

            ctx.save();
            ctx.fillStyle = `rgba(99,124,309,0.3)`;
            ctx.translate(this.x, this.y);
            ctx.rotate(this.angle);
            let double = this.size * 2;
            ctx.lineWidth = 0.5;
            ctx.fillRect(0 - this.size / 2, 0 - this.size / 2, this.size, this.size);
            ctx.fillStyle = `rgba(100,100,100,0.5)`;
            // ctx.strokeStyle = '#3c5186';
            // ctx.strokeRect(0 - double / 2, 0 - double / 2, double, double);
            // let triple = this.size * 3;
            // ctx.lineWidth = 0.1;
            // ctx.strokeStyle = '#FFFFFF';
            // ctx.strokeRect(0 - triple / 2, 0 - triple / 2, triple, triple);
            requestAnimationFrame(this.update.bind(this));
            ctx.restore();
        }
        else {
            const flower = new Flower(this.x, this.y, this.size);
            flower.grow();
        }


    }
}

class Flower {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.vs = Math.random() * 0.3 + 0.2;
        this.maxFlowerSize = this.size + Math.random() * 60;
        this.image = new Image();
        this.image.src = 'flowers.png';
        this.frameSize = 100;
        this.frameY = Math.floor(Math.random() * 3);
        this.frameX = Math.floor(Math.random() * 3);
        this.size > 11.5 ? this.willFlower = true : this.willFlower = false;
        this.angle = 0;
        this.va = Math.random() * 0.05 - 0.025;
    }

    grow() {
        if (this.size < this.maxFlowerSize && this.willFlower) {
            this.size += this.vs;
            this.angle += this.va;
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.angle)
            ctx.drawImage(this.image,
                this.frameSize * this.frameX,
                this.frameSize * this.frameY,
                this.frameSize,
                this.frameSize,
                0 - this.size / 2,
                0 - this.size / 2,
                this.size,
                this.size);
            ctx.restore();
            requestAnimationFrame(this.grow.bind(this));
        }
    }
}



function getRandomNum(min, max) {
    return Math.round((Math.random() * (max - min) + min) * 100) / 100;
}

window.addEventListener('mousemove', (event) => {
    if (drawing) {
        for (let counter = 0; counter < 3; counter++) {
            const root = new Root(event.x, event.y, 100, 200);
            root.update();
        }
    }
})

window.addEventListener('mousedown', () => {
    drawing = true;
    for (let counter = 0; counter < 3; counter++) {
        const root = new Root(event.x, event.y, 100, 200);
        root.update();
    }
});
window.addEventListener('mouseup', () => {
    drawing = false;
});



