/*// Appel des produits avec l'id via fetch
async function getProducts(id) {
    return fetch(`http://localhost:3000/api/products/${id}`)
    .then (response => response.json())
    .catch(err => console.log(err))
}

// Fonction pour la récupération de différents paramètres  
async function main() {

    // Récupération des produits contenus dans le local storage
    const products = JSON.parse(localStorage.getItem("products"));

    // Vérification du contenu du panier : si le panier est vide
    if (products === null) {
        alert("Votre panier est  vide");
    }

    // Si le panier est plein, afficher les produits
    else {
        let prices = [];
        // Récupération des prix et des quantités
        for (x of products) {
            let product = await getProducts(x.id)
            let addProduct = {
                quantity: x.quantity,
                price: product.price
            }
            prices.push(addProduct);
        
            displayCard(x, product);
            console.log(product);
            

        }
        calculTotalPrice(prices);
        calculTotalQuantity(products);
    
    }

    // Fonction pour l'affichage des produits
    function displayCard(product, data) {
        // Déclaration de variable
        let cartItems = document.getElementById("cart__items");

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
        cartImages.setAttribute('src', data.imageUrl);
        cartImages.setAttribute('alt', data.altTxt);
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
        divCartItemsDescriptionName.textContent = data.name;

        // Ajout d'un p qui va contenir la couleur du produit.
        let divCartItemsDescriptionColor = document.createElement("p");
        divCartItemsDescription.appendChild(divCartItemsDescriptionColor);
        divCartItemsDescriptionColor.textContent = product.color;

        // Ajout d'un p qui va contenir le prix du produit récupéré avec la prommesse resolve
        let divCartItemsDescriptionPrice = document.createElement("p");
        divCartItemsDescription.appendChild(divCartItemsDescriptionPrice);
        divCartItemsDescriptionPrice.textContent = data.price + " €";

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
        inputQuantity.value = product.quantity;
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

    // Fonction pour calculer la quantité totale du panier
    function calculTotalQuantity(product) {

        // Déclaration de la variable représentant le total quantité.
        let totalQuantity = 0;
        let cart = product;

        // Boucle pour calculer la quantité globale.
        for (let number of cart) {
            let productsInCart = number.quantity;

            // Calcul total produits dans le panier.
            totalQuantity += productsInCart++;
            }

            document.getElementById("totalQuantity").innerHTML = totalQuantity;
        }

        // Fonction pour calculer le prix total du panier
        function calculTotalPrice(panier) {
            let totalPrice = 0;

            for(x of panier) {
                totalPrice = parseInt(x.quantity, 10) * x.price + totalPrice 
            }
            document.getElementById("totalPrice").textContent = totalPrice;
        }
//**********************************************************************************
    
        // Fonction pour modifier une quantité
        let cart = products;
        let itemQuantity = document.querySelectorAll(".itemQuantity");
        console.log(itemQuantity);
        
        function changeQuantity() {
            addEventListener("click", (itemQuantity) => {
             
            console.log(itemQuantity);
                let foudProduct = cart.find(p => p.id == cart.id);
                if (foudProduct != undefined) {
                    
                    foudProduct.quantity += quantity;
                }    
                console.log(foudProduct);
            }); 
                
        }
       
        changeQuantity();
       
       
       /* //Fonction pour supprimer les articles
        function deleteArticle() {
            let deleteProduct = document.querySelectorAll(".deleteItem");
                
               
        }
        
        
        deleteArticle(); 
        
}        
main();*/

const products = JSON.parse(localStorage.getItem("products"));

function getPrice(product) {

    return new Promise((resolve) => {

        fetch(`http://localhost:3000/api/products/${product.id}`).then((response) => {

            return response.json();

        }).then((result) => {

            product.altTxt = result.altTxt;

            product.imageUrl = result.imageUrl;

            product.price = result.price;

            product.name = result.name;

            return resolve(product);

        });

    });

}

Promise.all(products.map(getPrice)).then((result) => {

    // Ici tu ecris ton code

    const totalQuantityNode = document.querySelector("#totalQuantity");

    const totalPriceNode =  document.querySelector("#totalPrice");
    
    let html = "";

    result.forEach((kanap)=>{
          

           html+= `

               <article class="cart__item" data-id="${kanap.id}" data-color="${kanap.color}">
                    <div class="cart__item__img">
                    <img src="${kanap.imageUrl}" alt="${kanap.altTxt}">
                    </div>
                    <div class="cart__item__content">
                    <div class="cart__item__content__description">
                         <h2>${kanap.name}</h2>
                         <p>${kanap.color}</p>
                         <p>${kanap.price} €</p>
                    </div>
                    <div class="cart__item__content__settings">
                         <div class="cart__item__content__settings__quantity">
                         <p>Qté :</p>
                         <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${kanap.quantity}">
                         </div>
                         <div class="cart__item__content__settings__delete">
                         <p class="deleteItem">Supprimer</p>
                         </div>
                    </div>
                    </div>
               </article>
           
           `;

    });

    function getTotalQuantity(arrayOfKanap){

          let totalQuantity = 0;

          arrayOfKanap.forEach((kanap)=>{

               totalQuantity = Number(totalQuantity) + Number(kanap.quantity);

          })

          return  totalQuantity

    }


    function getTotalPrice(arrayOfKanap){

          let totalPrice = 0;

          arrayOfKanap.forEach((kanap)=>{

               totalPrice= Number(totalPrice) + Number(kanap.price * kanap.quantity); 

          })

          return totalPrice; 

    }

    document.querySelector("#cart__items").innerHTML = html;

    totalQuantityNode.textContent = getTotalQuantity(result);
    
    totalPriceNode.textContent = getTotalPrice(result);

    const deleteItems = document.querySelectorAll(".deleteItem");

    deleteItems.forEach((item, indexItem)=>{

          item.addEventListener("click", ()=>{

                  return deleteItem(item, result[indexItem]);

          })

    });

    const itemsQuantity = document.querySelectorAll(".itemQuantity");

    itemsQuantity.forEach((input, indexInput)=>{

          input.addEventListener("input", ()=>{

                 updateQuantity(input, result[indexInput])

          })

    })


    function deleteItem(itemToDelete, product){

          // On doit trouver l'index de l'element qu'on veut supprimer dans le tableau de produits issus du localStorage

          const deleteIndex = result.findIndex((element)=>{

               return element.color === product.color;

          });

          result.splice(deleteIndex, 1);

          let localStorageCard = JSON.parse(localStorage.getItem("products"));

          localStorageCard.splice(deleteIndex, 1);

          localStorage.setItem("products", JSON.stringify(localStorageCard));

          itemToDelete.closest(".cart__item").remove();

          totalQuantityNode.textContent = getTotalQuantity(result);
    
          totalPriceNode.textContent = getTotalPrice(result);
       

    }

    function  updateQuantity(input, product){

          const updateIndex = result.findIndex((element)=>{

               return element.color === product.color;

          });

          
          let kanapProduct = products[updateIndex];

          kanapProduct.quantity = input.value;

          products[updateIndex] = kanapProduct;

          
        
    }

});

