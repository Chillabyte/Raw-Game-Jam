class Models {
    constructor() {
        this.player = new PlayerModel();
        this.maps = new Maps();
        this.board = new GameBoardModel();
        this.muted = true;
        this.backgroundMusic = new Audio('assets/backgroundMusic.ogg');
        this.backgroundMusic.loop = true;
    }

    movePlayer(rowChange, colChange) {
        this.player.row += rowChange;
        this.player.col += colChange;
    }
    updateBackgroundMusic(){
        if (!this.muted) 
           this.backgroundMusic.play();               
        else
            this.backgroundMusic.pause();
        this.player.muted = this.muted;
    }

    initializeBoard(boardView, level) {
        this.board = new GameBoardModel();
        this.player.initializeStats(false);
        const rows = document.querySelectorAll(".row");
        rows.forEach(row => row.remove());
        let boardMap = this.maps.levels[level];
        this.board.height = boardMap.length;
        this.board.width = boardMap[0].length;
        for (let row = 0; row < this.board.height; row++) {
            const rowDiv = document.createElement("div");
            rowDiv.setAttribute("id", `row-${row}`);
            rowDiv.setAttribute("class", "row");
            boardView.appendChild(rowDiv);
            for (let col = 0; col < this.board.width; col++) {
                const randNum = Math.floor(Math.random() * 4);
                const randRotation = Math.floor(Math.random() * 4);
                const cell = document.createElement("div");
                cell.setAttribute("id", `cell-${row}-${col}`);
                //add background information
                switch (boardMap[row][col]) {
                    case '#':
                        cell.setAttribute("class", `tile rotate_${randRotation}`);
                        cell.setAttribute("data-collision", "blocked");
                        cell.setAttribute("data-sprite", `wall_${randNum}`);
                        break;
                    default:
                        cell.setAttribute("class", `tile rotate_${randRotation}`);
                        cell.setAttribute("data-collision", "none");
                        cell.setAttribute("data-sprite", `floor_${randNum}`);
                }
                //add background information
                switch (boardMap[row][col]) {
                    case 'p':
                        this.player.row = row;
                        this.player.col = col;
                        cell.setAttribute("data-foreground_element", "player");
                        break;
                    case 'w':
                        cell.setAttribute("data-foreground_element", "wonder");
                        cell.setAttribute("data-collision", "wonder");
                        break;
                    case 's':
                        cell.setAttribute("data-foreground_element", "stairs");
                        cell.setAttribute("data-collision", "stairs");
                        break;
                    case 'a':
                        cell.setAttribute("data-foreground_element", "artifact");
                        cell.setAttribute("data-collision", "artifact");
                        break;
                    case '?':
                        cell.setAttribute("data-foreground_element", "mystery");
                        cell.setAttribute("data-collision", "mystery");
                        break;
                }
                rowDiv.appendChild(cell);
            }
        }
    }
}

class GameBoardModel {
    constructor() {
        this.height;
        this.width;
        this.blockedTiles;
        this.openTiles;
        this.mysteryTiles;
    }

    checkCollision(rowDestination, colDestination) {
        const destinationCell = document.getElementById(`cell-${rowDestination}-${colDestination}`);
        const collision = destinationCell.getAttribute("data-collision");
        return collision;
    }
}

class PlayerModel {
    constructor() {
        this.row = 0;
        this.col = 0;
        this.maxResolve = 100;
        this.Resolve = 100;
        this.Artifact = 0;
        this.maxWonder = 10;
        this.Wonder = 0;
        this.Floor = 1;
        this.muted = true;
    }
    initializeStats(playSound = true){
        this.updateStat("Floor", 0, playSound);
        this.updateStat("Artifact",0 ,playSound );
        this.updateStat("Wonder", 0, playSound);
        this.updateStat("Resolve", 0, playSound);
    }
    updateStat(stat, change, playSound = true){
        this[stat] += change;
        const additionalText = this[`max${stat}`] ? "/" + this[`max${stat}`] : "";
        document.getElementById(`stat_${stat}`).innerText = `${stat}:  ${this[stat]}${additionalText}`;

        if(!this.muted && playSound){
                const audioTitle = this.Resolve > 0 ? stat : "ZeroResolve";
                const audio = new Audio(`assets/${audioTitle}Sound.ogg`);
                if(audio)
                    audio.play();
        }
    }
    // updateResolve() {
    //     this.currentResolve--;
    //     document.getElementById("resolvePoints").innerText = "Resolve: " + this.currentResolve + "/" + this.maxResolve;
    //     if (this.currentResolve <= 0) {
    //         if(!this.muted)
    //             var audio = new Audio('assets/resolveSound.ogg');
    //         audio.play();
    //     }
    // }
    // updateArtifactPoints() {
    //     this.artifacts++;
    //     var audio = new Audio('assets/artifactSound.ogg');
    //     if(!this.muted)
    //         audio.play();
    //     document.getElementById("artifactPoints").innerText = "Artifacts: " + this.artifacts;
    // }
    // updateWonderPoints() {
    //     this.currentWonder++;
    //     var audio = new Audio('assets/wonderSound.ogg');
    //     if(!this.muted)
    //         audio.play();
    //     document.getElementById("wonderPoints").innerText = "Wonder: " + this.currentWonder + "/" + this.maxWonder;
    // }
    // updateFloor() {
    //     this.currentFloor++;
    //     var audio = new Audio('assets/floorSound.ogg');
    //     if(!this.muted)
    //         audio.play();
    //     document.getElementById("floorDisplay").innerText = `Floor:  ${1+this.currentFloor}`;
    // }
}

class Maps {
    constructor() {
        this.possibleTiles = [' ', '#', 'p', 's', 'a', 'w', '?']
        this.levels = [
            [
                ['#', '#', '#', '#', '#'],
                ['#', 'p', 'w', 'a', '#'],
                ['#', ' ', '?', ' ', '#'],
                ['#', ' ', ' ', 's', '#'],
                ['#', '#', '#', '#', '#']
            ],
            [
                ['#', '#', '#', '#', '#'],
                ['#', 's', 'w', 'a', '#'],
                ['#', ' ', ' ', ' ', '#'],
                ['#', ' ', '?', ' ', '#'],
                ['#', ' ', ' ', 'p', '#'],
                ['#', '#', '#', '#', '#']
            ],
            [
                ['#', '#', '#', '#', '#', '#'],
                ['#', 'p', ' ', ' ', 'a', '#'],
                ['#', ' ', ' ', ' ', ' ', '#'],
                ['#', '?', ' ', 'w', ' ', '#'],
                ['#', ' ', ' ', ' ', ' ', '#'],
                ['#', ' ', 's', ' ', ' ', '#'],
                ['#', '#', '#', '#', '#', '#']
            ],
            [
                ['#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#'],
                ['#', 'a', 'w', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '#'],
                ['#', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', ' ', '  ', '#'],
                ['#', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '#'],
                ['#', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '#'],
                ['#', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '#', '#', '#', '  ', '  ', '  ', '#'],
                ['#', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '#', '#', '#', '  ', '  ', '  ', '#'],
                ['#', '  ', '  ', '  ', 'p', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '#'],
                ['#', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '#'],
                ['#', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '#'],
                ['#', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '#'],
                ['#', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', ' ', '  ', '#'],
                ['#', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '?', '#'],
                ['#', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '#'],
                ['#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#']
            ]
        ]
    }
    
}