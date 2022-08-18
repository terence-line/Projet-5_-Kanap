// Récupération des produits contenus dans le local storage
const products = JSON.parse(localStorage.getItem("products"));
console.table(products);


// Déclaration de variable
let cartItems = document.getElementById("cart__items");


// Vérification du contenu du panier : si le panier est vide
if (products === null) {
    alert("Votre panier est  vide");
}

// Si le panier est plein, afficher les produits
else {


    // Fonction pour obtenir le prix
    function getPrice(product){

        /* La méthode Promise.resolve(valeur) renvoit un objet Promise qui est résolu avec la valeur donnée. 
        Si cette valeur est une promesse, la promesse est renvoyée, si la valeur possède une méthode then, 
        la promesse renvoyée « suivra » cette méthode et prendra son état ; 
        sinon, la promesse renvoyée sera tenue avec la valeur.*/

        return new Promise((resolve)=>{

            fetch(`http://localhost:3000/api/products/${product.id}`).then((response)=>{

                return response.json();


            }).then((result)=>{

                    product.altTxt = result.altTxt;
                
                    product.imageUrl = result.imageUrl;

                    product.price = result.price;

                    product.name = result.name;

                    return resolve(product);
                    

                });

        });

    }

    /* La méthode Promise.all()renvoit une promesse ( Promise) qui est résolue 
    lorsque l'ensemble des promesses retenues dans l'itérable passé en argument ont été résolues.
    
    La méthode map() crée un nouveau tableau avec les résultats de l'appel d'une fonction fournie 
    sur chaque élément du tableau appelant.*/ 

    Promise.all(products.map(getPrice)).then((result)=>{

    
    
        // Boucle permettant d'insérer les produits
        for (i = 0; i < result.length; i++) {

               
            // Ajout de l'element article 
            let cartArticles = document.createElement("article");
            cartItems.appendChild(cartArticles);
            cartArticles.setAttribute("data-id", "{product-ID}");
            cartArticles.setAttribute("data-color", "{product-color}");
            cartArticles.className = "cart__item";


            // Ajout de la div cart__item__img qui va contenir l'img.
            let divCartImages = document.createElement("div");
            divCartImages.className = "cart__item__img";
            cartArticles.appendChild(divCartImages);


            // Ajout de l'élement img.
            let cartImages = document.createElement("img");
            cartImages.setAttribute('src', result[i].imageUrl);
            cartImages.setAttribute('alt', result[i].altTxt);
            divCartImages.appendChild(cartImages);


            // Ajout de la  div cart__item__content après l'image
            let divCartItems = document.createElement("div");
            divCartItems.className = "cart__item__content";
            cartArticles.appendChild(divCartItems);


            // Ajout de la div cart__item__content
            let divCartItemsDescription = document.createElement("div");
            divCartItemsDescription.className = "cart__item__content__description";
            divCartItems.appendChild(divCartItemsDescription);


            // Ajout du h2 qui va contenir le nom du produit.
            let divCartItemsDescriptionName = document.createElement("h2");
            divCartItemsDescription.appendChild(divCartItemsDescriptionName);
            divCartItemsDescriptionName.textContent = result[i].name;


            // Ajout d'un p qui va contenir la couleur du produit.
            let divCartItemsDescriptionColor = document.createElement("p");
            divCartItemsDescription.appendChild(divCartItemsDescriptionColor);
            divCartItemsDescriptionColor.textContent = result[i].color;


            // Ajout d'un p qui va contenir le prix du produit récupéré avec la prommesse resolve
            let divCartItemsDescriptionPrice = document.createElement("p");
            divCartItemsDescription.appendChild(divCartItemsDescriptionPrice);
            divCartItemsDescriptionPrice.textContent = result[i].price + " €"; 


            // Ajout de la div cart__item__content__settings
            let divCartItemsSetting = document.createElement("div");
            divCartItemsSetting.className = "cart__item__content__settings";
            divCartItems.appendChild(divCartItemsSetting);

            // Ajout de la div cart__item__content__settings__quantity
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
            inputQuantity.value = result[i].quantity;
            inputQuantity.className = "itemQuantity";
            inputQuantity.setAttribute("type", "number");
            inputQuantity.setAttribute("min", "1");
            inputQuantity.setAttribute("max", "100");
            inputQuantity.setAttribute("name", "itemQuantity");
            

            // Ajout de la div cart__item__content__settings__delete
            let divCartItemsDelete = document.createElement("div");
            divCartItemsDelete.className = "cart__item__content__settings__delete";
            divCartItems.appendChild(divCartItemsDelete);
            

            // Ajout d'un p qui va contenir le bouton "Supprimer".
            let pDeleteItem = document.createElement("p");
            pDeleteItem.className = "deleteItem";
            divCartItemsDelete.appendChild(pDeleteItem);
            pDeleteItem.textContent = "Supprimer";
        
        }
       

    }); 

    // Fonction pour calculer la quantité totale du panier
    function calculTotalQuantity() {

        // Déclaration de la variable représentant le total quantité.
        let totalQuantity = 0;
        let cart = products;
        
        // Boucle pour calculer la quantité globale.
        for (let number of cart) {
            let productsInCart = number.quantity;

            // Calcul total produits dans le panier.
            totalQuantity += productsInCart++;
        }
    
        document.getElementById("totalQuantity").textContent = totalQuantity;
    }
    
       calculTotalQuantity();


    // Fonction pour calculer le prix total du panier
    function calculTotalPrice() {

        // Déclaration de la variable représentant le total du prix.
        let totalPrice = 0;
        const result = products.price;
       
        // Boucle pour calculer le prix total du panier.
        for (let products in result) {
      
            products.price = result.price;

            totalPrice += totalQuantity * result.price;

        }

        document.getElementById("totalPrice").textContent = totalPrice;

    }

    calculTotalPrice();

}

   

