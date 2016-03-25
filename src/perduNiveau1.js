var perduNiveau1 = (function () {
	var _jeu;
	var perduNiveau1 = function (jeu) {
		_jeu = jeu;
	}

	perduNiveau1.prototype = {
		create: function () {
            _jeu.stage.backgroundColor = '#77e4fe'; 
            _jeu.ecran_perduNiveau1 = _jeu.add.sprite(160, -40, "perdant");
            _jeu.ecran_perduNiveau1.scale = new Phaser.Point(.8,.8);
            
            _jeu.bouton = _jeu.add.button(_jeu.world.centerX, _jeu.world.centerY, "boutonPlayAgain", this.redemarrerNiveau1, this);
            _jeu.bouton.anchor.setTo(0.55,.3);
            
            _jeu.boutonMonter = _jeu.add.button(_jeu.world.centerX, _jeu.world.centerY,"boutonUpDown", this.monterVolume, this);
            _jeu.boutonMonter.scale = new Phaser.Point(.2,.2);
            _jeu.boutonMonter.anchor.setTo(1.2,-5);
            _jeu.boutonMonter.rotation = -1.60;
            
            _jeu.boutonDescendre = _jeu.add.button(_jeu.world.centerX, _jeu.world.centerY,"boutonUpDown", this.descendreVolume, this);
            _jeu.boutonDescendre.scale = new Phaser.Point(.2,.2);
            _jeu.boutonDescendre.anchor.setTo(-2.5,6);
            _jeu.boutonDescendre.rotation = 1.55;
            
            _jeu.boutonMusique = _jeu.add.button(_jeu.world.centerX, _jeu.world.centerY, "boutonMusique", this.controlMusic, this);
            _jeu.boutonMusique.scale = new Phaser.Point(.4,.4);
            _jeu.boutonMusique.anchor.setTo(-5,-1);
            //variable pour controller l'arret et demarrage de la musique
            _jeu.isPaused = false;
            
             //bouton instructions
            _jeu.boutonInstructions = _jeu.add.button(0, 0, "boutonInstructions", this.montrerInstructions, this);
            _jeu.boutonInstructions.scale = new Phaser.Point(.8,.8);
            _jeu.instructions = _jeu.add.sprite(0,0, "instructionsNiveau1");
            _jeu.instructions.scale = new Phaser.Point(1.4, 1.4);
            _jeu.instructions.anchor.setTo(-.1,-.2);
            _jeu.instructions.exists = false;
        },
        redemarrerNiveau1 : function(){
            //console.log("Jouer...");
            _jeu.state.start("Niveau1");
        },
        //fonction que controllera l'arret et demarrage de la musique
         controlMusic: function(){
    
            if(_jeu.isPaused == false){
                _jeu.musique.pause();
                _jeu.isPaused = true;
                
            }else{
                _jeu.musique.resume();
                _jeu.isPaused=false;
            }
            
         },
        // fonctions de control de volume
        monterVolume: function(){
            _jeu.musique.volume +=.1;
        },
        descendreVolume: function (){
            _jeu.musique.volume -=.1;
        },
        //montrer les instructions ou pas
        montrerInstructions: function(){
            if(_jeu.instructions.exists == false){
                _jeu.instructions.exists = true;
            }else{
                _jeu.instructions.exists = false; 
            }
	   }
    }
	return perduNiveau1;


})();