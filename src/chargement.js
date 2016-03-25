var chargement = (function () {
	var _jeu;
	var chargement = function (jeu) {
		_jeu = jeu;
	};

	chargement.prototype = {
		preload: function () {
           
            _jeu.ecran_demarrage = _jeu.add.sprite(160, -20, "hiveLogo");
            _jeu.ecran_demarrage.scale = new Phaser.Point(.9,.9);
            
            
            // Chargement du fichier JSON
            _jeu.load.json("niveau1", "assets/niveaux/niveau1.json");
            _jeu.load.json("niveau2", "assets/niveaux/niveau2.json");
          						
            
		},
		create: function () {
            // Chargement des données JSON
            _jeu.jsonNiveau1 = _jeu.cache.getJSON('niveau1');
            _jeu.jsonNiveau2 = _jeu.cache.getJSON('niveau2');
            //console.log(_jeu.jsonNiveau);
			_jeu.state.start("Menu", false);
            //_jeu.musique = new musique;
            var volume = 1;
            _jeu.musique =_jeu.add.audio('musique',volume, true, true);
            _jeu.musique.play();
           
		}
	}

	return chargement;
})();