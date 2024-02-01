import "../utilitaire";
import { getCookie } from "../utilitaire";

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
        window.location.href(ip_front+":3001/adminStock.html");
      }
      else if (admin !="") {  // Sinon c'est que c'est un client
        alert("C'est un client");
        window.location.href(ip_front+":3001/catalogue.html");
      }
    }
  }


const ip_serveur = "http://localhost";
const ip_db = "http://localhost";
const ip_front = "http://localhost";

async function connexion(){
    const email = document.getElementById("mail").value;
    const mdp = document.getElementById("mdp").value;
    const data = {
        email : email,
        mdp : mdp
    }
    const reponse = await requete(ip_serveur+":3000/connexion_back/connexion",data);
    if(reponse==false){
      window.alert("Cet email n'a pas de compte");
    }
    else if (reponse.est_admin){ // Si c'est un admin on ouvre la page des admins
      window.location.href(ip_front+":3001/adminStock.html");
    }
    else{  // Sinon c'est que c'est un client
      window.location.href(ip_front+":3001/catalogue.html");
    }
}


