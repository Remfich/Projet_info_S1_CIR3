const ajoutPanier = document.querySelector(".test");
var tabArticles = new Map();

//On met tous les élément du html dans une map sous la forme : nom , quantité
for (let index = 0; index < ajoutPanier.children.length; index++) {
    let nomProduit = ajoutPanier.children[index].innerHTML;
    tabArticles.set(nomProduit, "Remplacer par quantité de " + nomProduit);    

    ajoutPanier.children[index].addEventListener("click", (event)=>{
        clique(nomProduit);
    });
}

function clique(produit_){
    console.log(tabArticles.get(produit_));
}
