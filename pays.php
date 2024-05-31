<?php
   /**
 * Package Pays
 * Version 1.0.0
 */
/*
Plugin name: Pays
Plugin uri: https://github.com/s1v0lc/ef-pays
Version: 1.0.0
Description: Génère un menu constitué des noms des pays et selon le pays sélectionné affiche l’ensemble des destinations de ce pays.
*/
function cg_enqueue2()
{
  $version_js = filemtime(plugin_dir_path(__FILE__) . "js/pays.js");
  wp_enqueue_script(  'cg_plugin_pays_js',
    plugin_dir_url(__FILE__) ."js/pays.js",
    array(),
    $version_js,
    true);
}
add_action('wp_enqueue_scripts', 'cg_enqueue2');

/* Création de la liste des destinations en HTML */
function affichage_destinations(){
  $contenu = '
    <div class="ef__div">
      <div class="restapi__boutons">
        <button id="pays_france" class="bouton__pays">France</button>
        <button id="pays_etats-unis" class="bouton__pays">États-Unis</button>
        <button id="pays_canada" class="bouton__pays">Canada</button>
        <button id="pays_argentine" class="bouton__pays">Argentine</button>
        <button id="pays_5" class="bouton__pays">Chili</button>
        <button id="pays_6" class="bouton__pays">Belgique</button>
        <button id="pays_7" class="bouton__pays">Maroc</button>
        <button id="pays_8" class="bouton__pays">Mexique</button>
        <button id="pays_9" class="bouton__pays">Japon</button>
        <button id="pays_10" class="bouton__pays">Italie</button>
        <button id="pays_11" class="bouton__pays">Islande</button>
        <button id="pays_12" class="bouton__pays">Chine</button>
        <button id="pays_13" class="bouton__pays">Grèce</button>
        <button id="pays_14" class="bouton__pays">Suisse</button>
        <button id="pays_1" class="bouton__pays btnX">X</button>
      </div>
      <div class="contenu__restapi__ef"></div>
    </div>';
  return $contenu;
}

add_shortcode('cg_destination', 'affichage_destinations');
?>