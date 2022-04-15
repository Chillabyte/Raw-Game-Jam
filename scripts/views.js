class Views {
    constructor(tilePixelSize, spriteSheetUrl) {
        this.elements = new HtmlElements();
        this.spriteSheet = new SpriteSheet(tilePixelSize, spriteSheetUrl);
    }

    playerVisible(visible) {
        this.elements.player.style.opacity = visible ? 1 : 0;
    }

    movePlayer(left, top) {
        const transitionTime = parseFloat(getComputedStyle(this.elements.player)["transitionDuration"]);
        const player = this.elements.player;
        this.elements.player.style.top = `${top * this.spriteSheet.pixelSize}px`;
        this.elements.player.style.left = `${left * this.spriteSheet.pixelSize}px`;
        player.style.transform = `scale(.75)`;
        setTimeout(function () {
            player.style.transform = `scale(1)`;
        }, Math.floor(transitionTime * 500));
    }

    bumpPlayer(xChange, yChange) {
        const transitionTime = parseFloat(getComputedStyle(this.elements.player)["transitionDuration"]);
        const player = this.elements.player;
        player.style.transform = `translate(${xChange *  this.spriteSheet.pixelSize*.5}px, ${yChange * this.sprites.pixelSize*.5}}px) scale(.75)`;
        setTimeout(function () {
            player.style.transform = `translate(0, 0) scale(1)`;
        }, Math.floor(transitionTime * 400));
    }

    showGameBoard(gridWidth, gridHeight){
        let board = document.getElementById("game-board-container")
        board.style.height = `${gridHeight * this.spriteSheet.pixelSize}px`;
        board.style.width = `${gridWidth * this.spriteSheet.pixelSize}px`;
    }

    showAllSprites(){
        let tiles = document.getElementsByClassName('tile');
        console.log(tiles);

        Array.prototype.forEach.call(tiles, elem => {
            console.log('one');
            let spriteCoords = this.spriteSheet.sprites[elem.dataset.sprite];
            console.log(elem.dataset.sprite)
            console.log(spriteCoords);
            let xCoord;
            let yCoord;
            console.log(spriteCoords.row);
            xCoord = this.spriteSheet.pixelSize*spriteCoords.col*-1;
            yCoord= this.spriteSheet.pixelSize*spriteCoords.row*-1;
            
            elem.style.backgroundPosition = `${xCoord}px ${yCoord}px`;
            elem.style.height =`${this.spriteSheet.pixelSize}px`;
            elem.style.width =`${this.spriteSheet.pixelSize}px`;   
        });
    }

    showSprites(spriteName){
        let tiles = document.querySelectorAll(`[data-foo="${spriteName}"]`);
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
        this.gameBoard = document.getElementById("game-board-container")
    }
}

class SpriteSheet {
    constructor(pixelSize, spriteSheetUrl) {
        this.pixelSize = pixelSize;
        this.spriteSheetUrl = spriteSheetUrl;
        this.sprites = {
            'init': { row: 0, col: 0 },
            'player': { row: 0, col: 1 },
            'wall_0': { row: 4, col: 0 },
            'wall_1': { row: 4, col: 1 },
            'wall_2': { row: 4, col: 2 },
            'wall_3': { row: 4, col: 3 },
            'floor_0': { row:6, col: 0 },
            'floor_1': { row:6, col: 1 },
            'floor_2': { row:6, col: 2 },
            'floor_3': { row:6, col: 3 },
        }
    }
}