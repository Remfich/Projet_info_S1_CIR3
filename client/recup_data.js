function recup_data(){
    var datalist = [];

    const data = document.getElementsByClassName("Produits");

    for(let i = 0; i < data.length; i++){
        // id sur 0/1, nom produit sur 2/3, nombre sur 4/5, prix sur 6/7
        var x = 3;
        let id = data[i].childNodes[x].textContent;
        let nom_produit = data[i].childNodes[x + 2].textContent;
        let nombre = data[i].childNodes[x + 4].textContent;
        let prix = data[i].childNodes[x + 6].textContent;

        let donnees = [id,nom_produit,nombre,prix];
        datalist.push(donnees);

        document.getElementById("Warning").style.color = "red";
        if(id == "" ){
            document.getElementById("Warning").textContent = "Erreur : ID invalide";
          //  document.getElementById("Warning").style.display = "block";
            console.log("alerte");
            return false;
        }
        else if(nom_produit == ""){
            document.getElementById("Warning").textContent = "Erreur : Nom Produit invalide";
         //   document.getElementById("Warning").style.display = "block";
            console.log("alerte");
            return false;
        }
        else if(nombre == ""){
            document.getElementById("Warning").textContent = "Erreur : Quantité invalide";
          //  document.getElementById("Warning").style.display = "block";
            console.log("alerte");
            return false;
        }
        else if(prix == ""){
            document.getElementById("Warning").textContent = "Erreur : Prix invalide";
           // document.getElementById("Warning").style.display = "block";
            console.log("alerte");
            return false;
        }
        else{
            document.getElementById("Warning").textContent = "";
        }
    }
    console.log(datalist);
    return true;



}
