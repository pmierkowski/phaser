// Initialize Phaser, and create a 800px by 600px game
game = new Phaser.Game(GameConfig.width, GameConfig.height, Phaser.AUTO, 'gameDiv');

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
//sterowanie na komorce
//+ sensowna architektówa
//test na komórkach
//+fullscrean
// zachowane proporcje przy foolscrean
//sterowanie joystickami
//przewijane mapy w poziomie
//obejrzeć wszystkie przykłady
//ładniejsze platformy
//ładniejsza podłoga
//animowane gwiazdki
//+ klikalne menu
//dźwęk klikania
//jakieś wspólne dźwięki, jakieś consty, wspólne biblioteki
//przejrzeć kod jakichś przykładowych gierek
//+ w grze ustawianie nicka, zapisywanie wyników i ich wyświetlanie na koncu wyników
//+ w nodejs odbieranie wyników, zapis do SQLite i zwracanie wyników
//przeniesc ustawienia domen oraz dozwolonych domen do configów