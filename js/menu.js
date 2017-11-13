var MenuState = function (game) {
};

MenuState.prototype = {
    common: null,
    userName: null,
    defaultUserName: 'Master Gamer',

    preload: function () {
        this.common = new Common();
        game.add.plugin(PhaserInput.Plugin);
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

        //Input text field
        this.userName = game.add.inputField(16, 150, {
            font: '18px Arial',
            fill: '#212121',
            fontWeight: 'bold',
            width: 250,
            padding: 8,
            borderWidth: 1,
            borderColor: '#000',
            borderRadius: 6,
            placeHolder: 'Enter your name',
        });

        // get user name from cookie
        if ($.cookie('userName')) {
            this.userName.setText($.cookie('userName'));
        }
    },

    start: function () {
        // set user name in cookie
        if (this.userName.value.length > 0) {
            $.cookie('userName', this.userName.value);
        }
        else {
            $.cookie('userName', this.defaultUserName);
        }

        game.state.start('play');
    },

    toggleFullScreen: function () {
        game.state.states['fullScreen'] = true !== game.state.states['fullScreen'];
        game.state.start('boot', true, false);
    }
};