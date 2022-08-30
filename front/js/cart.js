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

            // Mise à jour de la quantité et du prix après suppression d'un produit
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

            result.splice(updateIndex, 0);

            let localStorageCard = JSON.parse(localStorage.getItem("products"));

            localStorageCard.splice(updateIndex, 0);

            localStorage.setItem("products", JSON.stringify(localStorageCard));

            input.closest(".cart__item");

            // Mise à jour de la quantité et du prix après changement de quantité
            totalQuantityNode.textContent = getTotalQuantity(result);
           // console.log(getTotalQuantity(result));

            totalPriceNode.textContent = getTotalPrice(result); 
           // console.log(getTotalPrice(result));
            
        }
        
    });
}



// ************************* Formulaire ********************** 

// Création des variables qui vont contenir la saisie de l'utilisateur
let valueFirstName;
let valueLastName;
let valueAddress;
let valueCity;
let valueEmail;


// Ecoute de l'input du prénom avec une fonction et des conditions
firstName.addEventListener("input", function (e) {
    valueFirstName;
    if(e.target.value.length == 0) {
        firstNameErrorMsg.innerHTML = "";
        valueFirstName = null;
    }
    // Test 1 Message d'erreur
    else if(e.target.value.length < 2 || e.target.value.length > 50) {
        firstNameErrorMsg.innerHTML = "Le prénom doit contenir entre 2 et 50 caractères.";
        valueFirstName = null;
    }
    if(e.target.value.match(/^[a-z A-ZçéêèàîïëÉÈÊË-]{2,50}$/)) {
        firstNameErrorMsg.innerHTML = "";
        valueFirstName = e.target.value;    
    }
     // Test 2 message d'erreur
    if (
        !e.target.value.match(/^[a-z A-ZçéêèàîïëÉÈÊË-]{2,50}$/) &&
        e.target.value.length > 2 &&
        e.target.value.length < 50
    ) {
        firstNameErrorMsg.innerHTML = "Le prénom ne peut contenir ni caractère spécial ni chiffre.";
        valueFirstName = null;
    }    
});

// Ecoute de l'input du nom avec une fonction et des conditions
lastName.addEventListener("input", function (e) {
    valueLastName;
    if (e.target.value.length == 0) {
        lastNameErrorMsg.innerHTML = "";
        valueLastName = null;
    }
    // Test 1 Message d'erreur
    else if (e.target.value.length < 2 || e.target.value.length > 50) {
        lastNameErrorMsg.innerHTML = "Le nom doit contenir entre 2 et 50 caractères.";
        valueLasttName = null;
    }
    if (e.target.value.match(/^[a-z A-ZçéêèàîïëÉÈÊË-]{2,50}$/)) {
        lastNameErrorMsg.innerHTML = "";
        valueLastName = e.target.value;
    }
    // Test 2 message d'erreur
    if (
        !e.target.value.match(/^[a-z A-ZçéêèàîïëÉÈÊË-]{2,50}$/) &&
        e.target.value.length > 2 &&
        e.target.value.length < 50
    ) {
        lastNameErrorMsg.innerHTML = "Le nom ne peut contenir ni caractère spécial ni chiffre.";
        valueLastName = null;
    }
});

// Ecoute de l'input de l'adresse avec une fonction et des conditions
address.addEventListener("input", function (e) {
    valueAddress;
    if (e.target.value.length == 0) {
        addressErrorMsg.innerHTML = "";
        valueAddress = null;
    }
    // Test 1 Message d'erreur
    else if (e.target.value.length < 2 || e.target.value.length > 100) {
        addressErrorMsg.innerHTML = "L'adresse doit contenir entre 2 et 100 caractères.";
        valueAddress = null;
    }

    if (e.target.value.match(/^[a-z A-Z 0-9,çéêèàîïëÉÈÊË-]{2,100}$/)) {
        addressErrorMsg.innerHTML = "";
        valueAddress = e.target.value;
    }
    // Test 2 message d'erreur
    if (
        !e.target.value.match(/^[a-z A-Z 0-9,çéêèàîïëÉÈÊË-]{2,100}$/) &&
        e.target.value.length > 2 &&
        e.target.value.length < 100
    ) {
        addressErrorMsg.innerHTML = "L'adresse ne peut contenir de caractère spécial.";
        valueAddress = null;
    }
});

