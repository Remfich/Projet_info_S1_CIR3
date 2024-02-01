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

const loginForm = document.getElementById("login");
const loginButton = document.getElementById("submit");

async function connexion(){
    const email = document.getElementById("mail").value;
    const mdp = document.getElementById("mdp").value;
    console.log(email,mdp);
    const data = {
        email : email,
        mdp : mdp
    }
    const reponse = await requete(ip_serveur+":3000/connexion_back/connexion",data);
    console.log(reponse);
    if(reponse==false){
      console.log(1);
        window.alert("Cet email n'a pas de compte");
    }
    else if (reponse.est_admin){ // Si c'est un admin on ouvre la page des admins
      console.log(2);
        window.open(ip_front+":3001/front/adminStock.html","_self");
    }
    else{  // Sinon c'est que c'est un client
      console.log(3);
        window.open(ip_front+":3001/front/catalogue.html","_self");
    }
    window.open(ip_front+":3001/front/loginAdmin.html","_self");
}