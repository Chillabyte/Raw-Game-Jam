class GameController{
    constructor(width, height, tilePixelSize = 16 ){
        this.addEventListeners();
        this.views = new Views(tilePixelSize, '..//assets//SpriteSheet.png');
        this.models = new Models(height, width);  
    }

    startGame(){
        const transitionTime = parseFloat(getComputedStyle(this.views.elements.player)["transitionDuration"]);
        this.movePlayer(Math.floor(this.models.board.width/2), Math.floor(this.models.board.height/2), true);
        this.models.board.initializeBoard(this.views.elements.gameBoard);
        this.models.blockedTiles = document.getElementsByClassName("blocked");
        this.models.openTiles = document.getElementsByClassName("open");
        const view = this.views;
        setTimeout(function(){ view.playerVisible(true); }, transitionTime * 1000);
        view.showAllSprites();
    }

    movePlayer(xChange, yChange, initialize = false){
        let collide = false 
        const player = this.models.player
        
        if(!initialize){
            const board = this.models.board;
            collide = board.checkCollision(player.x+xChange, player.y+yChange);
        }        

        if(collide){
            this.views.bumpPlayer(xChange, yChange);
        }else{
            this.models.movePlayer(xChange, yChange)
            this.views.movePlayer(player.x, player.y);
        }
    }



    addEventListeners(){
        this.keydownEvents();
    }

    keydownEvents(){
        document.addEventListener('keydown', e =>{       
            switch (e.code){
                case 'ArrowDown': case 'Numpad2': case 'KeyJ':
                    this.movePlayer(0,1);
                    break;
                case 'ArrowUp': case 'Numpad8': case 'KeyK':
                        this.movePlayer(0,-1);
                    break;
                case 'ArrowRight': case 'Numpad6': case 'KeyL':
                        this.movePlayer(1,0);
                    break;
                case 'ArrowLeft': case 'Numpad4': case 'KeyH':
                        this.movePlayer(-1,0);
                    break;
                case 'Numpad7': case 'KeyY':
                        this.movePlayer(-1,-1);
                    break;
                case 'Numpad9': case 'KeyU':
                        this.movePlayer(1,-1);
                    break;
                case 'Numpad1': case 'KeyB':
                        this.movePlayer(-1,1);
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