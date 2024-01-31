export async function requete(url:string,donnees:any) {
    try {
      const reponse = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(donnees)
      });
      const resultat = await reponse.json();
      return resultat;
    } catch (erreur) {
      console.error("Erreur :", erreur);
    }
  }

export const ip_serveur = "10.224.2.87"; // PC Olivier
export const ip_db = "10.224.2.97"; // PC Esteban
export const ip_front = "";