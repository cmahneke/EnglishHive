var Coquerelle = (function () {
	var Coquerelle = function (jeu, x, y, cle) {
		_jeu = jeu;
        
		Phaser.Sprite.call(this, jeu, x, y, cle);
		_jeu.physics.enable(this); // Création du body
		
		this.body.collideWorldBounds = true;
		this.animations.add("insecte");
        this.animations.play("insecte", 25, true); 
        
        //variable pour choisir un tableau des verbes
        var arraySwitch = _jeu.rnd.integerInRange(1,2);
         //console.log(arraySwitch);
        
        //variable pour choisir le verbe que sera ecrit sur le dos de chaque insecte provenant des tableaux de maniere aleatoire
        var randVerbe = _jeu.rnd.integerInRange(0,9);
        //console.log(randVerbe);
        
        var verbe;
       
        //variable style pour les textes des verbes
        var styleTexte = { font: "16px Arial", fill: "#000000", align: "center" };
        
        if (arraySwitch == 1){
            
            //recuperer le verbe que sera ecrit sur le dos de l'insecte du tableau json
                    verbe = _jeu.jsonNiveau1.verbesIrreg[randVerbe];
                    
                    //ajouter une propriete pour plus tarde pouvoir calculer les points
                    this.verbeType = "irreg";
                    //console.log(ennemi.verbeType);
                    
                } 
                    if(arraySwitch == 2){
                    //recuperer le verbe que sera ecrit sur le dos de l'insecte du tableau json
                    verbe = _jeu.jsonNiveau1.verbesReg[randVerbe];
                    
                    //ajouter une propriete pour plus tarde pouvoir calculer les points
                    this.verbeType = "reg";
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

        this.body.velocity.x = 50;
        this.body.velocity.y = 50;
        //console.log(_jeu.Coquerelle.length);
        this.body.bounce.setTo(1,1);
        // les insectes reponderont aux clics et touche
        this.inputEnabled = true;

        //diriger ses deplacements vers l'un des coins de facon aleatoire:
        this.randCoin = _jeu.rnd.integerInRange(0,3);
        this.tunnelCible = _jeu.tunnels.children[this.randCoin];
        //console.log("body: "+this.tunnelCible.body);
        
        this.rotation = _jeu.physics.arcade.angleToXY(this,_jeu.jsonNiveau1.tunnels[this.randCoin].posX,_jeu.jsonNiveau1.tunnels[this.randCoin].posY); _jeu.physics.arcade.moveToXY(this,_jeu.jsonNiveau1.tunnels[this.randCoin].posX,_jeu.jsonNiveau1.tunnels[this.randCoin].posY, 50, _jeu.rnd.integerInRange(10000,30000));
                
                
    }
	Coquerelle.prototype = Object.create(Phaser.Sprite.prototype);
	Coquerelle.prototype.constructor = Coquerelle;
	
    Coquerelle.prototype.update = function(){
         //console.log("cible "+this.tunnelCible);

        //au moment que l'insecte arrive a son destine il sera enleve de la scene
        if(Phaser.Rectangle.intersects(this.body, this.tunnelCible.body)){
            // console.log("entree");

            this.kill(); 
        }
		
    };
	
	
	return Coquerelle;


})();