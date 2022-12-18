export class ScoreBoard {
    constructor(scene){
        this.relatedScene = scene;
        this.score = 0;
    }

    create () {
        this.scoreText = this.relatedScene.add.text(400, 100, '0', {
            fontSize: '50px',
            fill: '#fff',
            fontFamily: 'verdana, arial, sans-serif'
        });
        this.scoreText.setDepth(4);
    }

    incrementPoints(points) {
        this.score += points;
        this.scoreText.setText(''+this.score)
    }
}