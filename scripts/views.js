class Views {
    constructor(tilePixelSize, spriteSheetUrl) {
        this.elements = new HtmlElements();
        this.spriteSheet = new SpriteSheet(tilePixelSize, spriteSheetUrl);
    }

    playerVisible(visible) {
        this.elements.player.style.opacity = visible ? 1 : 0;
    }

    movePlayer(row, col) {
        const transitionTime = parseFloat(getComputedStyle(this.elements.player)["transitionDuration"]);
        const player = this.elements.player;
        player.style.top = `${row * this.spriteSheet.pixelSize}px`;
        player.style.left = `${col * this.spriteSheet.pixelSize}px`;
        player.style.transform = `scale(.75)`;
        setTimeout(function () {
            player.style.transform = `scale(1)`;
        }, Math.floor(transitionTime * 500));
    }

    bumpPlayer(rowChange, colChange) {
        const transitionTime = parseFloat(getComputedStyle(this.elements.player)["transitionDuration"]);
        const player = this.elements.player;
        player.style.transform = `translate(${colChange *  this.spriteSheet.pixelSize*.25}px, ${rowChange * this.spriteSheet.pixelSize*.25}px) scale(.75)`;
        setTimeout(function () {
            player.style.transform = `translate(0, 0) scale(1)`;
        }, Math.floor(transitionTime * 500));
    }

    showGameBoard(gridWidth, gridHeight){
        let board = document.getElementById("game-board-container")
        board.style.height = `${gridHeight * this.spriteSheet.pixelSize}px`;
        board.style.width = `${gridWidth * this.spriteSheet.pixelSize}px`;
    }

    showForeground(){

        let artifactLocation = document.querySelectorAll(`[data-artifact="chest"`);
        let row=artifactLocation[0].id.split("-")[1];
        let col=artifactLocation[0].id.split("-")[2];
        const artifact = this.elements.artifact;
        artifact.style.top = `${this.spriteSheet.pixelSize*row}px`;
        artifact.style.left = `${this.spriteSheet.pixelSize*col}px`;
        artifact.style.opacity=1;

        let wonderLocation = document.querySelectorAll(`[data-wonder="ant"`);
        row=wonderLocation[0].id.split("-")[1];
        col=wonderLocation[0].id.split("-")[2];
        const wonder = this.elements.wonder;
        wonder.style.top = `${this.spriteSheet.pixelSize*row}px`;
        wonder.style.left = `${this.spriteSheet.pixelSize*col}px`;
        wonder.style.opacity=1;
    }

    showAllSprites(){
        let tiles = document.getElementsByClassName('tile');

        Array.prototype.forEach.call(tiles, elem => {
            let spriteCoords = this.spriteSheet.sprites[elem.dataset.sprite];
            let xCoord;
            let yCoord;
            xCoord = this.spriteSheet.pixelSize*spriteCoords.col*-1;
            yCoord= this.spriteSheet.pixelSize*spriteCoords.row*-1;
            
            elem.style.backgroundPosition = `${xCoord}px ${yCoord}px`;
            elem.style.height =`${this.spriteSheet.pixelSize}px`;
            elem.style.width =`${this.spriteSheet.pixelSize}px`;   
        });
    }

    showSprites(spriteName){
        let tiles = document.querySelectorAll(`[data-sprite="${spriteName}"]`);
        let xCoord = this.spriteSheet.pixelSize*this.spriteSheet.sprites[spriteName].row*-1;
        let yCoord = this.spriteSheet.pixelSize*this.spriteSheet.sprites[spriteName].col*-1;
        tiles.forEach(elem => {
            elem.css(`background-position:${xCoord}px ${yCoord}px`);            
        });
    }
}

class HtmlElements {
    constructor() {
        this.player = document.getElementById("player");
        this.gameBoard = document.getElementById("game-board-container");
        this.artifact = document.getElementById("artifact");
        this.wonder=document.getElementById("wonder");
    }
}

class SpriteSheet {
    constructor(pixelSize, spriteSheetUrl) {
        this.pixelSize = pixelSize;
        this.spriteSheetUrl = spriteSheetUrl;
        this.sprites = {
            'init': { row: 0, col: 0 },
            'player': { row: 0, col: 1 },
            'potion': {row:3, col:0 },
            'wall_0': { row: 4, col: 0 },
            'wall_1': { row: 4, col: 1 },
            'wall_2': { row: 4, col: 2 },
            'wall_3': { row: 4, col: 3 },
            'floor_0': { row:6, col: 0 },
            'floor_1': { row:6, col: 1 },
            'floor_2': { row:6, col: 2 },
            'floor_3': { row:6, col: 3 },
            'ant': {row: 12, col: 0},
            'chest':{row: 3, col: 4}
        }
    }
}