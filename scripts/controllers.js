class GameController{
    constructor(tilePixelSize){
        this.addEventListeners();
        this.views = new Views(tilePixelSize, '..//assets//SpriteSheet.png');
        this.models = new Models();
    }

    loadFloor(){
        this.views.mobileTilesVisible(false);
        this.models.initializeBoard(this.views.elements.gameBoard, this.models.player.currentFloor);
        this.models.blockedTiles = document.getElementsByClassName("blocked");
        this.models.openTiles = document.getElementsByClassName("open");
        this.models.blockedTiles = document.getElementsByClassName("mystery");
        this.views.showGameBoard(this.models.board.width, this.models.board.height);
        this.views.showAllSprites();
        this.views.showForeground();
        document.querySelector("#overlay").style.opacity = 0;
        setTimeout(() => { this.views.mobileTilesVisible(true); }, 500);
    }

    movePlayer(rowChange, colChange, floorLoading = false){
        let collide = false 
        const player = this.models.player
        
        if(!floorLoading){
            const board = this.models.board;
            collide = board.checkCollision(player.row+rowChange, player.col+colChange);
        }        
        switch (collide) {
            case "blocked":
                this.views.bumpPlayer(rowChange, colChange);
                break;
            case "mystery":
                this.models.movePlayer(rowChange, colChange);
                this.views.movePlayer(player.row, player.col);
                this.models.player.updateResolve();
                let oneOrZero = (Math.random() >= 0.5) ? 1 : 0;
                if (oneOrZero) {
                    this.models.player.updateArtifactPoints();
                }
                else {
                    this.models.player.updateWonderPoints();
                }
                break;
            case "stairs":
                this.models.movePlayer(rowChange, colChange);
                this.views.movePlayer(player.row, player.col);
                this.models.player.updateResolve();
                this.models.player.updateFloor();
                document.querySelector("#overlay").style.opacity = 1;
                setTimeout(() => { this.loadFloor(); }, 500);
                break;
            case "wonder":
                this.models.movePlayer(rowChange, colChange);
                this.views.movePlayer(player.row, player.col);
                this.models.player.updateResolve();
                this.models.player.updateWonderPoints();
                break;
            case "artifact":
                this.models.movePlayer(rowChange, colChange);
                this.views.movePlayer(player.row, player.col);
                this.models.player.updateResolve();
                this.models.player.updateArtifactPoints();
                break;
            default:
                this.models.movePlayer(rowChange, colChange);
                this.views.movePlayer(player.row, player.col);
                this.models.player.updateResolve();
        }
        if (this.models.player.currentResolve <= 0 || this.models.player.currentWonder >= this.models.player.maxWonder) {
            this.models.player.currentResolve = this.models.player.maxResolve;
            this.models.player.currentWonder = 0;
            this.models.player.currentFloor = 0;
            document.getElementById("floorDisplay").innerText = `Floor:  ${1 + this.models.player.currentFloor}`;
            document.getElementById("resolvePoints").innerText = "Resolve: " + this.models.player.currentResolve + "/" + this.models.player.maxResolve;
            document.getElementById("wonderPoints").innerText = "Wonder: " + this.models.player.currentWonder + "/" + this.models.player.maxWonder;
            document.querySelector("#overlay").style.opacity = 1;
            setTimeout(() => { this.loadFloor(); }, 500);
        }
    }

    addEventListeners(){
        this.keydownEvents();
    }

    keydownEvents() {
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
                    case "Space":
                        let oneOrZero = (Math.random()>=0.5)? 1 : 0;
                        if(oneOrZero){
                            this.models.player.updateArtifactPoints();
                        }
                        else{
                            this.models.player.updateWonderPoints();
                        }
                        break;
                    case 'KeyM':
                        this.models.muted = !this.models.muted;
                        this.models.updateBackgroundMusic();
                        break;
                    default:
                        break;
                }
        });  
    }
}