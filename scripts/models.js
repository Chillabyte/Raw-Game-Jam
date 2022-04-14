class Models{
    constructor(height, width){
        this.board = new GameBoardModel(width, height);
        this.player = new PlayerModel();
    }

    movePlayer(xChange, yChange){
        this.player.x += xChange;
        this.player.y += yChange;
    }
}

class GameBoardModel{
    constructor(width, height){
        this.width = width;
        this.height = height;
        this.blockedTiles;
        this.openTiles;
    }

    initializeBoard(board){
        for(let x=0; x<this.height; x++){
            const row = document.createElement("div");
            row.setAttribute("id", `row-${x}`);
            row.setAttribute("class", "row")
            board.appendChild(row);
            for(let y=0; y<this.width; y++){
                const randNum = Math.floor(Math.random() * 4);
                const randRotation = Math.floor(Math.random() * 4);
                const cell = document.createElement("div");
                cell.setAttribute("id", `cell-${x}-${y}`)
                
                const randWall = Math.floor(Math.random() * 10) == 0;
                const border =(x == 0 ) || (x==this.height-1) || (y == 0) || (y ==this.width-1);
                if(border || randWall){
                    cell.setAttribute("class", `tile wall_${randNum} rotate_${randRotation}`);
                    cell.setAttribute("data-collision", "blocked");
                }else{
                    cell.setAttribute("class", `tile floor_${randNum} rotate_${randRotation} open`);
                    cell.setAttribute("data-collision", "none");
                }


                row.appendChild(cell);
            }
        }
    }

    checkCollision(YDestination, XDestination){
        const destinationCell = document.getElementById(`cell-${XDestination}-${YDestination}`);
        const collision = destinationCell.getAttribute("data-collision");
        return collision != "none"

    }
}

class PlayerModel{
    constructor(){
        this.x = 0;
        this.y = 0;
    }
}
