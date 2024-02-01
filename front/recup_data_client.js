var nbrow = 0;


async function affichageClientsBDD(){//Pour récupérer tous les clients de la BDD
    var test;
    var rep = await fetch('http://127.0.0.1:3000/api/data/afficheClients', {
    method: 'Post',
    mode:'cors',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(),
    })
    if(rep.ok){
        var data = await rep.json();
        var clients = data.data;
        console.log("clients",clients);

        for (let index = 0; index < clients.length; index++) {
            const element = clients[index];
            var table1 = document.getElementById("product-table");
            var newRow = table1.insertRow(-1);
            newRow.classList.add("Clients");
            newRow.id = nbrow;
            newRow.innerHTML = `
            <td contenteditable="true">`+element.nom+`</td> 
            <td contenteditable="true">`+element.prenom+`</td>
            <td contenteditable="true">`+element.email+`</td>
            <td contenteditable="true">`+element.mdp+`</td>
            <td><button class="btn btn-danger" onclick="supprimerClient(this,`+nbrow+`)">Supprimer</button></td>
            `;
            nbrow+=1;
        }
    }
}

affichageClientsBDD();

function save(){
    recup_data(nbrow,"save",true);
}
function supprimerClient(button,n) {
    recup_data(n,"suppr",false);
    var row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);
}

function ajouterClient() {
  var table1 = document.getElementById("product-table");
  var newRow = table1.insertRow(-1);
  newRow.classList.add("Clients");
  newRow.id = nbrow;
  newRow.innerHTML = `
    <td contenteditable="true"></td>
    <td contenteditable="true"></td>
    <td contenteditable="true"></td>
    <td contenteditable="true"></td>
    <td><button class="btn btn-danger" onclick="supprimerClient(this,`+nbrow+`)">Supprimer</button></td>
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
            if(prenom == "" && nom == "" && mail == "" && mdp == ""){
                option = "void";
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