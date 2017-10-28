var menuState = {
    create: function () {
        game.add.text(16, 16, 'HunGRy Monster Game', {fontSize: '32px', fill: '#fff'});
        game.add.text(16, game.world.height - (16 + 32), 'Press the "Spacebar" key to start', {fontSize: '32px', fill: '#fff'});
        game.add.text(16, game.world.height - (16 + 32) * 2, 'Press the "F" to toggle FullScreen', {fontSize: '32px', fill: '#fff'});

        var startKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        var fullScreenKey = game.input.keyboard.addKey(Phaser.Keyboard.F);

        startKey.onDown.addOnce(this.start, this);
        fullScreenKey.onDown.addOnce(this.toggleFullScreenKeyUp);
    },

    start: function () {
        game.state.start('play');
    },

    toggleFullScreenKeyUp: function () {
        game.state.states['fullScreen'] = true !== game.state.states['fullScreen'];
        game.state.start('boot', true, false);
    }
};