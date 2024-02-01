// test//


var i=0
var Quantité=1;

addArticle("./img/coke.png","2","Coca");
addArticle("./img/coke.png","2","Coca");
addArticle("./img/coke.png","2","Coca");
addArticle("./img/coke.png","2","Coca");
addArticle("./img/coke.png","2","Coca");
addArticle("./img/coke.png","2","Coca");

function addArticle(imgProduit,prixProduit,titreProduit){


    var article =document.createElement("div");
    article.className="Produit";
    document.querySelector(".articles").appendChild(article);

    var imgProduct = document.createElement("img");
    imgProduct.src=imgProduit;
    article.appendChild(imgProduct);

    var textProduit = document.createElement("div");
    textProduit.className="text_Produit";
    article.appendChild(textProduit);

    var titleProduit = document.createElement("div");
    titleProduit.className ="title_produit";
    textProduit.appendChild(titleProduit);

    var titre=document.createElement("h2");
    titre.textContent=titreProduit;
    titleProduit.appendChild(titre);

    var quantity=document.createElement("h3");
    quantity.textContent="Qté : "+Quantité;
    titleProduit.appendChild(quantity);

    var modifier = document.createElement("div");
    modifier.className = "modifier";
    textProduit.appendChild(modifier);

    var bouton_moins = document.createElement("button");
    bouton_moins.setAttribute("id","bouton_moins"+i);
    bouton_moins.textContent="-";
    modifier.appendChild(bouton_moins);


    var bouton_plus = document.createElement("button");
    bouton_plus.setAttribute("id","bouton_plus"+i);
    bouton_plus.textContent="+";
    modifier.appendChild(bouton_plus);

    var bouton_supp = document.createElement("button");
    bouton_supp.className ="bouton_supp";
    bouton_supp.setAttribute("id","bouton_supp"+i);
    bouton_supp.textContent="x";
    modifier.appendChild(bouton_supp);


    var prix_product = document.createElement("div");
    prix_product.className = "prixProduit";
    textProduit.appendChild(prix_product);

    var prix= document.createElement("h2");
    prix.textContent = prixProduit+"€";
    prix_product.appendChild(prix);
    
    i++

}

















