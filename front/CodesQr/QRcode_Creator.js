// __ Importing qrcode __ \\
const QRCode = require('qrcode');


function create_new_QRcode(name, link){
  QRCode.toFile('./QRcodes/'+name+'.png', link, {
    errorCorrectionLevel: 'H'
  }, function(err) {
    if (err) throw err;
    console.log('Le Qrcode nommé '+name+'.png à bien été créé');
  });
}

/*
[ {"nom" : "Fanta Orange " , "prix" :1 , "nbstock" : 666 , "categorie" : "Boissons"},
  {"nom" : "Chips Lays - Barbecue" , "prix" :3.99 , "nbstock" : 400 , "categorie" : "Snacks"},
  {"nom" : "CocaCola " , "prix" : 1.98 , "nbstock" : 0 , "categorie" : "Boissons"},
  {"nom" : "Pringles - Nature " , "prix" :3.50 , "nbstock" : 2 , "categorie" : "Snacks"},
  {"nom" : "Scoubidou Lutti" , "prix" :2.67 , "nbstock" : 102 , "categorie" : "Sucreries"},
  {"nom" : "Petits Poids Carottes Bonduelle" , "prix" :4.98 , "nbstock" : 231 , "categorie" : "Conserves"},
  {"nom" : "Lentilles - Auchan" , "prix" : 4.15 , "nbstock" : 59 , "categorie" : "Conserves"},
  {"nom" : "PÃ©pito Pocket LU" , "prix" : 1.99 , "nbstock" : 83 , "categorie" : "Biscuits"},
  {"nom" : "Mikado LU" , "prix" :1.19 , "nbstock" : 21 , "categorie" : "Biscuits"},
  {"nom" : "Fraises Tagada Harribo" , "prix" : 3.78 , "nbstock" : 123 , "categorie" : "Sucreries"},
  {"nom" : "TUC Original LU" , "prix" : 2.85 , "nbstock" : 193 , "categorie" : "Snacks"},
  {"nom" : "Eau Evian" , "prix" : 1.35 , "nbstock" : 293 , "categorie" : "Boissons"},
  {"nom" : "Kinder Bueno" , "prix" : 2.75, "nbstock" : 121 , "categorie" : "Biscuits"},
  {"nom" : "Couscous Royal - Garbit" , "prix" :4.79 , "nbstock" : 76 , "categorie" : "Conserves"},
  {"nom" : "Les Schtroumpfs Harribo" , "prix" : 3.38 , "nbstock" : 32 , "categorie" : "Sucreries"}
]*/

/*
create_new_QRcode("FantaOrange","{nom : 'Fanta Orange'}");
create_new_QRcode("ChipsLays","{nom : 'Chips Lays - Barbecue'}");
create_new_QRcode("CocaCola","{nom : 'CocaCola'}");
create_new_QRcode("Pringles","{nom : 'Pringles - Nature'}");
create_new_QRcode("ScoubidouLutti","{nom : 'Scoubidou Lutti'}");
create_new_QRcode("PetitsPoiscarottes","{nom : 'Petits Poids Carottes Bonduelle'}")
create_new_QRcode("Lentilles","{nom : 'Lentilles - Auchan'}");
create_new_QRcode("Pepito","{nom : 'Pepito Pocket LU'}");
create_new_QRcode("Mikado","{nom : 'Mikado LU'}");
create_new_QRcode("Fraisestagada","{nom : 'Fraises Tagada Harribo'}");
create_new_QRcode("TUC","{nom : 'TUC Original LU'}");
create_new_QRcode("Eau","{nom : 'Eau Evian'}");
create_new_QRcode("KinderBueno","{nom : 'Kinder Bueno'}");
create_new_QRcode("Couscous","{nom : 'Couscous Royal - Garbit'}");
create_new_QRcode("Schtroumfs","{nom : 'Les Schtroumpfs Harribo'}");
*/

