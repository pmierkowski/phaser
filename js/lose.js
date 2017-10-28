var loseState = {
    create: function () {
        game.add.text(16, 16, 'You LOSE, your points: ' + game.state.states['endGameScore'], {fontSize: '32px', fill: '#fff'});
        game.add.text(16, game.world.height - (16 + 32), 'Press the "Spacebar" key to restart', {fontSize: '32px', fill: '#fff'});
        game.add.text(16, game.world.height - (16 + 32) * 2, 'Press the "M" key to return to main menu', {fontSize: '32px', fill: '#fff'});

        var startKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        var menuKey = game.input.keyboard.addKey(Phaser.Keyboard.M);

        startKey.onDown.addOnce(this.restart, this);
        menuKey.onDown.addOnce(this.menu, this);
    },

    restart: function () {
        game.state.start('play', true, false);
    },
    
    menu: function () {
        game.state.start('menu', true, false);
    }
};