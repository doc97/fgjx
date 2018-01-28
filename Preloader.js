BasicGame.Preloader = function(game) {
	this.ready = false;
};

BasicGame.Preloader.prototype = {
    preload : function() {
	
        this.load.image('playButton', 'assets/playbutton.png');
        this.load.image('menu', 'assets/pause-menu.png');
        this.load.image('pauseButton', 'assets/pause-btn.png');
        this.load.image('settings', 'assets/settings-menu.png');
        this.load.image('virus', 'assets/virus1.png');
        this.load.image('mute-audio', 'assets/mutebutton.png');
        this.load.image('main-menu-background', 'assets/terminalterminatorlogo.jpg');
        this.load.image('base-zero', 'assets/homeicon_blank.png');
        this.load.image('base-one', 'assets/homeicon_one.png');
        this.load.image('base-two', 'assets/homeicon_two.png');
        this.load.image('base-three', 'assets/homeicon_three.png');
        this.load.image('packet', 'assets/kube.png');
        this.load.image('in-game-background', 'assets/background_full.png');
        this.load.image('help', 'assets/tutorial_screen.jpg');

		
        //minigame satuff
        this.load.spritesheet('press-20','assets/minigamepngs/spritesheetb20times.png', 480, 360, -1, 5 ,10)
        this.load.spritesheet('simonsays3896', 'assets/minigamepngs/spritesheetsimsonsays3896.png', 480, 460, -1)
        
        this.load.audio('modem-remix', 'assets/soundtrack/Theme_modem_remix.ogg');
        this.load.audio('ambient-track', 'assets/soundtrack/bonus_ambient_track.ogg');
        this.load.audio('jumpy-melody', 'assets/soundtrack/Theme_jumpy_melody.ogg');
        this.load.audio('track1', 'assets/soundtrack/track1.ogg');
        this.load.audio('track2', 'assets/soundtrack/track2.ogg');
        this.load.audio('track3', 'assets/soundtrack/track3.ogg');


        this.sound.add('track1', 1, true); // In-game
        this.sound.add('track2', 1, true); // Main menu
        this.sound.add('track3', 1, true); // Game over
        this.sound.add('modem-remix', 1, true); // Instructions
        //this.sound.add('jumpy-melody', 1, true); // Not used
    },

    create : function() {

    },

    update : function() {
        if (/* this.cache.isSoundDecoded('titleMusic') && */this.ready == false) {
            this.ready = true;
            this.state.start('MainMenu');
        }
    }
};
