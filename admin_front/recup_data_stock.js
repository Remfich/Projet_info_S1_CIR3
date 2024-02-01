var url = "url";
var method = "POST";
//http://ipdatabase:3000/produit/deleteProduit
//http://ipdatabase:3000/produit/createProduit

function recup_data(n,option,isall){
    var datalist = [];
    switch (option){
        case "modif":
            url = "modif";
            console.log(option);
            break;
        case "suppr":
            url = "suppr";
            console.log(option);
            break;
        case "save":
            url = "save";
            console.log(option);
            break;
        default:
            console.log(option);
            break;
    }
       if(data_pull(datalist,n*1,isall,option)){
        for(let i =0; i < datalist.length; i++){

            requete(url,datalist[i],method);
        }
    }
}


function data_pull(datalist,n,isall,option){
    if(isall == true){
        for(var i = 0; i < n; i++){
            var data = document.getElementById(i);
            // id sur 0/1, nom produit sur 2/3, nombre sur 4/5, prix sur 6/7
            var x = 1;
            let id = data.childNodes[x].textContent;
            let nom_produit = data.childNodes[x + 2].textContent;
            let nombre = data.childNodes[x + 4].textContent;
            let prix = data.childNodes[x + 6].textContent;

            //let donnees = {id : id*1, nom : nom_produit, prix : prix*1, nbstock : nombre*1, action : option};
            let donnees = [id*1,nom_produit,prix*1,nombre*1,option];
            datalist.push(donnees);

            if(option == !"suppr"){
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
            }
            if(option == "suppr" && id == "" && nom_produit == "" && nombre == "" && prix == ""){
                return false;
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

        //let donnees = {id : id*1, nom : nom_produit, prix : prix*1, nbstock : nombre*1, action : option};
        let donnees = [id*1,nom_produit,prix*1,nombre*1,option];
        datalist.push(donnees);

        if(option == !"suppr"){
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
        }
        if(option == "suppr" && id == "" && nom_produit == "" && nombre == "" && prix == ""){
            return false;
        }
    console.log(datalist);
    return true;
    }
}




function ajoutStockBDD(stock){//tableau contenant toutes les infos du stock
    fetch('http://127.0.0.1:3000/api/data/ajoutStock', {
    method: 'Post',
    mode:'cors',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(stock),
    })
    .then(response => response.json())
    .then(console.log("Stock ajouté !"))
    .catch((error) => console.error('Error:', error));
}
function suprStockBDD(stock){//tableau du stock qui sera supprimé
    fetch('http://127.0.0.1:3000/api/data/suprStock', {
    method: 'Post',
    mode:'cors',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(stock),
    })
    .then(response => response.json())
    .then(console.log("Stock supprimé !"))
    .catch((error) => console.error('Error:', error));
}
function affichageStocksBDD(){//Pour récupérer tous les clients de la BDD
    fetch('http://127.0.0.1:3000/api/data/afficheStock', {
    method: 'Post',
    mode:'cors',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(),
    })
    .then(response => response.json())
    .then(data => {return data})
    .catch((error) => console.error('Error:', error));
}
