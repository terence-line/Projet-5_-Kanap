// Récupération des produits contenus dans le local storage
const tableauLocalStorage = JSON.parse(localStorage.getItem("products"));
console.table(tableauLocalStorage);


// Affichage des produits du local storage
const productPanier = document.querySelector("#cart__items");
console.log(productPanier);


// Vérification du contenu du panier : si le panier est vide
if (tableauLocalStorage === null || tableauLocalStorage == 0) {
    alert("Votre panier est  vide");
}
// Si le panier est plein, afficher les produits
else {

    prixProduits = [];
    afficher_panier();
    panierSelection = [];
    
    
    function afficher_panier() {

    for (i = 0; i < tableauLocalStorage.length; i++) {

        fetch(`http://localhost:3000/api/products/${(tableauLocalStorage[i].id)}`)
            //console.log(tableauLocalStorage[i].id)
            .then((response) => {
                return response.json();
            })
            .then((resultProduct) => {
                console.log(resultProduct);

                // Alimenter le tableau des prix
                prixProduits.push("products");
                console.log(prixProduits);

                let monHtml = "";
                const j = resultProduct.length;
                for (i = 0; i < j; i++) {

                html +=

                    `<article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
                        <div class="cart__item__img">
                            <img src="${resultProduct[i].imageUrl}" alt="${resultProduct[i].altTxt}">
                        </div>
                        <div class="cart__item__content">
                             <div class="cart__item__content__description">
                                <h2>${resultProduct[i].name}</h2>
                                <p>${resultProduct[i].myColorValue}</p>
                                <p>${resultProduct[i].price} €</p>
                            </div>
                            <div class="cart__item__content__settings">
                                <div class="cart__item__content__settings__quantity">
                                    <p>Qté : </p>
                                    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=" ${resultProduct[i].quantity}">
                                </div>
                                <div class="cart__item__content__settings__delete">
                                    <p class="deleteItem">Supprimer</p>
                                </div>
                            </div>
                        </div>
                    </article>`;
                }

                productPanier.innerHTML += panierSelection;

            });

            
        }
    }
}


    



        




    

/*prixProduits = [];


let panierSelection = [];

    for (i = 0; i < tableauLocalStorage.length; i++) {
        
        panierSelection = panierSelection +

            `<article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
            <div class="cart__item__img">
                <img src="${tableauLocalStorage[i].imageUrl}" alt="${tableauLocalStorage[i].altTxt}">
            </div>
            <div class="cart__item__content">
                <div class="cart__item__content__description">
                    <h2>${tableauLocalStorage[i].name}</h2>
                    <p>${tableauLocalStorage[i].myColorValue}</p>
                    <p>${tableauLocalStorage[i].price} €</p>
                </div>
                <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                        <p>Qté : </p>
                        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=" ${tableauLocalStorage[i].quantity}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                        <p class="deleteItem">Supprimer</p>
                    </div>
                </div>
            </div>
        </article>`;
    }

    productPanier.innerHTML = panierSelection;



    // Alimenter le tableau des prix
    prixProduits.push("products");
    console.log(prixProduits);
}*/
