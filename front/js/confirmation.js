// Affichage du numéro de commande

const urlSearchParams = new URLSearchParams(window.location.search);

let orderId = urlSearchParams.get("orderId");

document.getElementById("orderId").innerHTML = `${orderId}`;