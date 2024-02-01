import { Body, Controller, Post } from "@nestjs/common";
import{ip_db, requete} from "../utilitaire"



@Controller('client_back')
export class ClientBackController {

  // Requête pour récupérer les articles de la base de données à l'initialisation de la page
  @Post('/init')
  async init_client() : Promise<Object[]>{
    // On doit demander à la DB la liste des produits pour pouvoir la renvoyer à l'utilisateur
    const reponse = await requete('http://10.224.2.87:3000/produit/getAllProduit',{});
    for (let i=0;i<reponse.length;i++){
      delete reponse[i]._id;
      delete reponse[i].__v;
    }
    return reponse;
  }

  @Post('/ajoutPanier')
  async ajoutPanier(@Body() nom_produit:object) : Promise<boolean>{
    console.log(nom_produit);
    // On reçoit le nom d'un produit, on va interroger la DB sur ce produit pour obtenir ses informations
    const reponse = await requete(ip_db+':3000/produit/getProduit',nom_produit);
    if (reponse.nbstock>0){
      // Si on a le produit en stock alors on renvoie le produit à la base de donnée et 
      // on lui demande de diminuer le stock de 1
      reponse.nbstock=reponse.nbstock-1;
      delete reponse._id;
      delete reponse.__v;
      await requete(ip_db+':3000/produit/updateProduit',reponse);
      return true;
    }
    else{ // Sinon soit le produit n'existe pas soit on ne l'a plus en stock
      return false;
    }
  }

  // Prend une donnée de type [{nom: "lenom",quantite:laquantite},{...},...]
  @Post('/viderPanier')
  async videPanier(@Body() panier:any[]) : Promise<boolean>{
    try{
    // Pour chaque article du panier on va ajouter sa quantité au stock
    for(var i =0;i<panier.length;i++){
      // Pour chaque produit du panier on va interroger la DB pour obtenir en retour les détails de ce produit
      const produit = await requete(ip_db+':3000/produit/getProduit',{nom : panier[i].nom})
      // On traite la réponse pour quelle soit au bon format
      delete produit._id;
      delete produit.__v;
      // On ajoute à la quantité du stock la quantité du produit qu'il y avait dans le panier
      produit.nbstock=produit.nbstock+panier[i].quantite;
      // Enfin on met à jour le produit dans la DB
      await requete(ip_db+':3000/produit/updateProduit',produit);
    }
    }catch (e){
      console.log(e);
      return false;
    }
    return true;
  }

  // Prend une donnée de la forme 
  // {email:"emailduclient",commande:[{nom:"nomProdui1",prix:prixProduit1,quantite:quantiteProduit1},...]}
  @Post('/achatPanier')
  async achatPanier(@Body() panier:any) : Promise<boolean>{
    try{
    // Ici on va "transvaser" le contenu du panier dans l'historique du client
    // Commençons par identifier le client
    const client = await requete(ip_db+":3000/client/getClient",{email:panier.email});
    // Une fois qu'on a le client on récupère son historique déjà présent et on y ajoute la nouvelle commande
    client.histo.push(panier.commande);
    // On renvoie une requete pour mettre à jour le client dans la DB
    await requete(ip_db+":3000/client/updateClient",{email:panier.email, histo : client.histo})
    }catch (e){
      console.log(e);
      return false;
    }
    return true
  }

  @Post('/getHisto')
  async getHisto(@Body() email_client : any) : Promise<Object[][]>{
    // On va récupérer le client et renvoyer son historique
    const client = await requete(ip_db+":3000/client/getClient",{email : email_client.email});
    return client.histo;
  }
}