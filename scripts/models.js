class Models {
    constructor() {
        this.player = new PlayerModel();
        this.maps = new Maps();
        this.board = new GameBoardModel();
    }

    movePlayer(rowChange, colChange) {
        this.player.row += rowChange;
        this.player.col += colChange;
    }

    initializeBoard(boardView, level) {
        this.board = new GameBoardModel();
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
        return collision;/* != "none"*/
    }
}

class PlayerModel {
    constructor() {
        this.row = 0;
        this.col = 0;
        this.maxResolve = 100;
        this.currentResolve = 100;
        this.artifacts = 0;
        this.maxWonder = 10;
        this.currentWonder = 0;
        this.currentFloor = 0;
    }
    updateResolve() {
        this.currentResolve--;
        document.getElementById("resolvePoints").innerText = "Resolve: " + this.currentResolve + "/" + this.maxResolve;
        if (this.currentResolve <= 0) {
            var audio = new Audio('assets/emptyResolveSound.ogg');
            audio.play();
        }
    }
    updateArtifactPoints() {
        this.artifacts++;
        var audio = new Audio('assets/artifactSound.ogg');
        audio.play();
        document.getElementById("artifactPoints").innerText = "Artifacts: " + this.artifacts;
    }
    updateWonderPoints() {
        this.currentWonder++;
        var audio = new Audio('assets/wonderSound.ogg');
        audio.play();
        document.getElementById("wonderPoints").innerText = "Wonder: " + this.currentWonder + "/" + this.maxWonder;
    }
    updateFloor() {
        this.currentFloor++;
        var audio = new Audio('assets/stairsSound.ogg');
        audio.play();
        document.getElementById("floorDisplay").innerText = "Floor: " + this.currentFloor;
    }
}

class Maps {
    constructor() {
        this.levels = [
            [
                ['#', '#', '#', '#', '#'],
                ['#', 'p', 'w', 'a', '#'],
                ['#', ' ', ' ', ' ', '#'],
                ['#', ' ', '?', ' ', '#'],
                ['#', ' ', ' ', 's', '#'],
                ['#', '#', '#', '#', '#']
            ],
            [
                ['#', '#', '#', '#', '#'],
                ['#', '', 'w', 'a', '#'],
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
                ['#', '#', '#', '#', '#', '#', '#', '#','#', '#', '#','#', '#', '#','#'],
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
                ['#', '#', '#', '#', '#', '#', '#', '#' , '#', '#','#', '#', '#','#', '#']
            ]
        ]
    }    
}