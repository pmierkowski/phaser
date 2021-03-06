Common = function () {
};

Common.prototype = {

    optionCount: 1,

    /**
     * Add menu option
     * @param text
     * @param letter eg.: Phaser.Keyboard.SPACEBAR
     * @param callback function
     */
    addMenuOption: function (text, letter, callback) {
        let optionStyle = {fontSize: '32px', fill: '#fff'};
        let txt = game.add.text(16, game.world.height - (16 + 32) * this.optionCount, text, optionStyle);

        txt.stroke = "rgba(0,0,0,0";
        txt.strokeThickness = 4;
        let onOver = function (target) {
            target.fill = "#FEFFD5";
            target.stroke = "rgba(200,200,200,0.5)";
            txt.useHandCursor = true;
        };
        let onOut = function (target) {
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
     * @param userName
     * @param score
     * @param callbackDone
     */
    saveScore(userName, score, callbackDone) {
        $.post(this.getRestEndpoint() + 'users', {name: userName, score: score})
            .done(function (data) {
                if (typeof callbackDone === 'function') {
                    callbackDone();
                }
            });
    },

    /**
     * Print hiscores
     */
    showHiScores() {
        $.get(this.getRestEndpoint() + 'users')
            .done(function (data) {
                let textGroup = game.add.group();

                textGroup.add(game.make.text(360, 120, 'Top 10 HiScores:', {
                    font: "28px Arial",
                    fill: "white"
                }));
                for (let i = 0; i < data.length; i++) {
                    textGroup.add(game.make.text(360, 160 + i * 26, data[i].name + ' - ' + data[i].score, {
                        font: "20px Arial",
                        fill: "white"
                    }));
                }
            });
    },

    getRestEndpoint() {
        if('localhost' === window.location.hostname) {
            return GameConfig.restNodeEndpoint;
        }
        else{
            return GameConfig.restPhpEndpoint;
        }
    }
};