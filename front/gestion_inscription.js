function getCookie(cname) {
  let name = cname + "=";
  let ca = document.cookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
var ip_front = "http://10.224.2.92";

checkconnect();

function checkconnect(){
    var user = getCookie("user");
    var admin = getCookie("admin");
    if (user != "") {
      if(admin != ""){ // Si c'est un admin on ouvre la page des admins
        alert("C'est un admin");
        window.location.replace(ip_front+":3001/adminStock.html");
      }
      else {  // Sinon c'est que c'est un client
        alert("C'est un client");
        window.location.replace(ip_front+":3001/catalogue.html");
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
        document.cookie = "user=" +data.email+" ; path=/ ; max-age=86400 ;";
        // Code pour les cookies ici
        if (reponse.est_admin){ // Si c'est un admin on ouvre la page des admins
          window.location.replace(ip_front+":3001/adminStock.html");
            document.cookie = "admin=true ; path=/ ;  max-age=86400 ;";
        }
        else{  // Sinon c'est que c'est un client
          window.location.replace(ip_front+":3001/catalogue.html");
            document.cookie = "admin= ; path=/ ;  max-age=0 ;";
        }
    }
}
