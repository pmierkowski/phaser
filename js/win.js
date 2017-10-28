var WinState = function (game) {
};

WinState = {
    common: null,

    preload: function () {
        this.common = new Common();
    },

    create: function () {
        var that = this;

        game.add.text(16, 16, 'You WIN, your points: ' + +game.state.states['endGameScore'], {
            fontSize: '32px',
            fill: '#fff'
        });

        this.common.addMenuOption('Main menu "M"', Phaser.Keyboard.M, function (e) {
            that.menu();
        });
        this.common.addMenuOption('Restart "Spacebar"', Phaser.Keyboard.SPACEBAR, function (e) {
            that.restart();
        });
    },

    restart: function () {
        game.state.start('play', true, false);
    },

    menu: function () {
        game.state.start('menu', true, false);
    }
};