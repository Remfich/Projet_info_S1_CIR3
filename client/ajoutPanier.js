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

// Convertir l'objet Map en objet simple pour l'envoi
let objTabArticles = Object.fromEntries(tabArticles);

fetch('http://127.0.0.1:3000/api/data', {
    method: 'Post',
    mode:'cors',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(objTabArticles),
})
.then(response => response.json())
.then(data => console.log('Success:', data))
.catch((error) => console.error('Error:', error));