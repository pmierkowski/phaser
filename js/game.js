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
//+ sterowanie na komorce
//+ sensowna architektówa
//test na komórkach - na mobilnym chromie dziala lipnie
//+fullscrean
// zachowane proporcje przy foolscrean
//+ sterowanie joystickami
//przewijane mapy w poziomie
//ładniejsze platformy
//ładniejsza podłoga
//animowane gwiazdki
//+ klikalne menu
//dźwęk klikania w menu
//jakieś wspólne dźwięki, jakieś consty, wspólne biblioteki
//+ w grze ustawianie nicka, zapisywanie wyników i ich wyświetlanie na koncu wyników
//+ w nodejs odbieranie wyników, zapis do SQLite i zwracanie wyników
//przeniesc ustawienia domen oraz dozwolonych domen do configów
//restowe api w php
//sprawdzic chodzenie w lewo prawo - mozna recznie zdublowac i odwricic obrazki :)