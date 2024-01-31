var url = "url";
var method = "POST";

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
       if(data_pull(datalist,n*1,isall)){
        for(let i =0; i < datalist.length; i++){
            requete(url,datalist[i],method);
        }
    }
}


function data_pull(datalist,n,isall){

    //const data = document.getElementsByClassName("Produits");
    if(isall){
        for(let i = 0; i < n; i++){
            var data = document.getElementById(i);
            console.log(data);
            // id sur 0/1, nom produit sur 2/3, nombre sur 4/5, prix sur 6/7
            var x = 1;
            let id = data.childNodes[x].textContent;
            let nom_produit = data.childNodes[x + 2].textContent;
            let nombre = data.childNodes[x + 4].textContent;
            let prix = data.childNodes[x + 6].textContent;

            let donnees = {id : id*1, nom : nom_produit, prix : prix*1, nbstock : nombre*1};


            datalist.push(donnees);


            if(id == "" ){
                //document.getElementById("Warning").textContent = "Erreur : ID invalide";
                alert("Erreur : ID invalide");
                console.log("alerte id");
                return false;
            }
            else if(nom_produit == ""){
                //document.getElementById("Warning").textContent = "Erreur : Nom Produit invalide";
                alert("Erreur : Nom Produit invalide");
                console.log("alerte nom");
                return false;
            }
            else if(nombre == ""){
                //document.getElementById("Warning").textContent = "Erreur : Quantité invalide";
                alert("Erreur : Quantité invalide");
                console.log("alerte nombre");
                return false;
            }
            else if(prix == ""){
                //document.getElementById("Warning").textContent = "Erreur : Prix invalide";
                alert("Erreur : Prix invalide");
                console.log("alerte prix");
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

        let donnees = {id : id*1, nom : nom_produit, prix : prix*1, nbstock : nombre*1};
        datalist.push(donnees);

        if(id == "" ){
            //document.getElementById("Warning").textContent = "Erreur : ID invalide";
            prompt(alert("Erreur : ID invalide"));
            console.log("alerte id");
            return false;
        }
        else if(nom_produit == ""){
            //document.getElementById("Warning").textContent = "Erreur : Nom Produit invalide";
            prompt(alert("Erreur : Nom Produit invalide"));
            console.log("alerte nom");
            return false;
        }
        else if(nombre == ""){
            //document.getElementById("Warning").textContent = "Erreur : Quantité invalide";
            prompt(alert("Erreur : Quantité invalide"));
            console.log("alerte nombre");
            return false;
        }
        else if(prix == ""){
            //document.getElementById("Warning").textContent = "Erreur : Prix invalide";
            prompt(alert("Erreur : Prix invalide"));
            console.log("alerte prix");
            return false;
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
