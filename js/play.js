var PlayState = function (game) {
};

PlayState.prototype = {
    //assets
    player: null,
    platforms: null,
    cursors: null,
    stars: null,
    spikes: null,

    //counters
    starsCount: 17,
    starCollected: 0,
    score: 0,
    lives: 2,

    //text areas
    scoreText: null,
    livesText: null,

    //sounds
    collectSound: null,
    themeSound: null,
    winSound: null,
    loseSound: null,
    hitSound: null,

    //directions
    left: false,
    right: false,
    up: false,

    init: function () {
        this.starCollected = 0;
        this.score = 0;
        this.lives = 2;
        this.scoreText = null;
        this.livesText = null;
    },

    create: function () {
        // This function is called after the preload function     
        // Here we set up the game, display sprites, etc.

        //  A simple background for our game
        var sky = game.add.sprite(0, 0, 'sky');
        sky.scale.setTo(2, 1);

        this.loadSounds();
        this.createPlatforms();
        this.createPlayer();
        this.createStars();
        this.createSpikes();

        // Play thame sound
        this.themeSound.play('', 0, 1, true);

        this.showScore(0);

        this.showLives(this.lives);

        // Our controls.
        this.cursors = game.input.keyboard.createCursorKeys();

        //For mobile
        if (!game.device.desktop) {
            this.createGamepadButtons();
        }
    },
    update: function () {
        // This function is called 60 times per second    
        // It contains the game's logic   

        //  Collide the player and the stars with the platforms
        game.physics.arcade.collide(this.player, this.platforms);
        game.physics.arcade.collide(this.stars, this.platforms);
        //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
        game.physics.arcade.overlap(this.player, this.stars, this.collectStar, null, this);

        game.physics.arcade.collide(this.spikes, this.platforms);
        game.physics.arcade.overlap(this.player, this.spikes, this.touchSpike, null, this);

        this.updateMovement();

        if (this.starCollected === this.starsCount) {
            this.win();
        }
    },
    render: function () {

    },
    showScore: function (points) {
        if (this.scoreText === null) {
            this.scoreText = game.add.text(16, 16, 'Score: ' + points, {fontSize: '32px', fill: '#000'});
        } else {
            this.scoreText.text = 'Score: ' + points;
        }
    },
    showLives: function (lives) {
        if (this.livesText === null) {
            this.livesText = game.add.text(game.world.width - 150, 16, 'Lives: ' + lives, {
                fontSize: '32px',
                fill: '#000'
            });
        } else {
            this.livesText.text = 'Lives: ' + lives;
        }
    },
    loadSounds: function () {
        this.collectSound = game.add.audio('collect');
        this.themeSound = game.add.audio('theme');
        this.winSound = game.add.audio('win');
        this.loseSound = game.add.audio('lose');
        this.hitSound = game.add.audio('hit');
    },
    createPlatforms: function () {
        //scroll world
        game.world.setBounds(0, 0, GameConfig.width + 200, GameConfig.height);

        //  The platforms group contains the ground and the 2 ledges we can jump on
        this.platforms = game.add.group();
        //  We will enable physics for any object that is created in this group
        this.platforms.enableBody = true;

        // Here we create the ground.
        var ground = this.platforms.create(0, game.world.height - 64, 'ground');
        //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
        ground.scale.setTo(3, 2);
        //  This stops it from falling away when you jump on it
        ground.body.immovable = true;

        //  Now let's create two ledges
        var ledge = this.platforms.create(400, 350, 'ground');
        ledge.body.immovable = true;

        ledge = this.platforms.create(-150, 250, 'ground');
        ledge.body.immovable = true;
    },
    createPlayer: function () {
        // The player and its settings
        this.player = game.add.sprite(350, game.world.height - 150, 'dude');
        //  We need to enable physics on the player
        game.physics.arcade.enable(this.player);
        this.player.body.setCircle(22);
        this.player.body.fixedRotation = true;
        //  Player physics properties. Give the little guy a slight bounce.
        this.player.body.bounce.y = 0;
        this.player.body.gravity.y = GameConfig.gravity;
        this.player.body.collideWorldBounds = true;

        // add some animations
        this.player.animations.add('walk_right', [1, 2, 3, 4], 10, true); // (key, framesarray, fps,repeat)
        this.player.animations.add('walk_left', [7, 8, 9, 10], 10, true);
        game.camera.follow(this.player); //always center player
    },
    createStars: function () {
        //  Finally some stars to collect
        this.stars = game.add.group();
        //  We will enable physics for any star that is created in this group
        this.stars.enableBody = true;
        //  Here we'll create 12 of them evenly spaced apart
        for (var i = 0; i < this.starsCount; i++) {
            //  Create a star inside of the 'stars' group
            var star = this.stars.create(i * 70, 0, 'star');
            //  Let gravity do its thing
            star.body.gravity.y = GameConfig.gravity;
            //  This just gives each star a slightly random bounce value
            star.body.bounce.y = 0.2 + Math.random() * 0.2;
        }
    },
    collectStar: function (player, star) {
        this.collectSound.play();

        // Removes the star from the screen
        star.kill();
        //  Add and update the score
        this.score += 10;
        this.starCollected += 1;

        this.showScore(this.score);
    },
    createSpikes: function () {
        var spikesList = [[150, 100], [585, 350]];

        this.spikes = game.add.group();

        this.spikes.enableBody = true;

        for (var i = 0; i < spikesList.length; i++) {
            var spike = this.spikes.create(spikesList[i][0], game.world.height - spikesList[i][1], 'spike');
            spike.body.gravity.y = GameConfig.gravity;
        }
    },
    touchSpike: function (player, spike) {
        this.hitSound.play();

        if (this.lives > 0) {
            this.lives--;

            this.showLives(this.lives);

            player.body.x = 32;
            player.body.y = game.world.height - 150;
        } else {
            player.kill();

            this.lose();
        }
    },
    updateMovement: function () {
        //  Reset the players velocity (movement)
        this.player.body.velocity.x = 0;

        if (this.cursors.left.isDown || this.left) {
            this.moveLeft();
        } else if (this.cursors.right.isDown || this.right) {
            this.moveRight();
        } else {
            //  Stand still
            this.player.animations.stop();
            this.player.frame = 0;
        }

        //in the air
        if (!this.player.body.touching.down) {
            if(this.cursors.left.isDown || this.left) {
                this.player.loadTexture('dude', 11);
            }
            if(this.cursors.right.isDown || this.right) {
                this.player.loadTexture('dude', 5);
            }
        }

        //  Allow the player to jump if they are touching the ground.
        if (this.cursors.up.isDown || this.up) {
            this.moveUp();
        }
    },
    moveLeft: function () {
        //this.player.scale.x = 1;
        this.player.body.velocity.x = GameConfig.playerMovementSpeed * -1;
        this.player.animations.play('walk_left');
    },
    moveRight: function () {
        //this.player.scale.x = 1;
        this.player.body.velocity.x = GameConfig.playerMovementSpeed;
        this.player.animations.play('walk_right');
    },
    moveUp: function () {
        if (this.player.body.touching.down) {
            this.player.body.velocity.y = GameConfig.playerJumpHeight * -1;
        }
    },
    win: function () {
        this.themeSound.stop();
        this.winSound.play();

        game.state.states['endGameScore'] = this.score;

        game.state.start('win');

    },
    lose: function () {
        this.themeSound.stop();
        this.loseSound.play();

        game.state.states['endGameScore'] = this.score;

        game.state.start('lose')
    },
    createGamepadButtons() {
        let that = this;

        let buttonJump = game.add.button(game.world.width - 150, game.world.height - 120, 'buttonjump', null, this, 0, 1, 0, 1);  //game, x, y, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame
        buttonJump.fixedToCamera = true;  //our buttons should stay on the same place
        buttonJump.events.onInputOver.add(function () {
            that.up = true;
        });
        buttonJump.events.onInputOut.add(function () {
            that.up = false;
        });
        buttonJump.events.onInputDown.add(function () {
            that.up = true;
        });
        buttonJump.events.onInputUp.add(function () {
            that.up = false;
        });

        let buttonLeft = game.add.button(10, game.world.height - 100, 'buttonhorizontal', null, this, 0, 1, 0, 1);
        buttonLeft.fixedToCamera = true;
        buttonLeft.events.onInputOver.add(function () {
            that.left = true;
        });
        buttonLeft.events.onInputOut.add(function () {
            that.left = false;
        });
        buttonLeft.events.onInputDown.add(function () {
            that.left = true;
        });
        buttonLeft.events.onInputUp.add(function () {
            that.left = false;
        });

        let buttonRight = game.add.button(160, game.world.height - 100, 'buttonhorizontal', null, this, 0, 1, 0, 1);
        buttonRight.fixedToCamera = true;
        buttonRight.events.onInputOver.add(function () {
            that.right = true;
        });
        buttonRight.events.onInputOut.add(function () {
            that.right = false;
        });
        buttonRight.events.onInputDown.add(function () {
            that.right = true;
        });
        buttonRight.events.onInputUp.add(function () {
            that.right = false;
        });
    }
};