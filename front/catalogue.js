var ip_front = "http://10.224.2.92";
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

const ip_serveur = "http://10.224.2.87";

isconnectedclient();

let url = ip_serveur + ":3000/api/data";
let method = "POST";
var noms = [];
var categories = [];

let id = 0;





// Fonction pour récupérer la valeur d'un cookie en fonction de son nom
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


async function returnStock() {
  try {
    const resultat = await requete(ip_serveur+":3000/client_back/init",{});
    if (resultat!=undefined) {
      console.log('Stock chargé avec succès');

      resultat.forEach(article => {
        const id = article.id;
        const nom = article.nom;
        const prix = article.prix;
        const nbStock = article.nbstock;
        const categorie = article.categorie;

        if (!categories.includes(categorie)) {
          createCategory(categorie, "./img/"+categorie+".png");
          categories.push(categorie);
        }
       
        createProduct(nom, prix, categorie, "./img/"+id+".png", nbStock);
      });

       } else {
      console.error('Erreur lors du chargement du stock', response.statusText);
    }
  } catch (error) {
    console.error('Erreur lors de la requête :', error);
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


 var panierJSON = getCookie("panier");
 var panier = [];
if(panierJSON != ""){
// Convertir la chaîne JSON en tableau d'objets
    panier = JSON.parse(panierJSON);
}
else{
  document.cookie = "panier=, path=/,  max-age=86400";
  
} 

  // Ajouter le nom de l'article au panier
 panier.push({ nom: nomArticle });

  // Convertir le tableau mis à jour en une chaîne JSON
var nouveauPanierJSON = JSON.stringify(panier);
document.cookie = "panier="+nouveauPanierJSON+", path=/,  max-age=86400";
//alert("nouveaupanierjson",nouveauPanierJSON);
  // Mettre à jour le cookie "panier" avec le nouveau contenu


  
  //alert("cookies :",document.cookie);
  
}

// Utilisation de la fonction pour ajouter un article au panier



// CREATION DES PRODUITS////////////////////////////////////////////////////////////////////

function createProduct(nomProduit, prixProduit, nomCategorie,imgProduit, nbStock) {
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
   var titleH5 = document.createElement("h5");
   titleH4.textContent = nomProduit;
  
   titleDiv.appendChild(titleH4);
   titleH5.textContent = "Stock :" + nbStock;
   titleDiv.appendChild(titleH5);
   productDiv.appendChild(titleDiv);

  // Création de la div avec la classe "prix_produit" et le prix à l'intérieur
  var priceDiv = document.createElement("div");
  priceDiv.className = "prix_produit";
  var priceH4 = document.createElement("h4");
  priceH4.textContent = prixProduit + "€";
  priceDiv.appendChild(priceH4);
  productDiv.appendChild(priceDiv);
/*
  var papy = document.querySelector(".category_product").children[1];
  var papa = children[0];
  var moi = children[2];
  var fiston = children[0];
  var nom = papy.papa.moi.fiston.innerHTML;
  Merci julien le sang
  */

  noms.push(nomProduit);

  button.addEventListener("click", function(event) {
    var buttonId = event.currentTarget.getAttribute("data-id");
    //si le nom n'existe pas dans le panier, on l'ajoute sinon on augmente sa quantité dans le panier
    var nomArticle = noms[buttonId];
    mettreDansPanier(nomArticle);
    alert(nomArticle + " ajouté au panier !");
    
    
  });

  id++;
  
}


document.querySelector(".menu").onclick = function(){
  document.querySelector(".barre-lat").style["display"]="block";
  document.querySelector(".main-part").style["display"]="none";
};

document.querySelector(".menucat").onclick = function(){
  document.querySelector(".barre-lat").style["display"]="none";
  document.querySelector(".main-part").style["display"]="block";
};

returnStock();





