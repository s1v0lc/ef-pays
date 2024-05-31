(function () {
    console.log("pays.js");

    let boutons_pays = document.querySelectorAll('.bouton__pays');
    // Vérification
    if (boutons_pays[0]) {
        for (const bouton of boutons_pays) {
            // Récupérer l'identifiant du pays à partir de l'ID du bouton
            let index = bouton.id.split("_")[1]; // Obtient l'ID après le "__"
            bouton.addEventListener("mousedown", () => { attraper(index) })
        }
    }

    // Variables pour la fonction
    let pays;
    let url;
    function attraper(index) {
        pays = index;
        console.log("pays" + index);
        url = "https://gftnth00.mywhc.ca/tim40/wp-json/wp/v2/posts?search=" + pays;
        console.log(url);
        // Effectuer la requête HTTP en utilisant fetch()
        fetch(url)
            .then(function (response) {
                // Vérifier si la réponse est OK (statut HTTP 200)
                if (!response.ok) {
                    throw new Error(
                        "La requête a échoué avec le statut " + response.status
                    );
                }
                // Analyser la réponse JSON
                return response.json();
            })
            .then(function (data) {
                console.log(data);
                // La variable "data" contient la réponse JSON
                let restapi = document.querySelector(".contenu__restapi__ef");
                console.log(restapi);
                restapi.innerHTML = "";
                // Parcourir les données et afficher les articles correspondants
                data.forEach(function (article) {
                    // Formatage du titre et de la destination
                    let titre = article.title.rendered;
                    let titreIndex = titre.indexOf(",");
                    let endroitIndex = titre.indexOf(",");
                    let endroit = "";
                    if (endroitIndex != -1) { endroit = titre.substr(titre.indexOf(",") + 2); }
                    if (titreIndex != -1) { titre = titre.substring(0, titreIndex); }
                    // Formatage autre informations
                    let thumbnail = "https://via.placeholder.com/150";
                    // let lien = article.link;
                    let contenu = article.content.rendered.substr(0, 200) + "...";
                    let carte = document.createElement("div");
                    carte.classList.add("carte");
                    carte.classList.add("restapi__carte");
                    carte.innerHTML = `
                        <h3>${titre}</h3>
                        <img href="${thumbnail}"></img>
                        <p>${contenu}</p>
                        <?php the_category() ?>
                    `;
                    restapi.appendChild(carte);
                });
            })
            .catch(function (error) {
                // Gérer les erreurs
                console.error("Erreur lors de la récupération des données :", error);
            });
    }
})();