// Ecoute de l'input de la ville avec une fonction et des conditions
city.addEventListener("input", function (e) {
    valueCity;
    if (e.target.value.length == 0) {
        cityErrorMsg.innerHTML = "";
        valueCity = null;
    }
    // Test 1 Message d'erreur
    else if (e.target.value.length < 2 || e.target.value.length > 50) {
        cityErrorMsg.innerHTML = "La ville doit contenir entre 2 et 50 caractères.";
        valueCity = null;
    }

    if (e.target.value.match(/^[a-z A-ZçéêèàîïëÉÈÊË-]{2,50}$/)) {
        cityErrorMsg.innerHTML = "";
        valueCity = e.target.value;
    }
    // Test 2 message d'erreur
    if (
        !e.target.value.match(/^[a-z A-ZçéêèàîïëÉÈÊË-]{2,50}$/) &&
        e.target.value.length > 2 &&
        e.target.value.length < 50
    ) {
        cityErrorMsg.innerHTML = "La ville ne peut contenir ni caractère spécial ni chiffre.";
        valueLastName = null;
    }
});

// Ecoute de l'input de l'email avec une fonction et des conditions
email.addEventListener("input", function (e) {
    if (e.target.value.length == 0) {
        emailErrorMsg.innerHTML = "";
        valueEmail = null;
    }
    // Test message d'erreur
    else if (e.target.value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
        emailErrorMsg.innerHTML = "";
        valueEmail = e.target.value;
    }
    if (
        !e.target.value.match(/^[\w-\.]+@([\w-]+\.)[\w-]{2,4}$/) && 
        !e.target.value.length == 0
        ) {
        emailErrorMsg.innerHTML = "Email non valide, ex : toto@yahoo.com";
        valueEmail = null;
    }     
});


// Ecoute du submit du formulaire

// Déclaration de variables
const form = document.querySelector(".cart__order__form");
const order = document.getElementById("order");
let orderId = products;
let orderProducts = JSON.parse(localStorage.getItem("products"));
let reponseServeur;
let contact;

// Fonction pour écouter l'input submit du formulaire
function inputSubmit() {
    
    form.addEventListener("submit", (e) => {
   
        // On stoppe la propagation de l'envoi du formulaire
        e.preventDefault();

        // Récupération de l'id des inputs du formulaire que l'on va stocker dans des constantes
        const firstName = document.getElementById("firstName");
        const lastName = document.getElementById("lastName");
        const address = document.getElementById("address");
        const city = document.getElementById("city");
        const email = document.getElementById("email");

        // On stocke la commande et on récupère les produits du local storage
        let allProducts = [];

        // Création d'une variable contenant l'objet contact et products
        const data = {
            contact: {
                firstName: valueFirstName,
                lastName: valueLastName,
                address: valueAddress,
                city: valueCity,
                email: valueEmail,
            },
            products: allProducts,
        }
        //console.log(data);

        // Vérification des valeurs
        if (valueFirstName && valueLastName && valueAddress && valueCity && valueEmail) {
            
            // On stocke les produits du local storage
            const orderId = JSON.parse(localStorage.getItem("products"));
            //console.log(orderId);

            for (let i = 0; i < products.length; i++) {
                allProducts.push(products[i].id);
                //console.log(allProducts);
            }; 
           
            // Si tous les champs du formulaire sont remplis, envoyez la commande
            inputSubmit();


            fetch('http://localhost:3000/api/products/order', {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data),
                })
                .then((response) => {
                    return response.json();
                })
                .then((promise) => {
                    let reponseServeur = promise;
                    console.log(reponseServeur);
                })

                const dataOrderId = {
                    contact: reponseServeur.contact,
                    order: reponseServeur.orderId
                };
                

                if (orderProducts == null) {
                    orderProducts = [];
                    orderProducts.push(dataOrderId);
                    localStorage.setItem("products", JSON.stringify(data));
                }
                else if (orderProducts != null) {
                    orderProducts.push(orderProducts);
                    localStorage.setItem("products", JSON.stringify(orderProducts));
                }

                // Suppression du panier après envoie de la commande
                localStorage.removeItem("products");

                // Redirection vers la page confirmation avec un orderId.
                document.location.href = `./confirmation.html?orderId=${data}`;
            }
        
        });
                /*else {
                    alert("veuillez remplir tous les champs du formulaire.");
                }*/
            
}
inputSubmit(); 
    

















   
   
    

    



   
  


