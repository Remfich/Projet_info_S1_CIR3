let method = "POST";
var noms = [];
var categories = [];
let url = "http://10.224.2.92:3000/client_back/init";

let id = 0;





// Fonction pour récupérer la valeur d'un cookie en fonction de son nom
function getCookie(cookieName) {
  var name = cookieName + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var cookieArray = decodedCookie.split(';');
  for (var i = 0; i < cookieArray.length; i++) {
    var cookie = cookieArray[i].trim();
    if (cookie.indexOf(name) === 0) {
      return cookie.substring(name.length, cookie.length);
    }
  }
  return "";
}


async function returnStock() {
  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      console.log('Stock chargé avec succès');
      const resultat = await response.json()
      console.log(resultat);

      resultat.forEach(article => {
        const id = article.id;
        const nom = article.nom;
        const prix = article.prix;
        const nbStock = article.nbstock;
        const categorie = article.categorie;

     
        
        // Utilisez ces valeurs comme vous le souhaitez
        console.log(`ID: ${id}, Nom: ${nom}, Prix: ${prix}, NbStock: ${nbStock}, Categorie: ${categorie}`);
        if (!categories.includes(categorie)) {
          createCategory(categorie, "./img/coke.png");
          categories.push(categorie);
        }
        createProduct(nom, prix, categorie, "./img/coke.png");
      });

       } else {
      console.error('Erreur lors du chargement du stock', response.statusText);
    }
  } catch (error) {
    console.error('Erreur lors de la requête :', error);
  }
};




async function ajoutPanier (id) {
  console.log(id);
  let url2 = "http://10.224.2.92:3000/client_back/ajoutPanier"
  const dataraw = {
     nom: noms[id]
  };
  console.log(url2);
  console.log(method);
  console.log(dataraw);
  
  try {
    const response2 = await fetch(url2, { 
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataraw),
    });
    

    if (response2.ok) {
      console.log("Article ajouté avec succès !");
      console.log(noms[id - 1]);
      mettreDansPanier(noms[id - 1]);
     

    } else {
      console.error(
        "Erreur lors de l'ajout de l'article :",
        response2.statusText
      );
    
    }
  } catch (error) {
    console.error("Erreur lors de la requête :", error);
    
  }

};



var i = 1;

var productsDiv; //variables globales


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
    .querySelector("#bouton_categ" + i)
    .addEventListener("click", function () {
      var id_clicked = this.getAttribute("id");
      var nmbr_clicked = id_clicked[12];
      location.href = "#category_product" + nmbr_clicked;
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


// CREATION DES COOKIES////////////////////////////////////////////////////////////////////
// Fonction pour créer ou mettre à jour le cookie "panier"
function mettreDansPanier(nomArticle) {
  // Lire le cookie "panier"
  var panierJSON = getCookie("panier");
  var panier = [];

  if (panierJSON) {
    // Convertir la chaîne JSON en tableau d'objets
    panier = JSON.parse(panierJSON);
  }

  // Ajouter le nom de l'article au panier
  panier.push({ nom: nomArticle });

  // Convertir le tableau mis à jour en une chaîne JSON
  var nouveauPanierJSON = JSON.stringify(panier);

  // Mettre à jour le cookie "panier" avec le nouveau contenu
  document.cookie = "panier=" + nouveauPanierJSON;
  
}

// Utilisation de la fonction pour ajouter un article au panier



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
  button.setAttribute("data-id", id);
  button.type = "submit";

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
  titleH4.textContent = nomProduit;
  titleDiv.appendChild(titleH4);
  productDiv.appendChild(titleDiv);

  // Création de la div avec la classe "prix_produit" et le prix à l'intérieur
  var priceDiv = document.createElement("div");
  priceDiv.className = "prix_produit";
  var priceH4 = document.createElement("h4");
  priceH4.textContent = prixProduit + "€";
  priceDiv.appendChild(priceH4);
  productDiv.appendChild(priceDiv);


  var nom = document.querySelector(".category_product").children[1].children[0].children[2].children[0].innerHTML;
  console.log("nom : " + nomProduit);
  noms.push(nomProduit);
  console.log(noms);



  button.addEventListener("click", function(event) {
    var buttonId = event.currentTarget.getAttribute("data-id");
    console.log(buttonId);
   
    ajoutPanier(buttonId);
    
    
  });

  id++;
  
}

returnStock();





