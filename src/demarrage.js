var demarrage = (function(){
	var _jeu;
var demarrage = function(jeu){
	
	_jeu = jeu;
};
  
demarrage.prototype = {
	preload: function(){
		_jeu.load.image('hiveLogo', 'assets/hiveLogo.png');
        _jeu.load.image('boutonStart', 'assets/boutonStart.png');
        
        _jeu.load.image('boutonMusique', 'assets/bouton_musique.png');
        _jeu.load.image('boutonUpDown', 'assets/boutonUpDown.png');
        _jeu.load.audio('musique', 'assets/interstellarhero-01.wav');
        
        _jeu.load.image('boutonInstructions', 'assets/boutonInstructions.png');
        _jeu.load.image('instructionsNiveau1', 'assets/instructions-01.png');
        _jeu.load.image('instructionsNiveau2', 'assets/instructions-02.png');
        
        
        _jeu.load.image('finNiveau1', 'assets/finNiveau1.png');
        _jeu.load.image('boutonContinue', 'assets/boutonContinue.png');
        
        _jeu.load.image('perdant', 'assets/perdant.png');
        _jeu.load.image('boutonPlayAgain', 'assets/boutonPlayAgain.png');
        
        _jeu.load.image('hive_d', 'assets/hive_d.png');
        _jeu.load.image('hive_ed', 'assets/hive_ed.png');
        
        _jeu.load.image('gagnant', 'assets/gagnant.png');
       
         
        //la taille du jeu s'adaptera au taille de l'ecran
        _jeu.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
       
        _jeu.stage.backgroundColor = '#77e4fe';  
	},
  	create: function(){
        //_jeu.ecran_demarrage = _jeu.add.sprite(0, 0, "ecran_demarrage");
        _jeu.state.start("Chargement", false);
       
	}
}    	
return demarrage;	
	
})();

