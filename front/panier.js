
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
  prix_stock.push(prixProduit);
    

  i++;
}

function createButton(text, index) {
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
            currentQuantity++;
          } else if (text === "-" && currentQuantity > 1) {
            currentQuantity--;
          } else if (text === "-" && currentQuantity === 1) {
            // Supprimer l'article parent du bouton "-"
            var articleASupprimer = bouton.parentElement.parentElement.parentElement;
            articleASupprimer.remove();
            return; // Arrêtez l'exécution ici pour éviter de mettre à jour la quantité après la suppression
          } else if (text === "x") {
            // Supprimer l'article parent du bouton "x"
            var articleASupprimer = bouton.parentElement.parentElement.parentElement;
            articleASupprimer.remove();
            return; // Arrêtez l'exécution ici pour éviter de mettre à jour la quantité après la suppression
          }
          
          currentQuantityElement.textContent = "Qté : " + currentQuantity;
          var prixTotal = prix_stock[index] * currentQuantity; // Calcule le prix total basé sur le prix initial
          var prixProduitElement = currentQuantityElement.parentElement.nextElementSibling.nextElementSibling;
         // prixProduitElement.remove();
         
            var prix = document.createElement("h2");
            prix.textContent = prixTotal + "€";
            prixProduitElement.appendChild(prix);
            prix_stock.push(prix_stock[index]);
    
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

const openai = new OpenAI({ apiKey: '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' });

async function main() {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: "donne moi l'équation de schrodinger "}],
    model: "gpt-3.5-turbo",
   
  });

  console.log(completion.choices[0]);
}

main();
