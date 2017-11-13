var LoseState = function (game) {
};

LoseState.prototype = {
    common: null,

    preload: function () {
        this.common = new Common();
    },

    create: function () {
        var that = this;
        var endGameScore = game.state.states['endGameScore'];

        game.add.text(16, 16, 'You LOSE, your points: ' + endGameScore, {
            fontSize: '32px',
            fill: '#fff'
        });

        this.common.addMenuOption('Main menu "M"', Phaser.Keyboard.M, function (e) {
            that.menu();
        });
        this.common.addMenuOption('Restart "Spacebar"', Phaser.Keyboard.SPACEBAR, function (e) {
            that.restart();
        });

        this.common.saveScore($.cookie('userName'), endGameScore);

        var that = this;
        setTimeout(function () {
            that.common.showHiScores();
        }, 500);
    },

    restart: function () {
        game.state.start('play', true, false);
    },

    menu: function () {
        game.state.start('menu', true, false);
    }
};