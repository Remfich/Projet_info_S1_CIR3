export async function requete(url:string,donnees:any) {
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

export const ip_serveur = "http://localhost";
export const ip_db = "http://localhost";
export const ip_front = "";

export function getCookie(cname) {
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


export function isconnectedadmin(){
  let user = getCookie("user");
  let admin = getCookie("admin");
  if(user != "" && admin == "true"){
    //c'est bon
  }
  else{
    alert("Accès refusé, vous n'êtes pas connecté en tant qu'admin");
    window.open(ip_front+":3001/catalogue.html","_self");
  }
}

export function isconnectedclient(){
  let user = getCookie("user");
  let admin = getCookie("admin");
  if(user != "" && admin != ""){
    //c'est bon
  }
  else{
    alert("Accès refusé, vous n'êtes pas connecté");
    window.open(ip_front+":3001/catalogue.html","_self");
  }
}

