const urlSearchParams = new URLSearchParams(window.location.search);

const orderId = urlSearchParams.get("orderId");
orderId = document.getElementById("orderId");
orderId.innerHTML = `${orderId}`;