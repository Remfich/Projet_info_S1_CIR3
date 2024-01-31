var url = "url";
var method = "POST";

function recup_data(n,option){
    var datalist = [];
    switch (option){
        case "modif":
            url = "modif";
            break;
        case "suppr":
            url = "suppr";
            break;
        case "add":
            url = "add";
            break;
        default:
            break;
    }
    if(data_pull(datalist,n)){
        for(let i =0; i < datalist.length; i++){
            requete(url,datalist[i],method);
        }
    }
}


function data_pull(datalist,n){

    const data = document.getElementsByClassName("Produits");
    if(n == -1){
        for(let i = 0; i < data.length; i++){
            // id sur 0/1, nom produit sur 2/3, nombre sur 4/5, prix sur 6/7
            var x = 3;
            let id = data[i].childNodes[x].textContent;
            let nom_produit = data[i].childNodes[x + 2].textContent;
            let nombre = data[i].childNodes[x + 4].textContent;
            let prix = data[i].childNodes[x + 6].textContent;

            let donnees = {id : id*1, nom : nom_produit, prix : prix*1, nbstock : nombre*1};


            datalist.push(donnees);


            document.getElementById("Warning").style.color = "red";
            if(id == "" ){
                document.getElementById("Warning").textContent = "Erreur : ID invalide";
                console.log("alerte id");
                return false;
            }
            else if(nom_produit == ""){
                document.getElementById("Warning").textContent = "Erreur : Nom Produit invalide";
                console.log("alerte nom");
                return false;
            }
            else if(nombre == ""){
                document.getElementById("Warning").textContent = "Erreur : Quantité invalide";

                console.log("alerte nombre");
                return false;
            }
            else if(prix == ""){
                document.getElementById("Warning").textContent = "Erreur : Prix invalide";
                console.log("alerte prix");
                return false;
            }
            else{
                document.getElementById("Warning").textContent = "";
            }
        }
        console.log(datalist);
        return true;
    }
    else{
        // id sur 0/1, nom produit sur 2/3, nombre sur 4/5, prix sur 6/7
        var x = 3;
        let id = data[n].childNodes[x].textContent;
        let nom_produit = data[n].childNodes[x + 2].textContent;
        let nombre = data[n].childNodes[x + 4].textContent;
        let prix = data[n].childNodes[x + 6].textContent;

        let donnees = {id : id*1, nom : nom_produit, prix : prix*1, nbstock : nombre*1};


        datalist.push(donnees);

        document.getElementById("Warning").style.color = "red";
        if(id == "" ){
            document.getElementById("Warning").textContent = "Erreur : ID invalide";
        //  document.getElementById("Warning").style.display = "block";
            console.log("alerte id");
            return false;
        }
        else if(nom_produit == ""){
            document.getElementById("Warning").textContent = "Erreur : Nom Produit invalide";
        //   document.getElementById("Warning").style.display = "block";
            console.log("alerte nom");
            return false;
        }
        else if(nombre == ""){
            document.getElementById("Warning").textContent = "Erreur : Quantité invalide";
        //  document.getElementById("Warning").style.display = "block";
            console.log("alerte nombre");
            return false;
        }
        else if(prix == ""){
            document.getElementById("Warning").textContent = "Erreur : Prix invalide";
        // document.getElementById("Warning").style.display = "block";
            console.log("alerte prix");
            return false;
        }
        else{
            document.getElementById("Warning").textContent = "";
        }
    console.log(datalist);
    return true;
    }
}



function requete(url,dataraw,method){
    // On envoie/reçoit une requête au back
    var xhttp=new XMLHttpRequest();
    xhttp.open(method,url,true);
    xhttp.setRequestHeader("Content-type", "application/json");
    console.log("data raw sent : " + JSON.stringify(dataraw));
    xhttp.send(JSON.stringify(dataraw));
    

    // On recoit la réponse et on l'affiche (ici avec une alerte)
    xhttp.onload = function() {
        let tableauArticle=JSON.parse(this.responseText);
        affiche_retour(tableauArticle);
    };
}
