// Initialize Phaser, and create a 800px by 600px game
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameDiv');

// Add the 'mainState' and call it 'main'
game.state.add('boot', BootState);
game.state.add('load', LoadState);
game.state.add('menu', MenuState);
game.state.add('play', PlayState);
game.state.add('win', WinState);
game.state.add('lose', LoseState);

// Start the state to actually start the game
game.state.start('boot');

//TODO
//sensowna architektówa
//test na komórkach
//fullscrean 
//sterowanie joystickami
//przewijane mapy w poziomie
//obejrzeć wszystkie przykłady
//ładniejsze platformy
//ładniejsza podłoga
//animowane gwiazdki
//klikalne menu
//dźwęk klikania
//jakieś wspólne dźwięki, jakieś consty, wspólne biblioteki
//przejrzeć kod jakichś przykładowych gierek

// function toggleFullScreen() {
//   if ((document.fullScreenElement && document.fullScreenElement !== null) ||
//    (!document.mozFullScreen && !document.webkitIsFullScreen)) {
//     if (document.documentElement.requestFullScreen) {
//       document.documentElement.requestFullScreen();
//     } else if (document.documentElement.mozRequestFullScreen) {
//       document.documentElement.mozRequestFullScreen();
//     } else if (document.documentElement.webkitRequestFullScreen) {
//       document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
//     }
//   } else {
//     if (document.cancelFullScreen) {
//       document.cancelFullScreen();
//     } else if (document.mozCancelFullScreen) {
//       document.mozCancelFullScreen();
//     } else if (document.webkitCancelFullScreen) {
//       document.webkitCancelFullScreen();
//     }
//   }
// }