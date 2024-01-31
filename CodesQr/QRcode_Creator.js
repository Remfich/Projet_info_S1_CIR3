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

create_new_QRcode("test","this text will be encoded in the qrcode");

