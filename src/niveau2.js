/*TP1 "english Hive" Niveau 1 Prototype - version beta Final
Programmation d'animation 3
Groupe 1797
Techniques d'Integration Multiemdia 
Prof. Johnathan Martel
Etudiante: Ana Cristina Mahneke
1 novembre 2015
d'apres le code obtenu dans le cadre des cours 1-12
dessins des personnages par Cristina Mahneke
trame sonore: http://www.freesound.org/people/LittleRobotSoundFactory/sounds/323959/ 
*/

var niveau2 = (function () {

    var niveau2 = function (jeu) {
        _jeu = jeu;
    };
    niveau2.prototype = {
        preload : function(){
            
              
            
     //********************---Load infos des mouches--************/
            
            _jeu.load.atlasJSONHash("ailes", "assets/persoHive/ailes.png", "assets/persoHive/ailes.json");
            
            _jeu.stage.backgroundColor = '#77e4fe';
            
           
            // Générer ennemis
            
            _jeu.ennemis = _jeu.add.group();
                
        },
        /*--------------------------- FIN PRELOAD--------------------*/
        
        //--------------fonction pour construire les ennemis---------------------
         constrInsecte : function (){
             
                //generer les sprites des ennemis
                var ennemi = new Mouche(_jeu, _jeu.world.randomX,600, "ailes");
                
                _jeu.add.existing(ennemi);
                //ajouter chaque sprite au groupe des ennemis
                _jeu.ennemis.add(ennemi);
                ennemi.events.onDragStop.add(this.ecraserInsecte, this);
               
                _jeu.ennemisCrees +=1;
             
         },
        //-----------------------------------------------------------------------
        
        create: function () { 
          
            
            //la taille du jeu s'adaptera au taille de l'ecran
            _jeu.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            
            _jeu.physics.startSystem(Phaser.Physics.ARCADE);
            Phaser.Physics.enableBody = true;
            
            //ajouter un rectangle en haut que servira de perimetre pour les mouches
            _jeu.collideUP = new Phaser.Rectangle(0, -10, _jeu.width*2, 10);
        
            //ajouter les ruches ou nous glisserons les mouches
            
            _jeu.hive_d = _jeu.add.sprite(-40, -10, 'hive_d');
            _jeu.hive_d.scale = new Phaser.Point(.4,.4);
            _jeu.hive_ed = _jeu.add.sprite(580, -10, 'hive_ed');
            _jeu.hive_ed.scale = new Phaser.Point(.4,.4);
            
            //creer les textes pour l'affichage des points:
            _jeu.points = 0;
            _jeu.erreurs = 0;
            var styleScore = { font: "24px Arial", fill: "#000000", align: "left" };
               
            _jeu.pointsTexte = _jeu.add.text(400,05, "Points: " + _jeu.points, styleScore);
            _jeu.erreursTexte = _jeu.add.text(200,05, "Mistakes: " + _jeu.erreurs, styleScore);
            
            //------------on genere 20 ennemis----------------------
            
            //le premiere d'abord, pour n'avoir a attendre:
            this.constrInsecte();
            
            for(var i=0; i< 19 ; i++)
            {
                var randTemps = _jeu.rnd.integerInRange(1000,10000);
                
                
                
                _jeu.time.events.add(randTemps, this.constrInsecte, this);
                
                
                
            }//------------FIN DU BOUCLE FOR/CREATION DU GROUP ENNEMIS
            

            //console.log(_jeu.ennemis);
            

        },
        /*---------------------------FIN DU CREATE ------------------------------*/
        update: function () { // Sur chaque frame
            _jeu.physics.arcade.collide(_jeu.ennemis, _jeu.ennemis, this.changerDirection);
            _jeu.pointsTexte.setText("Points: "+_jeu.points);
            _jeu.erreursTexte.setText("Mistakes: "+_jeu.erreurs);
            
            
    /*-------------CONDITIONS DE FIN DE NIVEAU----------------------------------*/
        
            //conditions de fin de jeu facile, jusqu'a les bogues soient resolus
            if(_jeu.points>=5){
            
                this.passerNiveau();
            }
            //on perde s'il n'y a plus des insectes et nous n'avons pas 1 points
            if(_jeu.ennemis.countLiving()==0 && _jeu.points<1){
            
                this.echouerNiveau();
            }/*
            //on perde en tout moment ou il n'y a plus des insectes et nous avons plus des erreurs que de points
            if(_jeu.ennemis.countLiving()==0 && _jeu.points<=_jeu.erreurs){
            
                this.echouerNiveau();
            }*/
            console.log(_jeu.ennemis.countLiving());
        },
      /*--------------------------- FIN UPDATE ----------------------------------*/ 
      
    changerDirection : function  (ennemi1,ennemi2){
        ennemi1.body.angularVelocity = _jeu.rnd.integerInRange(-50,50);
        ennemi2.body.angularVelocity = _jeu.rnd.integerInRange(-50,50);
        ennemi1.rotation = ennemi1.body.angle;
        ennemi2.rotation = ennemi2.body.angle;
    },
        
    ecraserInsecte : function (ennemi){
        //console.log('ecraser');
        //on obtienne les perimetres des sprites des ennemis et ruches
        var boundsEnnemi = ennemi.getBounds();
        var boundsHive_D = _jeu.hive_d.getBounds();
        var boundsHive_ED = _jeu.hive_ed.getBounds();
        
        if(ennemi.verbeType == "verbes_d"){
            //on compare si les sprites sont en contacte, si on a lache la mouche sur la bonne ruche , on gagne un point
            if(Phaser.Rectangle.intersects(boundsEnnemi, boundsHive_D)){
                _jeu.points += 1;
            }
            //si on se trompe, on perde un point et le compteur des erreurs monte
            if(Phaser.Rectangle.intersects(boundsEnnemi, boundsHive_ED)){
                _jeu.erreurs +=1;
                _jeu.points -=1;
            }
            
        }else if(ennemi.verbeType=="verbes_ed"){
            
            
            if(Phaser.Rectangle.intersects(boundsEnnemi, boundsHive_ED)){
                _jeu.points += 1;
            }
            //si on se trompe, on perde un point et le compteur des erreurs monte
            if(Phaser.Rectangle.intersects(boundsEnnemi, boundsHive_D)){
                _jeu.erreurs +=1;
                _jeu.points -=1;
            }
        }
        ennemi.kill();
    },
  
     //si les insectes sortent de la scene:
    echapper : function (ennemi){
            ennemi.kill();
            
    },
    
    passerNiveau: function (){
    
        _jeu.state.start("GagneNiveau2", true);
    },
    
    echouerNiveau: function(){
    
        _jeu.state.start("PerduNiveau2", true);
    },
    render: function () {
            _jeu.debug.geom(_jeu.collideUP);
        }
    
}
return niveau2;

})();