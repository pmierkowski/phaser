Common = function () {
};

Common.prototype = {

    optionCount: 1,

    scoreRestEndpoint: "http://localhost:3000/users",

    /**
     * Add menu option
     * @param game
     * @param text
     * @param letter eg.: Phaser.Keyboard.SPACEBAR
     * @param callback function
     */
    addMenuOption: function (text, letter, callback) {
        var optionStyle = {fontSize: '32px', fill: '#fff'};
        var txt = game.add.text(16, game.world.height - (16 + 32) * this.optionCount, text, optionStyle);

        txt.stroke = "rgba(0,0,0,0";
        txt.strokeThickness = 4;
        var onOver = function (target) {
            target.fill = "#FEFFD5";
            target.stroke = "rgba(200,200,200,0.5)";
            txt.useHandCursor = true;
        };
        var onOut = function (target) {
            target.fill = "white";
            target.stroke = "rgba(0,0,0,0)";
            txt.useHandCursor = false;
        };
        //txt.useHandCursor = true;
        txt.inputEnabled = true;
        txt.events.onInputUp.add(callback, this);
        txt.events.onInputOver.add(onOver, this);
        txt.events.onInputOut.add(onOut, this);

        //keyboard shortcut
        game.input.keyboard.addKey(letter).onDown.addOnce(callback, this);

        this.optionCount++;
    },

    /**
     * Save user score and show hiscore
     * @param string userName
     * @param int score
     * @param function callbackDone
     */
    saveScore(userName, score, callbackDone) {
        $.post(this.scoreRestEndpoint, {name: userName, score: score})
            .done(function (data) {
                if(typeof callbackDone === 'function') {
                    callbackDone();
                }
            });
    },

    /**
     * Print hiscores
     */
    showHiScores() {
        $.get(this.scoreRestEndpoint)
            .done(function (data) {
                var textGroup = game.add.group();

                textGroup.add(game.make.text(300, 110, 'Top 10 HiScores:', {
                    font: "28px Arial",
                    fill: "white"
                }));
                for (var i = 0; i < data.length; i++) {
                    textGroup.add(game.make.text(300, 150 + i * 26, data[i].name + ' - ' + data[i].score, {
                        font: "20px Arial",
                        fill: "white"
                    }));
                }
            });
    }
};