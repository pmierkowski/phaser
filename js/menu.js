var MenuState = function (game) {
};

MenuState.prototype = {
    common: null,

    preload: function () {
        this.common = new Common();
    },

    create: function () {
        var that = this;

        game.add.text(16, 16, 'HunGRy Monster Game', {fontSize: '32px', fill: '#fff'});

        this.common.addMenuOption('FullScreen "F"', Phaser.Keyboard.F, function (e) {
            that.toggleFullScreen();
        });
        this.common.addMenuOption('Start "Spacebar"', Phaser.Keyboard.SPACEBAR, function (e) {
            that.start();
        });
    },

    start: function () {
        game.state.start('play');
    },

    toggleFullScreen: function () {
        game.state.states['fullScreen'] = true !== game.state.states['fullScreen'];
        game.state.start('boot', true, false);
    }
};