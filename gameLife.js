class GameLife{
    constructor(width, height) {
        this.canvas = new Canvas();
        this.canvas.canvas.addEventListener("click", event => this.mouseClick(event));
        this.lastExecute = Date.now();
        this.colorlive = "#0000ff";
        this.colordead = "#aaaaaa"
        this.BoardSize = {
            Width: width,
            Height: height
        };
        this.cellSize = {
            Width: this.canvas.Width / width,
            Height: this.canvas.Height / height
        };
        this.Cells = [];
        this.startCells();
        this.startNears();
    }
    mouseClick(event) {
        // console.log(event);
        let mx = event.layerX;
        let my = event.layerY;
        let x = Math.trunc(mx / this.cellSize.Width);
        let y = Math.trunc(my / this.cellSize.Height);
        let cell = this.Cells[y][x];
        cell.alive = +!cell.alive;
        this.renderCell(cell);
    }
    startCells() {
        for(var y = 0; y < this.BoardSize.Height; y++) {
            let line = [];
            this.Cells.push(line);
            for (let x = 0; x < this.BoardSize.Width; x++) {
                let cell = {
                    alive: getRandomInt(0, 2),
                    x: x * this.cellSize.Width,
                    y: y * this.cellSize.Height,
                    next: 0
                };
                line.push(cell);
            }
        }
    }
    startNears() {
        this.Cells.forEach((line,y) => { // Pegando todas as linhas item linha do indice y
            line.forEach((cell, x) => { // Dessa linha pego as células e o indice x
                cell.nears = []; // Definindo os vizinhos a partir da célula que peguei
                for (let dy = -1 ; dy <= 1; dy++){ // Contando as linhas acima, abaixo e a própria linha
                    for (let dx = -1 ; dx <= 1; dx++){ // Contando as colunas acima, abaixo e aprópria coluna
                        if(dx !== 0 || dy !== 0) { // Verifica se um dos dois são diferentes de 0, os dois não podem ter o mesmo valo de zero.
                            let vx = x + dx; // Pegando o indice de cada um
                            let vy = y + dy;
                            if(vx >= 0 && vx < this.BoardSize.Width && vy >= 0 && vy < this.BoardSize.Height) { // Verificando se estão na faixa de 0 a 9
                                let vCell = this.Cells[vy][vx]; // Pegando a célula
                                cell.nears.push(vCell); // Colocando como vizinhos
                            }
                        }
                    } 
                }
            });
        }); 
    }
    clearCells() {
        this.Cells.forEach(line => {
            line.forEach(cell => {
                cell.alive = 0;
            });
        });
    }
    calculate() {
        this.Cells.forEach(line => {
            line.forEach(cell => {
                let v = 0;
                cell.nears.forEach(vCell => {
                    v += vCell.alive;
                });
                if(cell.alive) cell.next = +(v >= 2 && v <= 3);
                else cell.next = +(v == 3);
            });
        }); 
    }
    update() {
        this.Cells.forEach(line => {
            line.forEach(cell => {
                cell.alive = cell.next;
            });
        });
    }
    render() {
        this.Cells.forEach(line => {
            line.forEach(cell => {
                this.renderCell(cell);
            });
        });
    }
    renderCell(cell) {
        this.canvas.rectangle(cell.x, cell.y, this.cellSize.Width, this.cellSize.Height, 'black', this.colordead);
        if(cell.alive) {
            let x = cell.x +2;
            let y = cell.y +2;
            this.canvas.rectangle(x, y, this.cellSize.Width -4, this.cellSize.Height -4, this.colorlive, this.colorlive);
        }

    }
    execute() {
        let time = Date.now() - this.lastExecute;
        if(time >= 200) {
            this.lastExecute = Date.now();
            this.calculate();
            this.update();
            this.render();
        }
    }
}

var game = new GameLife(20,20);
var idAnimation;

function executeGame() {
    game.execute();
    idAnimation = requestAnimationFrame(executeGame);
}

let btStart = document.getElementById("start");
btStart.onclick = function() {
    if(!idAnimation) requestAnimationFrame(executeGame);
}
let btStop = document.getElementById("stop");
btStop.onclick = function() {
    if(idAnimation) cancelAnimationFrame(idAnimation);
    idAnimation = 0;
}
let btClear = document.getElementById("clear");
btClear.onclick = function() {
    if(idAnimation) cancelAnimationFrame(idAnimation);
    idAnimation = 0;
    game.clearCells();
    game.render();
}
game.render();