var url = "url";
var method = "POST";
//http://ipdatabase:3000/client/deleteClient
//http://ipdatabase:3000/client/createClient

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
            // prenom sur 0/1, nom produit sur 2/3, email sur 4/5, mot de passe sur 6/7
            var x = 1;
            let prenom = data.childNodes[x].textContent;
            let nom = data.childNodes[x + 2].textContent;
            let mail = data.childNodes[x + 4].textContent;
            let mdp = data.childNodes[x + 6].textContent;

            //let donnees = {prenom : prenom, nom : nom, mail : mail, mdp : mdp, action : option};
            let donnees = [prenom,nom, mail, mdp,option];

            datalist.push(donnees);

            if(option == !"suppr"){
                if(prenom == "" ){
                    alert("Erreur : prenom invalide");
                    console.log("alerte prenom");
                    return false;
                }
                else if(nom == ""){
                    alert("Erreur : Nom invalide");
                    console.log("alerte nom");
                    return false;
                }
                else if(mail == ""){
                    alert("Erreur : mail invalide");
                    console.log("alerte mail");
                    return false;
                }
                else if(mdp == ""){
                    alert("Erreur : Mot de passe invalide");
                    console.log("alerte mdp");
                    return false;
                }
            }
            if(option == "suppr" && prenom == "" && nom == "" && mail == "" && mdp == ""){
                return false;
            }
        }
        console.log(datalist);
        return true;
    }
    else{
        var data = document.getElementById(n);
        // prenom sur 0/1, nom produit sur 2/3, email sur 4/5, mot de passe sur 6/7
        var x = 1;
        let prenom = data.childNodes[x].textContent;
        let nom = data.childNodes[x + 2].textContent;
        let mail = data.childNodes[x + 4].textContent;
        let mdp = data.childNodes[x + 6].textContent;

        //let donnees = {prenom : prenom, nom : nom, mail : mail, mdp : mdp, action : option};
        let donnees = [prenom,nom, mail, mdp,option];
        datalist.push(donnees);

        if(option == !"suppr"){
            if(prenom == "" ){
                alert("Erreur : prenom invalide");
                console.log("alerte prenom");
                return false;
            }
            else if(nom == ""){
                alert("Erreur : Nom invalide");
                console.log("alerte nom");
                return false;
            }
            else if(mail == ""){
                alert("Erreur : mail invalide");
                console.log("alerte mail");
                return false;
            }
            else if(mdp == ""){
                alert("Erreur : Mot de passe invalide");
                console.log("alerte mdp");
                return false;
            }
        }
        if(option == "suppr" && prenom == "" && nom == "" && mail == "" && mdp == ""){
            return false;
        }
    }
    console.log(datalist);
    return true;
}



function requete(){//url,dataraw,method <= paramètres
    console.log("test2");
    var data_;
    fetch('http://127.0.0.1:3000/api/data', {
    method: 'Post',
    mode:'cors',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message: 'recupDonnees' }),
    })
    .then(response => response.json())
    .then(data => console.log(data)) // [id,nom,stock,prix]
    .catch((error) => console.error('Error:', error));
}



function requete2(){//url,dataraw,method <= paramètres
    console.log("test2");
    var tabData = [1,1,1,1,1];
    fetch('http://127.0.0.1:3000/api/data', {
    method: 'Post',
    mode:'cors',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(tabData),
    })
    .then(response => response.json())
    .then()
    .catch((error) => console.error('Error:', error));
}