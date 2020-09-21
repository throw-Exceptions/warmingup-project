 window.canvas = document.getElementById("myCanvas");
 window.context = window.canvas.getContext("2d");
 window.drawing = false;
 
let Pen = {
    startX: 0,

    startY: 0,

    move: function(e) {
        if(window.drawing == false) return;
        let curX = e.offsetX;
        let curY = e.offsetY;
        window.context.beginPath();
        window.context.moveTo(this.startX, this.startY);
        window.context.lineTo(curX, curY);
        window.context.stroke();
        this.startX = curX;
        this.startY = curY;
    },

    down: function(e) {
        this.startX = e.offsetX; 
        this.startY = e.offsetY;
        window.drawing = true;
    },

    up: function() {
        window.drawing = false;
    },

    out: function() {
        window.drawing = false;
    },
    
    standby: function(options) {
        window.context.lineWidth = options.width;
        window.context.strokeStyle = options.color;

        window.canvas.onmousemove = this.move;
        window.canvas.onmousedown = this.down;
        window.canvas.onmouseup = this.up;
        window.canvas.onmouseout = this.out;
    }
}