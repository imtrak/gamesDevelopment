import { ScoreBoard } from "./components/scoreBoard";
var spacebar;
var maximunPipeUp = 350;
var minimunPipeUp = 600;

var maximunPipeDown = 150;
var minimunPipeDown = -100;
var pipeCentralizer = 70;

export class Game extends Phaser.Scene {
    constructor() {
        super({ key: 'game' });
    }

    init(){
        this.scoreboard = new ScoreBoard(this);
    }
    

    preload() {
        // load your assets here...
        this.load.image('background', 'assets/images/background2.png');
        this.load.image('ironmanFalling', 'assets/images/Iron Man-4.png.png');
        this.load.image('pipeDown', 'assets/images/pipeDown.png');
        this.load.image('pipeUp', 'assets/images/pipeUp.png');
        this.load.image('game_over_message', 'assets/images/game_over.png');
    }

    

    create() {
        // create anime script here...
        this.add.sprite(400, 250, 'background');
        
        this.player = this.physics.add.sprite(80, 250, 'ironmanFalling').setImmovable();

        this.player.setCollideWorldBounds(true);
        this.player.setScale(0.3);
        this.player.setSize(100,80);
        this.player.setOffset(60, 100);

        spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.newObstacle();

        this.scoreboard.create();
    }

    newObstacle() {
        const obstacle = this.physics.add.group();
        
        const ubicationPipeUp = Phaser.Math.Between(maximunPipeUp, minimunPipeUp);

        const pipe = obstacle.create(900, ubicationPipeUp, 'pipeUp');
        const pipe2 = obstacle.create(900, ubicationPipeUp - 450, 'pipeDown')
        const pipePoint = this.physics.add.sprite(900, ubicationPipeUp - 250, 'pipeUp')
        
        pipePoint.body.allowGravity = false;
        pipePoint.setScale(0.4);
        pipePoint.visible = false;

        pipe.body.allowGravity = false;
        pipe.setScale(0.4);
        pipe2.body.allowGravity = false;
        pipe2.setScale(0.4);


        pipePoint.setVelocityX(-100);
        pipePoint.checkWorldBounds = true
        pipePoint.outOfBoundsKill = true

        this.physics.add.collider(this.player, pipePoint, this.points, null, this)

        obstacle.setVelocityX(-100);
        obstacle.checkWorldBounds = true
        obstacle.outOfBoundsKill = true

        this.time.delayedCall(3000, this.newObstacle,[],this)
        this.physics.add.overlap(this.player, obstacle, this.lose, null, this)
    }

    points(player, pipePoint) {
        pipePoint.disableBody(true, true);
        this.scoreboard.incrementPoints(1);
    }

    lose() {
        this.gameOverMessage = this.add.sprite(400, 100, 'game_over_message');
        this.gameOverMessage.setScale(0.4);
        this.scene.pause();
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(spacebar))
        {
            this.player.setVelocity(0, -350);
        }
    }
} 