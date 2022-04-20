class GameBoardModel{
    constructor(){
        this.height ;
        this.width;
        this.blockedTiles;
        this.openTiles;
    }

    checkCollision(YDestination, XDestination){
        const destinationCell = document.getElementById(`cell-${XDestination}-${YDestination}`);
        const collision = destinationCell.getAttribute("data-collision");
        return collision != "none"

    }
}