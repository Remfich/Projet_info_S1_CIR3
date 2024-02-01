import "../utilitaire";
import { getCookie } from "../utilitaire";

checkconnect();
function checkconnect(){
  alert(document.cookie);
  var user = getCookie("user");
  var admin = getCookie("admin");
  if (user != "") {
    alert("C'est un utilisateur");
    alert(admin);
    if (admin == true){ // Si c'est un admin on ouvre la page des admins
      alert("C'est un admin");
      window.location.href(ip_front+":3001/adminStock.html","_self");
    }
    else if (admin !="") {  // Sinon c'est que c'est un client
      alert("C'est un client");
      window.location.href(ip_front+":3001/catalogue.html","_self");
    }
  }
}

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

const ip_serveur = "http://localhost";
const ip_db = "http://localhost";
const ip_front = "http://localhost";

async function inscription(){
    const email = document.getElementById("email").value;
    const password = document.getElementById("mdp").value;
    const nom = document.getElementById("nom").value;
    const prenom = document.getElementById("prenom").value;
    
    const data={
        nom : nom,
        prenom : prenom,
        email : email,
        mdp : password
    }

    const reponse = await requete(ip_serveur+":3000/connexion_back/creation",data);
    if(reponse==false){ // S'il y a un echec dans la requête
        window.alert("Cette adresse email est déjà prise.");
    }
    else{
        document.cookie = "user=" +data.email+", path=/, max-age=86400";
        // Code pour les cookies ici
        if (reponse.est_admin){ // Si c'est un admin on ouvre la page des admins
          window.location.href(ip_front+":3001/adminStock.html","_self");
            document.cookie = "admin=true, path=/,  max-age=86400";
        }
        else{  // Sinon c'est que c'est un client
          window.location.href(ip_front+":3001/catalogue.html","_self");
            document.cookie = "admin=false , path=/,  max-age=86400";
        }
    }
}
