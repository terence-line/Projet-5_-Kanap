// Récupération des produits contenus dans le local storage
const tableauLocalStorage = JSON.parse(localStorage.getItem("products"));
console.table(tableauLocalStorage);

prixProduits = [];

// Déclaration de variable
let cartItems = document.getElementById("cart__items");


// Vérification du contenu du panier : si le panier est vide
if (tableauLocalStorage === null || tableauLocalStorage == 0) {
    alert("Votre panier est  vide");
}
// Si le panier est plein, afficher les produits
else {

    afficherProduit();
    function afficherProduit() {

        for (i = 0; i < tableauLocalStorage.length; i++) {
    
        fetch(`http://localhost:3000/api/products/${(tableauLocalStorage[i].id)}`)
        //console.log(tableauLocalStorage[i].id)
                .then((response) => {
                    return response.json();
                })
                .then((resultProduct) => {
                    console.log(resultProduct)


                    // Ajout de l'element article.
                    let cartArticles = document.createElement("article");
                    cartItems.appendChild(cartArticles);
                    cartArticles.setAttribute("data-id", "{product-ID}");
                    cartArticles.setAttribute("data-color", "{product-color}");
                    cartArticles.className = "cart__item";

                    // Ajout de l'element div qui va contenir l'img.
                    let divCartImages = document.createElement("div");
                    divCartImages.className = "cart__item__img";
                    cartArticles.appendChild(divCartImages);

                    // Ajout de l'élement img.
                    let cartImages = document.createElement("img");
                    cartImages.setAttribute('src', resultProduct.imageUrl);
                    cartImages.setAttribute('alt', resultProduct.altTxt);
                    divCartImages.appendChild(cartImages);

                    // Ajout d'une div.
                    let divCartItems = document.createElement("div");
                    divCartItems.className = "cart__item__content";
                    cartArticles.appendChild(divCartItems);

                    // Ajout d'une div.
                    let divCartItemsDescription = document.createElement("div");
                     divCartItemsDescription.className = "cart__item__content__description";
                    divCartItems.appendChild(divCartItemsDescription);

                    // Ajout du h2 qui va contenir le nom du produit.
                    let divCartItemsDescriptionName = document.createElement("h2");
                    divCartItemsDescription.appendChild(divCartItemsDescriptionName);
                    divCartItemsDescriptionName.textContent = resultProduct.name;

                    // Ajout d'un p qui va contenir la couleur du produit.
                    let divCartItemsDescriptionColor = document.createElement("p");
                    divCartItemsDescription.appendChild(divCartItemsDescriptionColor);
                    divCartItemsDescriptionColor.textContent = resultProduct.color;

                    // Ajout d'un p qui va contenir le prix du produit.
                    let divCartItemsDescriptionPrice = document.createElement("p");
                    divCartItemsDescription.appendChild(divCartItemsDescriptionPrice);
                    divCartItemsDescriptionPrice.textContent = resultProduct.price + " €"; // Ici le prix a été récupéré de l'api directement.

                    // Ajout d'une div.
                    let divCartItemsSetting = document.createElement("div");
                    divCartItemsSetting.className = "cart__item__content__settings";
                    divCartItems.appendChild(divCartItemsSetting);

                    // Ajout d'une div.
                    let divCartItemsSettingQuantity = document.createElement("div");
                    divCartItemsSettingQuantity.className = "cart__item__content__settings__quantity";
                    divCartItemsSetting.appendChild(divCartItemsSettingQuantity);

                    // Ajout d'un p qui va contenir le mot "Qté :".
                    let divCartItemsSettingQty = document.createElement("p");
                    divCartItemsSettingQuantity.appendChild(divCartItemsSettingQty);
                    divCartItemsSettingQty.textContent = "Qté : ";

                    // Ajout de l'input qui va contenir la quantité.
                    let inputQuantity = document.createElement("input");
                    divCartItemsSettingQuantity.appendChild(inputQuantity);
                    inputQuantity.value = resultProduct.quantity;
                    inputQuantity.className = "itemQuantity";
                    inputQuantity.setAttribute("type", "number");
                    inputQuantity.setAttribute("min", "1");
                    inputQuantity.setAttribute("max", "100");
                    inputQuantity.setAttribute("name", "itemQuantity");
                    inputQuantity.setAttribute("value", "`${tableauLocalStorage[i].quantity}`")

                    // Ajout d'une div.
                    let divCartItemsDelete = document.createElement("div");
                    divCartItemsDelete.className = "cart__item__content__settings__delete";
                    divCartItems.appendChild(divCartItemsDelete);

                    // Ajout d'un p qui va contenir le bouton "Supprimer".
                    let pDeleteItem = document.createElement("p");
                    pDeleteItem.className = "deleteItem";
                    divCartItemsDelete.appendChild(pDeleteItem);
                    pDeleteItem.textContent = "Supprimer";
                });

            }
            // Alimenter le tableau des prix
            prixProduits.push("products");
            

    }    
}
