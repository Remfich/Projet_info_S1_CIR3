var ip_front = "http://localhost";
var i = 0;
var prix_stock = [];
var listeNoms = [];


async function requete(url,donnees) {
  try {
    const data = {
      method: "POST",
      headers: {
        'Access-Control-Allow-Origin': '*',
        "Content-Type": "application/json",
      },
      body: JSON.stringify(donnees)
    }
    const reponse = await fetch(url, data);
    const resultat = await reponse.json();
    return resultat;
  } catch (erreur) {
    return undefined;
  }
}


function isconnectedclient(){
  let user = getCookie("user");
  let admin = getCookie("admin");
  if(user != "" && admin != ""){
    //c'est bon
  }
  else{
    alert("Accès refusé, vous n'êtes pas connecté");
    window.open(ip_front+":3001/loginAdmin.html","_self");
  }
}
function getCookie(cname) {
  let name = cname + "=";
  let ca = document.cookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
isconnectedclient();
function logout(){
  document.cookie = "user=; max-duration = 0; path=/;";
  document.cookie = "admin=; max-duration = 0; path=/;";
  document.location.replace(ip_front +":3001/loginAdmin.html")
}





function getCookie(cname) {
  let name = cname + "=";
  let ca = document.cookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

const ip_serveur = "http://10.224.2.87";



async function returnPrix(nomProduite) {
  try {
    const resultat = await requete(ip_serveur+":3000/client_back/getProduit",{nom : nomProduite});
    if (resultat!=undefined) {
      console.log('Stock chargé avec succès');
      
      console.log(resultat);
      //met le resultat dans le tableau prix stock

      addArticle(resultat, nomProduite, 1);

        
      
     /* var panierCookie = getCookie("panier");
        if (panierCookie !== "") {
          var panier = JSON.parse(panierCookie);
          for (var i = 0; i < panier.length; i++) {
            var article = panier[i];
            addArticle(prix, titre, quantitation);
        }
      }*/

       } else {
      console.error('Erreur lors du chargement du stock', response.statusText);
    }
  } catch (error) {
    console.error('Erreur lors de la requête :', error);
  }
};

//fais moi une boucle qui va lire le cookie panier et qui va faire la fonction addArticle pour chaque article dans le panier


/*
addArticle("2", "Coca", 1);
addArticle("2", "Coca", 2);
addArticle("2", "Coca", 1);
addArticle("2", "Coca", 2);
addArticle("2", "Coca", 1);
addArticle("2", "Coca", 2);
*/

//returnPrix("CocaCola");

//lecture du cookie 
var panierCookie = getCookie("panier");
// Divisez la chaîne en un tableau en utilisant la virgule comme délimiteur
var tableauProduits = panierCookie.split(',');

// Supprimez les espaces inutiles autour de chaque élément
tableauProduits = tableauProduits.map(function(produit) {
  return produit.trim();
});
console.log(tableauProduits);
for(var i = 0; i < tableauProduits.length; i++){
  console.log(tableauProduits[i]);
  returnPrix(tableauProduits[i]);
}




function addArticle(prixProduit, titreProduit, Quantite) {
  var imgProduit = "./img/"+titreProduit+".png";
  var article = document.createElement("div");
  article.className = "Produit";
  document.querySelector(".articles").appendChild(article);

  var imgProduct = document.createElement("img");
  imgProduct.src = imgProduit;
  article.appendChild(imgProduct);

  var textProduit = document.createElement("div");
  textProduit.className = "text_Produit";
  article.appendChild(textProduit);

  var titleProduit = document.createElement("div");
  titleProduit.className = "title_produit";
  textProduit.appendChild(titleProduit);
  listeNoms.push(titreProduit);

  var titre = document.createElement("h2");
  titre.textContent = titreProduit;
  titleProduit.appendChild(titre);

  var quantity = document.createElement("h3");
quantity.setAttribute("id", "quantity" + i);
quantity.textContent = "Qté : "+Quantite; // Affiche uniquement la quantité initiale
titleProduit.appendChild(quantity);



  var modifier = document.createElement("div");
  modifier.className = "modifier";
  textProduit.appendChild(modifier);

  var bouton_moins = createButton("-", i);
  modifier.appendChild(bouton_moins);

  var bouton_plus = createButton("+", i);
  modifier.appendChild(bouton_plus);

  var bouton_supp = createButton("x", i);
  bouton_supp.className = "bouton_supp"; 
  modifier.appendChild(bouton_supp);

  var prix_product = document.createElement("div");
  prix_product.className = "prixProduit";
  textProduit.appendChild(prix_product);

  var prix = document.createElement("h2");
  prix.textContent = prixProduit*Quantite + "€";
  prix_product.appendChild(prix);
  prix_stock.push(prixProduit*Quantite);
    

  i++;
}

function createButton(text, index) {
    var positif = 0;
    var bouton = document.createElement("button");
    bouton.setAttribute("id", "bouton_" + text + index);
    bouton.textContent = text;
    bouton.addEventListener("click", function () {
      var currentQuantityElement = document.getElementById("quantity" + index);
      if (currentQuantityElement) {
        var currentQuantityText = currentQuantityElement.textContent;
        var currentQuantity = parseInt(currentQuantityText.substring(6)); // Extrait la quantité du texte
        if (!isNaN(currentQuantity)) { // Vérification pour éviter NaN
          if (text === "+") {
            positif = 1;
            currentQuantity++;
          } else if (text === "-" && currentQuantity > 1) {
            currentQuantity--;
          } else if (text === "-" && currentQuantity === 1) {
            // Supprimer l'article parent du bouton "-"
            prix_stock.splice(index, 1);
            prix_stock.splice(index, 0, 0); // Insérez l'élément à l'index désiré (nouvelIndex)
            calculPrixTotal();
            listeNoms.splice(index, 1);
            var articleASupprimer = bouton.parentElement.parentElement.parentElement;
            articleASupprimer.remove();
            
           
            return; // Arrêtez l'exécution ici pour éviter de mettre à jour la quantité après la suppression
          } else if (text === "x") {
            prix_stock.splice(index, 1);
            prix_stock.splice(index, 0, 0); // Insérez l'élément à l'index désiré (nouvelIndex)
            calculPrixTotal();

            listeNoms.splice(index, 1);
            // Supprimer l'article parent du bouton "x"
            var articleASupprimer = bouton.parentElement.parentElement.parentElement;
            articleASupprimer.remove();
            
          
            return; // Arrêtez l'exécution ici pour éviter de mettre à jour la quantité après la suppression
          }
          
          currentQuantityElement.textContent = "Qté : " + currentQuantity;
          if(positif == 1){
            var prixTotal = prix_stock[index] + (prix_stock[index] / (currentQuantity - 1)); // Calcule le prix total basé sur le prix initial
            }else{
            var prixTotal = prix_stock[index] - (prix_stock[index] / (currentQuantity + 1)); // Calcule le prix total basé sur le prix initial
            }
          var prixProduitElement = currentQuantityElement.parentElement.nextElementSibling.nextElementSibling;
          var prixProduitElement2 = currentQuantityElement.parentElement.nextElementSibling
         prixProduitElement.remove();
          



          

         
          var prix_product = document.createElement("div");
        prix_product.className = "prixProduit";
        currentQuantityElement.parentElement.parentElement.appendChild(prix_product);
        
        
        var prix = document.createElement("h2");
        prix.textContent = prixTotal + "€";
        currentQuantityElement.parentElement.parentElement.lastElementChild.appendChild(prix);
        
        prix_stock.splice(index, 1); // Supprimez l'élément de son emplacement actuel
        prix_stock.splice(index, 0, prixTotal); // Insérez l'élément à l'index désiré (nouvelIndex)
        //prix_stock.push(prix_stock[index]);
        calculPrixTotal();
    
        }
      }
    });
    return bouton;
  }
  

  // Sélectionnez le bouton "Vider le panier" par son ID ou une autre méthode appropriée
var boutonViderPanier = document.querySelector(".Vider h2");

// Ajoutez un gestionnaire d'événements pour le clic sur le bouton
boutonViderPanier.addEventListener("click", function () {
  // Sélectionnez tous les éléments d'article dans le panier
  var articlesPanier = document.querySelectorAll(".Produit");

  // Parcourez tous les articles du panier et supprimez-les
  articlesPanier.forEach(function (article) {
    article.remove();
  });
  
    prix_stock = [];

  calculPrixTotal();
});



//apparait et disparait la fenetre d'assistance de chat gpt
document.querySelector(".chatgpt").onclick = function () {
    if(document.querySelector(".assistant").style["display"]=="none"){
        document.querySelector(".assistant").style["display"]="block";
    }
    else if(document.querySelector(".assistant").style["display"]=="block"){
        document.querySelector(".assistant").style["display"]="none";
    }
    else{
        document.querySelector(".assistant").style["display"]="block";
    }
};
function calculPrixTotal(){
    //console.log(prix_stock);
    // Calcul du prix total du panier en additionnant chaque valeur dans le tableau prix_stock converti en entier pour l'addition
    var prixTotalCalculé = prix_stock.reduce(function (a, b) {
        console.log(a);
        return parseInt(a) + parseInt(b);
    }, 0); 
    
    console.log(prixTotalCalculé);
    

    // Sélectionnez l'élément HTML où vous souhaitez afficher le prix total
    var totalElement = document.querySelector(".total h1");

    // Mettez à jour le contenu de l'élément avec le prix total calculé
    totalElement.textContent = "Total : " + prixTotalCalculé + "€";
}
/*

document.querySelector(".chatgpt").onclick = function () {
    // Effectuez une requête POST vers la route /chat du serveur avec le tableau de noms
    fetch("http://192.168.1.40:3000/serveur/client_back/chat", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ noms: listeNoms })
    })
    .then(response => response.json())
    .then(data => {
        // Traitez la réponse de votre fonction chatWithGPT ici
        console.log(data.message); // C'est la réponse de GPT-3.5 Turbo
    })
    .catch(error => {
        console.error(error);
    });
};*/


calculPrixTotal();
console.log(prix_stock);