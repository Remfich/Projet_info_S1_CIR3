
  let url = "http://127.0.0.1:3000/api/data";
  let method = "POST";
  var noms = [];
  var i = 1;

var productsDiv; //variables globales

function createCategory(nomCategorie) {
  var category_product = document.createElement("div");
  category_product.className = "category_product";
  category_product.setAttribute("id", "category_product" + i);
  document.querySelector(".main").appendChild(category_product);
  var categnameDiv = document.createElement("div");
  categnameDiv.className = "categName";
  category_product.appendChild(categnameDiv);
  var title_categ = document.createElement("h1");
  title_categ.textContent = nomCategorie;
  categnameDiv.appendChild(title_categ);
  productsDiv = document.createElement("div");
  productsDiv.className = "products";
  category_product.appendChild(productsDiv);

  //////////////////////////ON CREE LE BOUTON POUR LA CATEGORIE/////////////////////////////////////

  var categoryDiv = document.createElement("div");
  categoryDiv.className = "category";
  categoryDiv.setAttribute("id", "category" + i);
  document.querySelector(".categorizes").appendChild(categoryDiv);

  var bouton_categ = document.createElement("div");
  bouton_categ.className = "bouton_categ";
  bouton_categ.addEventListener("click", function () {
    location.href = "#category_product";
  
  });
  categoryDiv.appendChild(bouton_categ);

  var img_categ = document.createElement("img");
  img_categ.src = "";
  bouton_categ.appendChild(img_categ);
  var title_categ = document.createElement("h2");
  text_categ = nomCategorie;
  title_categ.innerHTML = text_categ;
  bouton_categ.appendChild(title_categ);

  i++; //ON RAJOUTE UN NUMERO AU NOM DE LA CATEGORIE

  ////////////////////////////////////////////////////////////////
}

// CREATION DES PRODUITS////////////////////////////////////////////////////////////////////

function createProduct(nomProduit, descriptionProduit, prixProduit) {
  var productDiv = document.createElement("div");

  productDiv.className = "product";
  productDiv.setAttribute("id", "product" + i);
  productsDiv.appendChild(productDiv);

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
  titleH4.textContent = nomProduit;
  var titleH5 = document.createElement("h5");
  titleH5.textContent = descriptionProduit;
  titleDiv.appendChild(titleH4);
  titleDiv.appendChild(titleH5);
  productDiv.appendChild(titleDiv);

  // Création de la div avec la classe "prix_produit" et le prix à l'intérieur
  var priceDiv = document.createElement("div");
  priceDiv.className = "prix_produit";
  var priceH4 = document.createElement("h4");
  priceH4.textContent = prixProduit + "€";
  priceDiv.appendChild(priceH4);
  productDiv.appendChild(priceDiv);

  
  var nom = document.querySelector(".products").children[0].querySelector(".title_produit").children[0].innerHTML;
  noms.push(nom);

  //REQUETE POST------------------------------------------------------------------------------------------------------------------



  button.addEventListener("click", (function(index) {
    return async function() {
      const dataraw = {
        nom : noms[index-1],
      };
      try {
        const response = await fetch(url, {
          method: method,
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(dataraw)
        });

        if (response.ok) {
          console.log('Article ajouté avec succès !');
        } else {
          console.error('Erreur lors de l\'ajout de l\'article :', response.statusText);
        }
      } catch (error) {
        console.error('Erreur lors de la requête :', error);
      }
    };
  })(i));
  //FIN REQUETE POST------------------------------------------------------------------------------------------------------------------
}