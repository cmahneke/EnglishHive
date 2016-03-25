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

var niveau1 = (function () {

    var niveau1 = function (jeu) {
        _jeu = jeu;
    };
    niveau1.prototype = {
        preload : function(){
            
              
            
     //********************---Load infos des coquerelles--************/
            
            for(i=0; i<_jeu.jsonNiveau1.coquerelles.length; i++){
                
                _jeu.load.atlasJSONHash(_jeu.jsonNiveau1.coquerelles[i].id, _jeu.jsonNiveau1.coquerelles[i].chemin, _jeu.jsonNiveau1.coquerelles[i].json);
            
            }
           
            
            //--------Images du fond - Tunnels------------
            _jeu.stage.backgroundColor = 'EF3725';
            
            for(i=0; i<_jeu.jsonNiveau1.tunnels.length; i++){
                _jeu.load.spritesheet(_jeu.jsonNiveau1.tunnels[i].id, _jeu.jsonNiveau1.tunnels[i].chemin);
            
            }
                 
            // Générer ennemis
            
            _jeu.ennemis = _jeu.add.group();
                
        },
        /*--------------------------- FIN PRELOAD--------------------*/
        
        //--------------fonction pour construire les ennemis---------------------
        constrInsecte : function (){
            var aEnnemis = _jeu.jsonNiveau1.coquerelles;
            // choisir une image aleatoire
            var randImage = _jeu.rnd.integerInRange(0,7);
            //generer les sprites ennemis des insectes
            var ennemi = new Coquerelle(_jeu, _jeu.world.randomX,_jeu.world.randomY, aEnnemis[randImage].id);

            _jeu.add.existing(ennemi);
            //ajouter chaque sprite au groupe des ennemis
            _jeu.ennemis.add(ennemi);
            ennemi.events.onInputDown.add(this.ecraserInsecte, this);
            //variable pour la gestion de fin de niveau
            _jeu.ennemisCrees;
            _jeu.ennemisCrees +=1;
                
        },
        //-----------------------------------------------------------------------
        
        create: function () { 
          
            
            //la taille du jeu s'adaptera au taille de l'ecran
            _jeu.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            
            _jeu.physics.startSystem(Phaser.Physics.ARCADE);
            Phaser.Physics.enableBody = true;
            
           
            //ajouter les sprites des tunnels
            _jeu.tunnels = _jeu.add.group(_jeu, "tunnels", true, true, Phaser.Physics.ARCADE);
           //_jeu.coin;
            for(i=0; i<_jeu.jsonNiveau1.tunnels.length; i++){
                _jeu.tunnels.add(_jeu.add.sprite(_jeu.jsonNiveau1.tunnels[i].posX,_jeu.jsonNiveau1.tunnels[i].posY, _jeu.jsonNiveau1.tunnels[i].id));
 
            }
            
            //creer les textes pour l'affichage des points:
            _jeu.points = 0;
            _jeu.erreurs = 0;
            var styleScore = { font: "22px Arial", fill: "#000000", align: "left" };
               
            _jeu.pointsTexte = _jeu.add.text(400,05, "Points: " + _jeu.points, styleScore);
            _jeu.erreursTexte = _jeu.add.text(200,05, "Mistakes: " + _jeu.erreurs, styleScore);
            
            //------------on genere 20 ennemis----------------------
            
            //le premiere d'abord, pour n'avoir a attendre:
            this.constrInsecte(); 
            for(var i=0; i< 19 ; i++)
            {
                //on construie un insecte a un interval aleatoire entre 1 et 10 seconds 
                var randTemps = _jeu.rnd.integerInRange(1000,10000);

                _jeu.time.events.add(randTemps, this.constrInsecte, this);

                
            }//------------FIN DU BOUCLE FOR/CREATION DU GROUP ENNEMIS           
             
            //console.log(_jeu.ennemis);
            //console.log(jsonNiveau1);
            
            _jeu.world.bringToTop(_jeu.tunnels);
            

        },
        /*---------------------------FIN DU CREATE ------------------------------*/
        update: function () { // Sur chaque frame
            _jeu.physics.arcade.collide(_jeu.ennemis, _jeu.ennemis, this.changerDirection);
            _jeu.pointsTexte.setText("Points: "+_jeu.points);
            _jeu.erreursTexte.setText("Mistakes: "+_jeu.erreurs);
            
            //console.log(_jeu.ennemis.countLiving());
    /*-------------CONDITIONS DE FIN DE NIVEAU----------------------------------*/
        
            //on gagne au moment d'accumuler 3 points et moins de 3 erreurs
            if(_jeu.points>=3 && _jeu.erreurs<5){
            
                this.passerNiveau();
            }
            //on perde s'il n'y a plus des insectes et nous n'avons pas 3 points, avec le derniere parametre on s'assure que tous les ennemis on ete crees.
            if(_jeu.ennemis.countLiving()==0 && _jeu.points<3 && _jeu.ennemisCrees == 20){
            
                this.echouerNiveau();
            }
            //on perde en tout moment ou il n'y a plus des insectes et nous avons plus des erreurs que de points, avec le derniere parametre on s'assure que tous les ennemis on ete crees.
            if(_jeu.ennemis.countLiving()==0 && _jeu.points<_jeu.erreurs && _jeu.ennemisCrees == 20){
            
                this.echouerNiveau();
            }
            
        },
      /*--------------------------- FIN UPDATE ----------------------------------*/ 
    ecraserInsecte : function (ennemi){
        //console.log('ecraser');
        
        //on gagne une point pour chaque insecte ecrasse que porte une verbe irregulier sur le dos
        if(ennemi.verbeType == "irreg"){
            //console.log("irreg");
            _jeu.points += 1;
            _jeu.ennemisMorts +=1;
            
        }else if(ennemi.verbeType=="reg"){
            //console.log("reg");
            //si on se trompe, on perde un point et le compteur des erreurs monte
            _jeu.erreurs +=1;
            _jeu.points -=1;
        }
        ennemi.kill();
    },
  
    passerNiveau: function (){
    
        _jeu.state.start("GagneNiveau1", true);
    },
    
    echouerNiveau: function(){
    
        _jeu.state.start("PerduNiveau1", true);
    }
    
}
return niveau1;

})();