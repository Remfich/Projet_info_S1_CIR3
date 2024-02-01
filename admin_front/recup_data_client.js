var url = "url";
var method = "POST";
//http://ipdatabase:3000/client/deleteClient
//http://ipdatabase:3000/client/createClient
document.addEventListener('click', (event)=>{
    suprClientBDD([1,1,1,1,1]);
})

var clients = affichageClientBDD();
for (let index = 0; index < stock.length; index++) {
    const element = stock[index];
}

function recup_data(n,option,isall){
    var datalist = [];
    if(data_pull(datalist,n*1,isall,option)){
        for(let i =0; i < datalist.length; i++){
            switch (option){
                case "suppr":
                    console.log(option);
                    suprClientBDD(datalist[i]);
                    break;
                case "save":
                    console.log(option);
                    ajoutClientBDD(datalist[i]);
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
            } catch (error) {
                console.log(error)
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


function ajoutClientBDD(client){//tableau contenant toutes les infos du client
    fetch('http://127.0.0.1:3000/api/data/ajoutClient', {
    method: 'Post',
    mode:'cors',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(client),
    })
    .then(response => response.json())
    .then(console.log("Client ajouté !"))
    .catch((error) => console.error('Error:', error));
}
function suprClientBDD(client){//tableau du client qui sera supprimé
    fetch('http://127.0.0.1:3000/api/data/suprClient', {
    method: 'Post',
    mode:'cors',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(client),
    })
    .then(response => response.json())
    .then(console.log("Client supprimé !"))
    .catch((error) => console.error('Error:', error));
}
function affichageClientsBDD(){//Pour récupérer tous les clients de la BDD
    fetch('http://127.0.0.1:3000/api/data/afficheClients', {
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