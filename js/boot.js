var BootState = function(game){};

BootState.prototype = {
   create: function () {
       this.toggleFullScreen(game.state.states['fullScreen']);

       //  We're going to be using physics, so enable the Arcade Physics system
       game.physics.startSystem(Phaser.Physics.ARCADE);

       game.state.start('load');
   },

   toggleFullScreen: function (fullScreenMode) {
       if (true === fullScreenMode) {
           game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
           game.scale.minWidth = window.innerWidth;
           game.scale.minHeight = window.innerHeight;
       } else {
           game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
           game.scale.minWidth = 800;
           game.scale.minHeight = 600;
       }
   }
};

//
// function BootState(game){
//     this.create = function () {
//         this.toggleFullScreen(game.state.states['fullScreen']);
//
//         //  We're going to be using physics, so enable the Arcade Physics system
//         game.physics.startSystem(Phaser.Physics.ARCADE);
//
//         game.state.start('load');
//     },
//
//     this.toggleFullScreen = function (fullScreenMode) {
//         if (true === fullScreenMode) {
//             game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
//             game.scale.minWidth = window.innerWidth;
//             game.scale.minHeight = window.innerHeight;
//             game.scale.refresh();
//         } else {
//             game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
//             game.scale.minWidth = 800;
//             game.scale.minHeight = 600;
//             game.scale.refresh();
//         }
//     }
// }