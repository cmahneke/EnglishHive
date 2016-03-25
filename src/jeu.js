/* Source : 
http://www.emanueleferonato.com/2014/08/28/phaser-tutorial-understanding-phaser-states/
*/

(function () {  // IIFE
"use strict";
        var jeu = new Phaser.Game(768, 400, Phaser.AUTO, 'jeu');
        jeu.state.add("Demarrage",demarrage);
        jeu.state.add("Chargement",chargement);
        jeu.state.add("Menu", menu); 
        jeu.state.add("Niveau1",niveau1);
        jeu.state.add("GagneNiveau1", gagneNiveau1);
        jeu.state.add("PerduNiveau1", perduNiveau1);
        jeu.state.add("Niveau2", niveau2);
        jeu.state.add("GagneNiveau2", gagneNiveau2);
        jeu.state.add("PerduNiveau2", perduNiveau2);
        jeu.state.start("Demarrage");
})();