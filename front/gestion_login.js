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
        return erreur;
    }
}
var ip_front = "http://10.224.2.92";
const ip_serveur = "http://10.224.2.87";


checkconnect();

function checkconnect(){
    var user = getCookie("user");
    var admin = getCookie("admin");
    if (user != "") {
      if(admin != ""){ // Si c'est un admin on ouvre la page des admins
        alert("Bonjour admin " +user);
        window.location.replace(ip_front+":3001/adminStock.html");
      }
      else {  // Sinon c'est que c'est un client
        alert("Bienvenue client "+user);
        window.location.replace(ip_front+":3001/catalogue.html");
      }
    }
}




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
      document.cookie = "user=" +data.email+", path=/, max-age=86400";
      window.location.replace(ip_front+":3001/adminStock.html");
      document.cookie = "admin=true, path=/,  max-age=86400";
    }
    else{  // Sinon c'est que c'est un client
      document.cookie = "user=" +data.email+", path=/, max-age=86400";
      document.cookie = "admin=, path=/,  max-age=0";
      window.location.replace(ip_front+":3001/catalogue.html");
    }
}


