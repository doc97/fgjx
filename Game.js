class Terminal {
    constructor(state) {
        this.command = state.add.text(16, state.world.height - 32, '$ ', { font: '15px Arial', fill: '#ffffff' });
        this.buffer = state.add.text(16, state.world.height - 32, '', { font: '15px Arial', fill: '#ffffff' });
        this.buffer.anchor.setTo(0, 1);

        state.input.keyboard.addCallbacks(this, null, null, function(ch) { this.command.setText(this.command.text + ch, true); });

        this.enterKey = state.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        this.enterKey.onDown.add(function() {
            var cmdStr = this.command.text.substring(2, this.command.text.length);
            var cmd = cmdStr.split(' ');

            this.command.setText('$ ', true);

            if (cmd[0] === 'clear') {
                this.buffer.setText('');
            } else if (cmd[0] === 'print' && cmd.length > 1) {
                this.buffer.setText(this.buffer.text + '\n' + cmd[1]);
            } else {
                this.command.setText('$ ', true);
                this.buffer.setText(this.buffer.text + '\n' + cmd + ': command not found');
            }
        }, this);

        this.backspaceKey = state.input.keyboard.addKey(Phaser.Keyboard.BACKSPACE);
        this.backspaceKey.onDown.add(function() {
            if (this.command.text.length > 2) {
                this.command.setText(this.command.text.substring(0, this.command.text.length - 1));
            }
        }, this);

        this.destroy = function() {
            this.command.kill();
            this.buffer.kill();
            this.enterKey.kill();
            this.backspaceKey.kill();
        };
    }
}



/* Game code */
var content = [
    "The sky above the port was the color of television, tuned to a dead channel.",
    "`It's not like I'm using,' Case heard someone say, as he shouldered his way ",
    "through the crowd around the door of the Chat. `It's like my body's developed",
    "this massive drug deficiency.' It was a Sprawl voice and a Sprawl joke.",
    "The Chatsubo was a bar for professional expatriates; you could drink there for",
    "a week and never hear two words in Japanese.",
    "",
    "Ratz was tending bar, his prosthetic arm jerking monotonously as he filled a tray",
    "of glasses with draft Kirin. He saw Case and smiled, his teeth a webwork of",
    "East European steel and brown decay. Case found a place at the bar, between the",
    "unlikely tan on one of Lonny Zone's whores and the crisp naval uniform of a tall",
    "African whose cheekbones were ridged with precise rows of tribal scars. `Wage was",
    "in here early, with two joeboys,' Ratz said, shoving a draft across the bar with",
    "his good hand. `Maybe some business with you, Case?'",
    "",
    "Case shrugged. The girl to his right giggled and nudged him.",
    "The bartender's smile widened. His ugliness was the stuff of legend. In an age of",
    "affordable beauty, there was something heraldic about his lack of it. The antique",
    "arm whined as he reached for another mug.",
    "",
    "",
    "From Neuromancer by William Gibson"
];

var line = [];

var wordIndex = 0;
var lineIndex = 0;

var wordDelay = 120;
var lineDelay = 400;


BasicGame.Game = function (game) {

    // When a State is added to Phaser it automatically has the following
	// properties set on it, even if they already exist:

    this.game;      // a reference to the currently running game (Phaser.Game)
    this.add;       // used to add sprites, text, groups, etc
					// (Phaser.GameObjectFactory)
    this.camera;    // a reference to the game camera (Phaser.Camera)
    this.cache;     // the game cache (Phaser.Cache)
    this.input;     // the global input manager. You can access
					// this.input.keyboard, this.input.mouse, as well from it.
					// (Phaser.Input)
    this.load;      // for preloading assets (Phaser.Loader)
    this.math;      // lots of useful common math operations (Phaser.Math)
    this.sound;     // the sound manager - add a sound, play one, set-up
					// markers, etc (Phaser.SoundManager)
    this.stage;     // the game stage (Phaser.Stage)
    this.time;      // the clock (Phaser.Time)
    this.tweens;    // the tween manager (Phaser.TweenManager)
    this.state;     // the state manager (Phaser.StateManager)
    this.world;     // the game world (Phaser.World)
    this.particles; // the particle manager (Phaser.Particles)
    this.physics;   // the physics manager (Phaser.Physics)
    this.rnd;       // the repeatable random number generator
					// (Phaser.RandomDataGenerator)

    // You can use any of these from any function within this State.
    // But do consider them as being 'reserved words', i.e. don't create a
	// property for your own game called "world" or you'll over-write the world
	// reference.
};

BasicGame.Game.prototype = {
    
    create: function () {
        // Honestly, just about anything could go here. It's YOUR game after
		// all. Eat your heart out!
        // text = this.add.text(32, 32, '', { font: "15px Arial", fill:
		// "#19de65" });
        terminal = new Terminal(this);
        // this.nextLine();

        /*
		 * Code for the pause menu
		 */

        // Create a label to use as a button
        pauseButton = this.add.button(this.world.width/2, this.world.height/2, 'pauseButton', function(str) {
	    	// When the pause button is pressed, we pause the game
	        this.paused = true;
	
	        // Then add the menu
	        menu = this.add.sprite(this.world.width/2, this.world.height/2, 'menu');
	        menu.anchor.setTo(0.5, 0.5);
	
	        // And a label to illustrate which menu item was chosen. (This is
			// not
			// necessary)
	        choiseLabel = this.add.text(this.world.width/2, 30, 'Click outside menu to continue', { font: '30px Arial', fill: '#ffffff' });
	        choiseLabel.anchor.setTo(0.5, 0.5);
	    }, this);
        pauseButton.anchor.setTo(0.5, 0.5);
	
	    // Add a input listener that can help us return from being paused
	    this.input.onDown.add(unpause, this);
	
	    // And finally the method that handels the pause menu
	    function unpause(event){
	        // Only act if paused
	        if(this.paused){
	            // Calculate the corners of the menu
	            var x1 = this.world.width/2 - menu.width/2 , x2 = this.world.width/2 + menu.width/2,
	                y1 = this.world.height/2 - menu.height/2, y2 = this.world.height/2 + menu.height/2;
	
	            // Check if the click was inside the menu
	            if(event.x > x1 && event.x < x2 && event.y > y1 && event.y < y2 ){
	                // The choicemap is an array that will help us see which
					// item
					// was clicked
	                var choisemap = ['one', 'two', 'three', 'four'];
	
	                // Get menu local coordinates for the click
	                var x = event.x - x1,
	                    y = event.y - y1;
	
	                // Calculate the choice
	                var choise = Math.floor(x / 90) + 3*Math.floor(y / 90);
	
	                // Display the choice
	                choiseLabel.text = 'You chose menu item: ' + choisemap[choise];
	            }
	            else{
	                // Remove the menu and the label
	                menu.destroy();
	                choiseLabel.destroy();
	
	                // Unpause the game
	                this.paused = false;
	            }
	        }
	    }
    },

    update: function () {
        // Honestly, just about anything could go here. It's YOUR game after
		// all. Eat your heart out!
    },

    quitGame: function (pointer) {
        // Here you should destroy anything you no longer need.
        // Stop music, delete sprites, purge caches, free resources, all that
		// good stuff.
    	terminal.destroy();

        // Then let's go back to the main menu.
        this.state.start('MainMenu');

    }
};


