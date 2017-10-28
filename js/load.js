var LoadState = function (game) {
};

LoadState.prototype = {
    preload: function () {
        game.add.text(16, game.world.height / 2 - 32, 'Loading ...', {fontSize: '32px', fill: '#fff'});

        //Images
        game.load.image('sky', 'assets/images/sky.png');
        game.load.image('ground', 'assets/images/platform.png');
        game.load.image('star', 'assets/images/star.png');
        game.load.spritesheet('dude', 'assets/images/dude.png', 32, 48);
        game.load.image('spike', 'assets/images/diamond.png');

        //Sounds
        game.load.audio('collect', 'assets/sounds/collect.mp3');
        game.load.audio('theme', 'assets/sounds/theme.mp3');
        game.load.audio('win', 'assets/sounds/win.mp3');
        game.load.audio('lose', 'assets/sounds/lose.mp3');
        game.load.audio('hit', 'assets/sounds/hit.mp3');
    },

    create: function () {
        game.state.start('menu');
    }
};