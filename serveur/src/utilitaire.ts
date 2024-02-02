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

export const ip_serveur = "http://10.224.2.87";
export const ip_db = "http://10.224.2.87";