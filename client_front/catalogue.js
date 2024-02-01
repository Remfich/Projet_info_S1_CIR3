let url = "http://127.0.0.1:3000/api/data";
let method = "POST";
var noms = [];
var i = 1;

var productsDiv; //variables globales


var category_tab=[]

function createCategory(nomCategorie, imgCategory) {
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
  productsDiv.setAttribute("id", nomCategorie);
  category_product.appendChild(productsDiv);

  //////////////////////////ON CREE LE BOUTON POUR LA CATEGORIE/////////////////////////////////////

  var categoryDiv = document.createElement("div");
  categoryDiv.className = "category";
  categoryDiv.setAttribute("id", "category" + i);
  document.querySelector(".categorizes").appendChild(categoryDiv);

  var bouton_categ = document.createElement("div");
  bouton_categ.className = "bouton_categ";
  bouton_categ.setAttribute("id", "bouton_categ" + i);
  categoryDiv.appendChild(bouton_categ);
  // ramène à la catégorie en question au clic
  document
    .querySelector("#category" + i)
    .addEventListener("click", function () {
      var id_clicked = this.getAttribute("id");
      var nmbr_clicked = id_clicked[8];
      location.href = "#category_product" + nmbr_clicked;
        document.querySelector(".barre-lat").style["display"]="none";
        document.querySelector(".main-part").style["display"]="block";
    });
  var img_categ = document.createElement("img");
  img_categ.src = imgCategory;
  bouton_categ.appendChild(img_categ);
  var title_categ = document.createElement("h2");
  text_categ = nomCategorie;
  title_categ.innerHTML = text_categ;
  bouton_categ.appendChild(title_categ);

  i++; //ON RAJOUTE UN NUMERO AU NOM DE LA CATEGORIE

  ////////////////////////////////////////////////////////////////
}

// CREATION DES PRODUITS////////////////////////////////////////////////////////////////////

function createProduct(nomProduit, prixProduit, nomCategorie,imgProduit) {
  var productDiv = document.createElement("div");

  productDiv.className = "product";
  productDiv.setAttribute("id", "product" + i);
  document.querySelector("#" + nomCategorie).appendChild(productDiv);

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
  image.src = imgProduit;
  imageDiv.appendChild(image);
  productDiv.appendChild(imageDiv);

  // Création de la div avec la classe "title_produit" et les titres à l'intérieur
  var titleDiv = document.createElement("div");
  titleDiv.className = "title_produit";
  var titleH4 = document.createElement("h4");
  var titleH5=document.createElement("h5");
  titleH4.textContent = nomProduit;
  titleH5.textContent = "Stock :"
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

  var nom = document
    .querySelector(".products")
    .children[0].querySelector(".title_produit").children[0].innerHTML;
  noms.push(nom);

  //REQUETE POST------------------------------------------------------------------------------------------------------------------





  button.addEventListener(
    "click",
    (function (index) {
      return async function () {
        const dataraw = {
          nom: noms[index - 1],
        };
        try {
          const response = await fetch(url, {
            method: method,
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(dataraw),
          });

          if (response.ok) {
            console.log("Article ajouté avec succès !");
          } else {
            console.error(
              "Erreur lors de l'ajout de l'article :",
              response.statusText
            );
          }
        } catch (error) {
          console.error("Erreur lors de la requête :", error);
        }
      };
    })(i)
  );
  //FIN REQUETE POST------------------------------------------------------------------------------------------------------------------
}


// TEST
createCategory("Boissons");
createProduct("Fanta",3,"Boissons","./img/fanta.png");

createCategory("Pates");
createProduct("Coca",3,"Pates","./img/coke.png");
createProduct("Coca",3,"Pates","./img/coke.png");
createProduct("Coca",3,"Pates","./img/coke.png");
createCategory("Pains");
createProduct("Coca",3,"Pains","./img/coke.png");
createProduct("Coca",3,"Pains","./img/coke.png");
createCategory("Frais");
createProduct("Coca",3,"Frais","./img/coke.png");
createProduct("Coca",3,"Frais","./img/coke.png");
createCategory("Boucherie");
createProduct("Coca",3,"Boucherie","./img/coke.png");
createProduct("Coca",3,"Boucherie","./img/coke.png");
createProduct("Coca",3,"Boucherie","./img/coke.png");
createProduct("Coca",3,"Boucherie","./img/coke.png");
createCategory("Fromager");
createProduct("Coca",3,"Fromager","./img/coke.png");
createCategory("Surgelés");
createCategory("Surgelés");
createCategory("Surgelés");



document.querySelector(".menu").onclick = function(){
  document.querySelector(".barre-lat").style["display"]="block";
  document.querySelector(".main-part").style["display"]="none";
};

document.querySelector(".menucat").onclick = function(){
  document.querySelector(".barre-lat").style["display"]="none";
  document.querySelector(".main-part").style["display"]="block";
};




