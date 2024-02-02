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
  function onScanSuccess(message) {
    alert("Article Scanné");
    var url = ip_serveur +":3000/client_back/ajoutPanier";
    
    console.log(data);
    try{var data = JSON.parse(message)}
    catch(erreur){
      console.log("erreur",erreur);
    }
    
    requete(url,data);
}

async function logout(){
  document.cookie = "user=; max-duration = 0; path=/;";
  document.cookie = "admin=; max-duration = 0; path=/;";
  await new Promise(r => setTimeout(r, 1000));
  document.location.replace(ip_front +":3001/loginAdmin.html")
}


var html5QrcodeScanner = new Html5QrcodeScanner("reader", { fps: 10, qrbox: 250 });
html5QrcodeScanner.render(onScanSuccess);