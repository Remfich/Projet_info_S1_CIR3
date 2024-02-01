var nbrow = 0;
async function affichageStocksBDD(){//Pour récupérer tous les clients de la BDD
    fetch('http://127.0.0.1:3000/api/data/afficheStock', {
    method: 'Post',
    mode:'cors',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(),
    })
    if(rep.ok){
        var data = await rep.json();
        var stock = data.data;
        console.log("Stocks",stock);

        for (let index = 0; index < stock.length; index++) {
            const element = stock[index];
            var table1 = document.getElementById("product-table");
            var newRow = table1.insertRow(-1);
            newRow.classList.add("Produits");
            newRow.id = nbrow;
            newRow.innerHTML = `
            <td contenteditable="true">`+element.id+`</td> 
            <td contenteditable="true">`+element.nom+`</td>
            <td contenteditable="true">`+element.nbstock+`</td>
            <td contenteditable="true">`+element.prix+`</td>
            <td><button class="btn btn-danger" onclick="supprimerClient(this,`+nbrow+`)">Supprimer</button></td>
            `;
            nbrow+=1;
        }
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
                    console.log(option);
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



affichageStocksBDD();