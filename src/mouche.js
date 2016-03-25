var Mouche = (function () {
	var Mouche = function (jeu, x, y, cle) {
		_jeu = jeu;

		Phaser.Sprite.call(this, jeu, x, y, cle);
		_jeu.physics.enable(this); // Création du body
		
		this.body.collideWorldBounds = true;
		this.animations.add("Ailes");
        this.animations.play("Ailes", 25, true); 
        
        //variable pour choisir un tableau des verbes
        var arraySwitch = _jeu.rnd.integerInRange(1,2);
        //variable pour choisir le verbe que sera ecrit sur le dos de chaque insecte provenant des tableaux de maniere aleatoire
        var randVerbe = _jeu.rnd.integerInRange(0,9);
        //console.log(randVerbe);
        var verbe;
                //console.log(arraySwitch);
        //variable style pour les textes des verbes
        var styleTexte = { font: "16px Arial", fill: "#000000", align: "center" };
        
        if (arraySwitch == 1){
            //recuperer le verbe que sera ecrit sur le dos de l'insecte du tableau json
                    verbe = _jeu.jsonNiveau2.verbes_d[randVerbe];
                    
                    //ajouter une propriete pour plus tarde pouvoir calculer les points
                    this.verbeType = "verbes_d";
                    //console.log(ennemi.verbeType);
                    
                } 
                if(arraySwitch == 2){
                //recuperer le verbe que sera ecrit sur le dos de l'insecte du tableau json
                    verbe = _jeu.jsonNiveau2.verbes_ed[randVerbe];
                    
                    //ajouter une propriete pour plus tarde pouvoir calculer les points
                    this.verbeType = "verbes_ed";
                    //console.log(ennemi.verbeType);
                }
        var texte = _jeu.add.text(0, 0, verbe, styleTexte);
                
                //reset de l'ancre des sprites des insectes
                this.anchor.set(0.3, 0.4);
                texte.anchor.set(0);
                
                //placer le texte sur le point du milieu des insectes
                texte.x = this.width/this.height;
                texte.y= this.width/this.height;
                
                //pourque le texte soit colle aux sprites des insectes, et se deplace avec eux
                this.addChild(texte);
        
                //this.body.velocity.x = _jeu.rnd.integerInRange(-50,50);
                //this.body.velocity.y = _jeu.rnd.integerInRange(-50,50);
                //console.log(_jeu.Mouche.length);
                this.body.bounce.setTo(1,1);
                this.inputEnabled = true;
                this.input.enableDrag(true);
                this.body.collideWorldBounds = true;
                this.body.checkCollision.up = false;
                _jeu.physics.arcade.moveToXY(this,_jeu.world.randomX,-10, 50, _jeu.rnd.integerInRange(10000,30000));
    }
	Mouche.prototype = Object.create(Phaser.Sprite.prototype);
	Mouche.prototype.constructor = Mouche;
	
	
    Mouche.prototype.update = function()
	{
		if(Phaser.Rectangle.intersects(this.body, _jeu.collideUP)){
             console.log("entree");

            this.kill(); 
    }
		
	};
	
	
	return Mouche;


})();