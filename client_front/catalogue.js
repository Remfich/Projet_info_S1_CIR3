  
// CREATION DES PRODUITS////////////////////////////////////////////////////////////////////

for(var i=1;i<=15;i++){
    var productDiv = document.createElement("div");
    productDiv.className = "product";
    console.log(productDiv)
    document.querySelector(".products").appendChild(productDiv);
  
    
  
    var lien = document.createElement("a");
    lien.href = ""; // Spécifie l'URL du lien
    productDiv.appendChild(lien); // Ajoute le lien à la fin du corps du document, vous pouvez choisir un autre emplacement selon vos besoins
  
    // Création du bouton avec la classe "hidden-button" et le contenu "<h3>+</h3>"
    var button = document.createElement("button");
    button.className = "hidden-button";
    button.innerHTML = "<h3>+</h3>";
  
    // Ajout du bouton à la div "product"
    lien.appendChild(button);
  
    // Création de la div avec la classe "image_produit" et l'image à l'intérieur
    var imageDiv = document.createElement("div");
    imageDiv.className = "image_produit";
    var image = document.createElement("img");
    image.src = "./img/coke.png";
    imageDiv.appendChild(image);
    productDiv.appendChild(imageDiv);
  
    // Création de la div avec la classe "title_produit" et les titres à l'intérieur
    var titleDiv = document.createElement("div");
    titleDiv.className = "title_produit";
    var titleH4 = document.createElement("h4");
    titleH4.textContent = "Coca-cola";
    var titleH5 = document.createElement("h5");
    titleH5.textContent = "50cl";
    titleDiv.appendChild(titleH4);
    titleDiv.appendChild(titleH5);
    productDiv.appendChild(titleDiv);
  
    // Création de la div avec la classe "prix_produit" et le prix à l'intérieur
    var priceDiv = document.createElement("div");
    priceDiv.className = "prix_produit";
    var priceH4 = document.createElement("h4");
    priceH4.textContent = "1€";
    priceDiv.appendChild(priceH4);
    productDiv.appendChild(priceDiv);
  }
  
  /////////////////////////////////////////////////////////////////////////////////////////
  