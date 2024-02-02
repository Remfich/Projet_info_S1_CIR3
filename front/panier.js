

// test//
var i = 0;
var prix_stock = [];

addArticle("./img/coke.png", "2", "Coca", 1);
addArticle("./img/coke.png", "2", "Coca", 2);
addArticle("./img/coke.png", "2", "Coca", 1);
addArticle("./img/coke.png", "2", "Coca", 2);
addArticle("./img/coke.png", "2", "Coca", 1);
addArticle("./img/coke.png", "2", "Coca", 2);





function addArticle(imgProduit, prixProduit, titreProduit, Quantite) {
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
        console.log(currentQuantity);
        console.log(currentQuantityText);
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
            var articleASupprimer = bouton.parentElement.parentElement.parentElement;
            articleASupprimer.remove();
            
           
            return; // Arrêtez l'exécution ici pour éviter de mettre à jour la quantité après la suppression
          } else if (text === "x") {
            prix_stock.splice(index, 1);
            prix_stock.splice(index, 0, 0); // Insérez l'élément à l'index désiré (nouvelIndex)
            calculPrixTotal();
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
    console.log(prix_stock);
    // Calcul du prix total du panier en additionnant chaque valeur dans le tableau prix_stock converti en entier pour l'addition
    var prixTotalCalculé = prix_stock.reduce(function (a, b) {
        return parseInt(a) + parseInt(b);
    }, 0); 
    
    

    // Sélectionnez l'élément HTML où vous souhaitez afficher le prix total
    var totalElement = document.querySelector(".total h1");

    // Mettez à jour le contenu de l'élément avec le prix total calculé
    totalElement.textContent = "Total : " + prixTotalCalculé + "€";
}

calculPrixTotal();
