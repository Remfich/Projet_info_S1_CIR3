import "../utilitaire";
import { isconnectedclient } from "../utilitaire";
isconnectedclient();

const ip_serveur = "http://10.224.2.87";

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
      console.error("Erreur :", erreur);
    }
  }


// Fonction pour générer le corps de la page
                async function genererCorpsDePage() {
                    // Créer le conteneur principal
                    var container = document.getElementById('facturesContainer');

                    // Données d'entrée
                    var histo = await requete(ip_serveur+":3000/client_back/getHisto",{email : "star.morte@gmail.com"});
                    console.log(histo);
                    // Parcourir les données et générer les factures
                    for (var i = 0; i < histo.length; i++) {
                        var facture = genererFacture(i + 1, histo[i]);
                        container.appendChild(facture);
                    }
                    // Appeler la fonction pour éditer les factures
                    editerFactures();
                }

                // Fonction pour générer une facture
                function genererFacture(factureId, produits) {
                    // Créer un élément de facture
                    var facture = document.createElement('div');
                    facture.className = 'facture';
                    facture.id = 'facture' + factureId;

                    // Ajouter le contenu de la facture (similaire à votre structure existante)
                    var contenuFacture = '<div><div class="entete"><h1>Facture ' + factureId + '</h1></div>';
                    contenuFacture += '<div class="details-facture"><h2>Détails de la facture</h2><table><tr>';
                    contenuFacture += '<th>Produit</th><th>Quantté</th><th>Prix unitaire</th><th>Total</th></tr></div>';

                    // Calculer les totaux pour chaque produit
                    var totalFacture = 0;
                    for (var j = 0; j < produits.length; j++) {
                        var produit = produits[j];
                        var totalProduit = produit.prix * produit.quantite;
                        totalFacture += totalProduit;

                        contenuFacture += '<tr><td>' + produit.nom + '</td><td>' + produit.quantite + '</td>';
                        contenuFacture += '<td>' + produit.prix + '€</td><td>' + totalProduit + '€</td></tr>';
                    }

                    // Ajouter le total de la facture
                    contenuFacture += '</table></div><div class="total"><p>Total à payer: ' + totalFacture + '€</p></div>';
                    facture.innerHTML = contenuFacture;

                    return facture;
                }

                // Fonction pour éditer les factures
                function editerFactures() {
                    // Vous pouvez ajouter ici la logique d'édition des factures si nécessaire
                }

                // Appeler la fonction pour générer le corps de la page
                genererCorpsDePage();
   
 