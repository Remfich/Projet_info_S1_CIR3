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
var ip_front="http://10.224.2.92";
const ip_serveur = "http://10.224.2.87";
  
function isconnectedadmin(){
    let user = getCookie("user");
    let admin = getCookie("admin");
    if(user != "" && admin != ""){
      //c'est bon
    }
    else{    
        alert("Accès refusé, vous n'êtes pas connecté en tant qu'admin");
        window.location.replace(ip_front+":3001/catalogue.html");
    }
}

isconnectedadmin();

async function requete(url,donnees) {
    try {
      const data = {
        method: "POST",
        headers: {
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
  
  async function logout(){
    document.cookie = "user=; max-duration = 0; path=/;";
    document.cookie = "admin=; max-duration = 0; path=/;";
    await new Promise(r => setTimeout(r, 1000));
    document.location.replace(ip_front +":3001/loginAdmin.html")
}




var nbrow = 0;
async function affichageStocksBDD(){//Pour récupérer tous les produits de la BDD
    const reponse= await requete(ip_serveur+':3000/api/data/afficheStock',{})
    var stock = reponse.data;
    console.log("Stocks chargés");

    for (let index = 0; index < stock.length; index++) {
        const element = stock[index];
        var table1 = document.getElementById("product-table");
        var newRow = table1.insertRow(-1);
        newRow.classList.add("Produits");
        newRow.id = nbrow;
        newRow.innerHTML = `
        <td contenteditable="false">`+element.id+`</td> 
        <td contenteditable="true">`+element.nom+`</td>
        <td contenteditable="true">`+element.nbstock+`</td>
        <td contenteditable="true">`+element.prix+`</td>
        <td contenteditable="true">`+element.categorie+`</td>
        <td><button class="btn btn-danger" onclick="supprimerProduit(this,`+nbrow+`)">Supprimer</button></td>
        `;
        nbrow+=1;
    }
}

affichageStocksBDD();

function save(){
    recup_data(nbrow,"save",true);
 }

function supprimerProduit(button,n) {
    recup_data(n,"suppr",false);
    var row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);
}


function ajouterProduit() {
    var table1 = document.getElementById("product-table");
    var newRow = table1.insertRow(-1);
    newRow.classList.add("Produits");
    newRow.id = nbrow;
    newRow.innerHTML = `
    <td contenteditable="true"></td>
    <td contenteditable="true"></td>
    <td contenteditable="true"></td>
    <td contenteditable="true"></td>
    <td contenteditable="true"></td>
    <td><button class="btn btn-danger" onclick="supprimerProduit(this,`+ nbrow +`)">Supprimer</button></td>
    `;
    nbrow+=1;
}



function recup_data(n,option,isall){
    var datalist = [];
    if(data_pull(datalist,n*1,isall,option)){
        for(let i =0; i < datalist.length; i++){
            switch (option){
                case "suppr":
                    console.log(option);
                    suprStockBDD(datalist[i]);
                    break;
                case "save":
                    ajoutStockBDD(datalist[i]);
                    break;
                default:
                    console.log(option);
                    break;
            }
        }
    }
}


function data_pull(datalist,n,isall,option){
    if(isall == true){
        for(var i = 0; i < n; i++){
            try {
                var data = document.getElementById(i);
                // id sur 0/1, nom produit sur 2/3, nombre sur 4/5, prix sur 6/7
                var x = 1;
                let id = data.childNodes[x].textContent;
                let nom_produit = data.childNodes[x + 2].textContent;
                let nombre = data.childNodes[x + 4].textContent;
                let prix = data.childNodes[x + 6].textContent;
                let categorie = data.childNodes[x+8].textContent;
    
                //let donnees = {id : id*1, nom : nom_produit, prix : prix*1, nbstock : nombre*1, action : option};
                let donnees = [id*1,nom_produit,prix*1,nombre*1,categorie,option];
                datalist.push(donnees);
    
                if(id == "" ){
                    alert("Erreur : ID invalide");
                    console.log("alerte id");
                    return false;
                }
                else if(nom_produit == ""){
                    alert("Erreur : Nom Produit invalide");
                    console.log("alerte nom");
                    return false;
                }
                else if(nombre == ""){
                    alert("Erreur : Quantité invalide");
                    console.log("alerte nombre");
                    return false;
                }
                else if(prix == ""){
                    alert("Erreur : Prix invalide");
                    console.log("alerte prix");
                    return false;
                }
                else if(categorie = ""){
                    alert("Erreur : Catégorie invalide");
                    console.log("alerte catégorie");
                    return false;
                }
                // On regarde si l'id n'est pas déjà pris
                for(let i = 0;i<datalist.length-1;i++){
                    if (id==datalist[i][0]){
                        alert("Erreur : Il y a une redondance d'Id");
                        return false;
                    }
                }
                if(option == "suppr" && id == "" && nom_produit == "" && nombre == "" && prix == "" && categorie==""){
                    return false;
                } 
            } catch (error) {
                console.log(error);
            }
            
        }
        console.log(datalist);
        return true;
    }
    else{
        var data = document.getElementById(n);
        // id sur 0/1, nom produit sur 2/3, nombre sur 4/5, prix sur 6/7
        var x = 1;
        let id = data.childNodes[x].textContent;
        let nom_produit = data.childNodes[x + 2].textContent;
        let nombre = data.childNodes[x + 4].textContent;
        let prix = data.childNodes[x + 6].textContent;
        let categorie = data.childNodes[x+8].textContent;

        //let donnees = {id : id*1, nom : nom_produit, prix : prix*1, nbstock : nombre*1, action : option};
        let donnees = [id*1,nom_produit,prix*1,nombre*1,categorie,option];
        datalist.push(donnees);

        if(id == "" ){
            alert("Erreur : ID invalide");
            console.log("alerte id");
            return false;
        }
        else if(nom_produit == ""){
            alert("Erreur : Nom Produit invalide");
            console.log("alerte nom");
            return false;
        }
        else if(nombre == ""){
            alert("Erreur : Quantité invalide");
            console.log("alerte nombre");
            return false;
        }
        else if(prix == ""){
            alert("Erreur : Prix invalide");
            console.log("alerte prix");
            return false;
        }
        else if(categorie == ""){
            alert("Erreur : Catégorie invalide");
            console.log("alerte ctegorie");
            return false;
        }
        
        if(option == "suppr" && id == "" && nom_produit == "" && nombre == "" && prix == "" && categorie == ""){
            return false;
        }
    return true;
    }
}


async function ajoutStockBDD(stock){//tableau contenant toutes les infos du stock
    data={
        id : stock[0],
        nom : stock[1],
        prix : stock[2],
        nbstock : stock[3],
        categorie : stock[4]
    }
   await requete(ip_serveur+':3000/api/data/ajoutStock',data)
   open(ip_front+":3001/adminStock.html");
}
async function suprStockBDD(stock){//tableau du stock qui sera supprimé
    data={
        id : stock[0],
        nom : stock[1],
        prix : stock[2],
        nbstock : stock[3],
        categorie : stock[4]
    }
    await requete(ip_serveur+":3000/api/data/suprStock",data);
}
