class Canvas {
    constructor() {
        this.canvas = document.getElementById("canvas");
        this.ctx = this.canvas.getContext("2d");
        this.Width = this.ctx.canvas.clientWidth;
        this.Height = this.ctx.canvas.clientHeight;
    }

    rectangle(x, y, lang, alt, corBorda, corInterna) {
        this.ctx.fillStyle = corInterna;
        this.ctx.strokeStyle = corBorda;
        if(corInterna) this.ctx.fillRect(x, y, lang, alt);
        if(corBorda) this.ctx.strokeRect(x, y, lang, alt);
    }

    point(x, y, cor, peso) {
        cor = cor || 'black';
        peso = peso || 1;
        let m = peso / 2;
        this.ctx.fillStyle = cor;
        this.ctx.fillRect(x - m, y - m, peso, peso);
    }

    circ(x, y, raio, cor) {
        this.ctx.beginPath();
        this.ctx.fillStyle = cor;
        this.ctx.strokeStyle = cor || 'black';
        this.ctx.arc(x, y, raio, 0, 2 * Math.PI);
        this.ctx.closePath();
        if(cor) this.ctx.fill();
        else this.ctx.stroke();
    }

    line(x1, y1, x2, y2) {
        this.ctx.strokeStyle = 'black';
        this.ctx.beginPath();
        this.moveTo(x1, y1);
        this.lineTo(x2, y2);
        this.ctx.closePath();
        this.ctx.stroke();
    }

    rect(x1, y1, x2, y2, cor, cheio) {
        this.ctx.fillStyle = cor;
        this.ctx.strokeStyle = cor;
        let lang = x2 - x1;
        let alt = y2 - y1;
        if(cheio) this.ctx.fillRect(x1, y1, lang, alt);
        else this.ctx.strokeRect(x1, y1, lang, alt);
    }

    clear(color) {
        if(color) this.ctx.rectangle(0, 0, this.Width, this.Height, color, color);
        else this.ctx.clearRect(0, 0, this.Width, this.Height);
    }
}