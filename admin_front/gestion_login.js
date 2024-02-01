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

loginButton.addEventListener("click", async (e) => {
    e.preventDefault();
    const email = loginForm.email.value;
    const mdp = loginForm.password.value;

    const data = {
        email : email,
        mdp : mdp
    }
    const reponse = await requete(ip_serveur+":3000/connexion_back/connexion",data);
    if(reponse==false){
        window.alert("Cet email n'a pas de compte");
    }
    else if (reponse.est_admin){ // Si c'est un admin on ouvre la page des admins
        window.open(ip_front+":3000/admin_front/adminStock.html","_self");
    }
    else{  // Sinon c'est que c'est un 
        window.open(ip_front+":3000/client_front/catalogue.html","_self");
    }
});


function recup_all_login_data(){

}