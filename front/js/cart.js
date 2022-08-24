// Récupération des produits contenus dans le local storage
const products = JSON.parse(localStorage.getItem("products"));

// Vérification du contenu du panier : si le panier est vide
if (products === null) {
    alert("Votre panier est  vide");
}

// Si le panier est plein, afficher les produits
else {

    /* La méthode Promise.resolve(valeur) renvoit un objet Promise qui est résolu avec la valeur donnée.
    Si cette valeur est une promesse, la promesse est renvoyée, si la valeur possède une méthode then, 
    la promesse renvoyée « suivra » cette méthode et prendra son état ; 
    sinon, la promesse renvoyée sera tenue avec la valeur.*/

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

    /* La méthode Promise.all()renvoit une promesse ( Promise) qui est résolue
    lorsque l'ensemble des promesses retenues dans l'itérable passé en argument ont été résolues.*/

    Promise.all(products.map(getPrice)).then((result) => {

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

        // Fonction pour claculer le total des articles contenus dans le panier
        function getTotalQuantity(arrayOfKanap){

            let totalQuantity = 0;

            arrayOfKanap.forEach((kanap)=>{

               totalQuantity = Number(totalQuantity) + Number(kanap.quantity);

            })

            return  totalQuantity;

        }

        // Fonction pour calculer le prix total du panier
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

        // Fonction pour supprimer un article du panier
        function deleteItem(itemToDelete, product){

            // On doit trouver l'index de l'élément qu'on veut supprimer dans le tableau de produits issus du localStorage.

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

        // Fonction pour modifier la quantité d'un produit
        function  updateQuantity(input, product){

            const updateIndex = result.findIndex((element)=>{

                return element.color === product.color;

            });

          
            let kanapProduct = products[updateIndex];

            kanapProduct.quantity = input.value;

            products[updateIndex] = kanapProduct;

          
        
        }

    });
}
