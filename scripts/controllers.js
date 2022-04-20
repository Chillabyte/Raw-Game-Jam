class GameController{
    constructor(tilePixelSize){
        this.addEventListeners();
        this.views = new Views(tilePixelSize, '..//assets//SpriteSheet.png');
        this.models = new Models();  
    }

    startGame(){
        const transitionTime = parseFloat(getComputedStyle(this.views.elements.player)["transitionDuration"]);
        this.models.initializeBoard(this.views.elements.gameBoard, "template");
        this.movePlayer(0,0,true);
        this.models.blockedTiles = document.getElementsByClassName("blocked");
        this.models.openTiles = document.getElementsByClassName("open");
        const view = this.views;
        setTimeout(function(){ view.playerVisible(true); }, transitionTime * 1000);
        view.showGameBoard(this.models.board.width, this.models.board.height);
        view.showAllSprites();
        view.showForeground();
    }

    movePlayer(rowChange, colChange, initialize = false){
        let collide = false 
        const player = this.models.player
        
        if(!initialize){
            const board = this.models.board;
            collide = board.checkCollision(player.row+rowChange, player.col+colChange);
        }        

        if(collide){
            this.views.bumpPlayer(rowChange, colChange);
        }else{
            this.models.movePlayer(rowChange, colChange)
            this.views.movePlayer(player.row, player.col);
        }
    }



    addEventListeners(){
        this.keydownEvents();
    }

    keydownEvents(){
        document.addEventListener('keydown', e =>{       
            switch (e.code){
                case 'ArrowDown': case 'Numpad2': case 'KeyJ': case 'KeyS':
                    this.movePlayer(1,0);
                    break;
                case 'ArrowUp': case 'Numpad8': case 'KeyK': case 'KeyW':
                        this.movePlayer(-1,0);
                    break;
                case 'ArrowRight': case 'Numpad6': case 'KeyL': case 'KeyD':
                        this.movePlayer(0,1);
                    break;
                case 'ArrowLeft': case 'Numpad4': case 'KeyH': case 'KeyA':
                        this.movePlayer(0,-1);
                    break;
                case 'Numpad7': case 'KeyY':
                        this.movePlayer(-1,-1);
                    break;
                case 'Numpad9': case 'KeyU':
                        this.movePlayer(-1,1);
                    break;
                case 'Numpad1': case 'KeyB':
                        this.movePlayer(1,-1);
                    break;
                case 'Numpad3': case 'KeyN':
                        this.movePlayer(1,1);
                    break;
                default:
                    break;

            }
        });  
    }
}