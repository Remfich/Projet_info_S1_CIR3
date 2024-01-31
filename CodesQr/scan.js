function onScanSuccess() {
    var message = document.querySelector("#message");
    message.innerHTML= "Article scanné";
}

var html5QrcodeScanner = new Html5QrcodeScanner(
"reader", { fps: 10, qrbox: 250 });
html5QrcodeScanner.render(onScanSuccess);