class GameController{
    constructor(tilePixelSize){
        this.addEventListeners();
        this.views = new Views(tilePixelSize, '..//assets//SpriteSheet.png');
        this.models = new Models();
        this.firstKeyPress = true;
    }

    loadFloor(){
        this.views.mobileTilesVisible(false);
        this.models.initializeBoard(this.views.elements.gameBoard, this.models.player.Floor-1);
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
            this.models.player.updateStat("Resolve", -1);
        }        
        switch (collide) {
            case "blocked":
                this.views.bumpPlayer(rowChange, colChange);
                break;
            case "mystery":
                this.models.movePlayer(rowChange, colChange);
                this.views.movePlayer(player.row, player.col);
                
                let oneOrZero = (Math.random() >= 0.5) ? 1 : 0;
                if (oneOrZero) {
                    this.models.player.updateStat("Artifact", 1);
                }
                else {
                    this.models.player.updateStat("Wonder", 1);
                }
                break;
            case "stairs":
                this.models.movePlayer(rowChange, colChange);
                this.views.movePlayer(player.row, player.col);
                this.models.player.updateStat("Floor", 1);
                document.querySelector("#overlay").style.opacity = 1;
                setTimeout(() => { this.loadFloor(); }, 500);
                break;
            case "wonder":
                this.models.movePlayer(rowChange, colChange);
                this.views.movePlayer(player.row, player.col);
                this.models.player.updateStat("Wonder", 1);
                break;
            case "artifact":
                this.models.movePlayer(rowChange, colChange);
                this.views.movePlayer(player.row, player.col);
                this.models.player.updateStat("Artifact", 1);
                break;
            default:
                this.models.movePlayer(rowChange, colChange);
                this.views.movePlayer(player.row, player.col);
        }
        if (this.models.player.Resolve <= 0 || this.models.player.Wonder >= this.models.player.maxWonder) {
            this.models.player.Resolve = this.models.player.maxResolve;
            this.models.player.Wonder = 0;
            this.models.player.Floor = 1;
            document.getElementById("stat_Floor").innerText = `Floor:  ${this.models.player.Floor}`;
            document.getElementById("stat_Resolve").innerText = "Resolve: " + this.models.player.Resolve + "/" + this.models.player.maxResolve;
            document.getElementById("stat_Wonder").innerText = "Wonder: " + this.models.player.Wonder + "/" + this.models.player.maxWonder;
            document.querySelector("#overlay").style.opacity = 1;
            setTimeout(() => { this.loadFloor(); }, 500);
        }
    }

    addEventListeners(){
        this.keydownEvents();
        
        document.querySelector("#shop_Resolve_button").addEventListener("click", () => {
            if(this.models.player.Artifact >= 25){
                this.models.player.maxResolve = this.models.player.maxResolve + 10;
                document.getElementById("stat_Resolve").innerText = "Resolve: " + this.models.player.Resolve + "/" + this.models.player.maxResolve;
                this.models.player.Artifact = this.models.player.Artifact - 25;
                document.getElementById("stat_Artifact").innerText = "Artifact: " + this.models.player.Artifact;
            }
        });
        document.querySelector("#shop_Wonder_button").addEventListener("click", () => {
            if(this.models.player.Artifact >= 50){
                this.models.player.maxWonder = this.models.player.maxWonder + 5;
                document.getElementById("stat_Wonder").innerText = "Wonder: " + this.models.player.Wonder + "/" + this.models.player.maxWonder;
                this.models.player.Artifact = this.models.player.Artifact - 50;
                document.getElementById("stat_Artifact").innerText = "Artifact: " + this.models.player.Artifact;
            }
        });
    }

    keydownEvents() {
        //Some browsers require user interaction to play sound, so we initialize the sound on the first key press.
        document.addEventListener('keydown', e =>{ 
            if (this.firstKeyPress){
                this.models.updateBackgroundMusic(true);
                this.firstKeyPress = false;
            }
        }),

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