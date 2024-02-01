import "../utilitaire";
import { ip_serveur, requete } from "../utilitaire";
function onScanSuccess() {
    var message = document.querySelector("#message");
    message.innerHTML= "Article scanné";
    switch(message){
        case "{nom : 'Fanta Orange'}": 
            var url = ip_serveur +":3000/client_back/ajoutPanier";
            var data = {nom : "Fanta Orange"};
            requete(url,data);
            break;
        
        case "{nom : 'Chips Lays - Barbecue'}": 
            var url = ip_serveur +":3000/client_back/ajoutPanier";
            var data = {nom : "Chips Lays - Barbecue"};
            requete(url,data);
            break;
            
        case "{nom : 'CocaCola'}": 
            var url = ip_serveur +":3000/client_back/ajoutPanier";
            var data = {nom : "CocaCola"};
            requete(url,data);
            break;
        
        case "{nom : 'Pringles - Nature'}": 
            var url = ip_serveur +":3000/client_back/ajoutPanier";
            var data = {nom : "Pringles - Nature"};
            requete(url,data);
            break;
            
        case "{nom : 'Scoubidou Lutti'}": 
            var url = ip_serveur +":3000/client_back/ajoutPanier";
            var data = {nom : "Scoubidou Lutti"};
            requete(url,data);
            break;
        
        case "{nom : 'Petits Poids Carottes Bonduelle'}": 
            var url = ip_serveur +":3000/client_back/ajoutPanier";
            var data = {nom : "Petits Poids Carottes Bonduelle"};
            requete(url,data);
            break;
            
        case "{nom : 'Lentilles - Auchan'}": 
            var url = ip_serveur +":3000/client_back/ajoutPanier";
            var data = {nom : "Lentilles - Auchan"};
            requete(url,data);
            break;
        
        case "{nom : 'Pepito Pocket LU'}": 
            var url = ip_serveur +":3000/client_back/ajoutPanier";
            var data = {nom : "Pepito Pocket LU"};
            requete(url,data);
            break;
            
        case "{nom : 'Mikado LU'}": 
            var url = ip_serveur +":3000/client_back/ajoutPanier";
            var data = {nom : "Mikado LU"};
            requete(url,data);
            break;
        
        case "{nom : 'Fraises Tagada Harribo'}": 
            var url = ip_serveur +":3000/client_back/ajoutPanier";
            var data = {nom : "Fraises Tagada Harribo"};
            requete(url,data);
            break;
            
        case "{nom : 'TUC Original LU'}": 
            var url = ip_serveur +":3000/client_back/ajoutPanier";
            var data = {nom : "TUC Original LU"};
            requete(url,data);
            break;
        
        case "{nom : 'Eau Evian'}": 
            var url = ip_serveur +":3000/client_back/ajoutPanier";
            var data = {nom : "Eau Evian"};
            requete(url,data);
            break;
            
        case "{nom : 'Kinder Bueno'}": 
            var url = ip_serveur +":3000/client_back/ajoutPanier";
            var data = {nom : "Kinder Bueno"};
            requete(url,data);
            break;
        
        case "{nom : 'Couscous Royal - Garbit'}": 
            var url = ip_serveur +":3000/client_back/ajoutPanier";
            var data = {nom : "Couscous Royal - Garbit"};
            requete(url,data);
            break;
            
        case "{nom : 'Les Schtroumpfs Harribo'}": 
            var url = ip_serveur +":3000/client_back/ajoutPanier";
            var data = {nom : "Les Schtroumpfs Harribo"};
            requete(url,data);
            break;
        
        default:
            break;
    }
}

var html5QrcodeScanner = new Html5QrcodeScanner(
"reader", { fps: 10, qrbox: 250 });
html5QrcodeScanner.render(onScanSuccess);