let myId = new URL(document.location.href).searchParams.get("id")


// Creation des variables. 
// Elles sont déclarées en dehors pour pouvoir les appeler plus tard si besoin.

// let elementImage = document.querySelector(".item__img");
let elementName = document.querySelector("#title");
let elementPrice = document.querySelector("#price");
let elementDescription = document.querySelector("#description");
let elementColors = document.querySelector("#colors");

afficher_produit();

// création nouvelle adresse fetch + identifiant produit
function afficher_produit() {
    fetch('http://localhost:3000/api/products/' + myId)
        .then((response) => {
            return response.json();
        })
        .then((resultApi) => {
            // Affichage du produit dans la console.
            console.table(resultApi);

            let elementImage = document.querySelector(".item__img");

            // insertion image
            const productImg = document.createElement("img");
            productImg.setAttribute("src", resultApi.imageUrl);
            productImg.setAttribute("alt", resultApi.altTxt);
            elementImage.appendChild(productImg);

            // insertion nom
            elementName.innerHTML = resultApi.name;

            // insertion prix            
            elementPrice.innerHTML = resultApi.price;


            // insertion decxription           
            elementDescription.innerHTML = resultApi.description;

            // insertion couleurs
            let productColors = resultApi.colors;
            let monHtml = "";
            for (let i = 0; i < productColors.length; i++) {
                monHtml += '<option value = "' + productColors[i] + '">' + productColors[i] + "</option>";
            }

            document.querySelector("select").innerHTML += monHtml;

            ajouter_panier();

        })

        .catch((err) => {
            console.log(err);
        })
}

// .......  Local storage .............

// localStorage.getItem("clé") => La fonction récupère la valeur d'une clé.
// localStorage.setItem("clé", "valeur") => La fonction enregistre une valeur dans le storage.
// JSON.parse() => La méthode JSON.parse() analyse une chaîne de caractères JSON et construit la valeur JavaScript ou l'objet décrit par cette chaîne.
// parseInt() => La fonction parseInt() analyse une chaîne de caractère fournie en argument et renvoie un entier exprimé dans une base donnée.

function ajouter_panier() {

    // Création  d'un tableau de données (product)
    addToCart.onclick = () => {

        const tableauLocalStorage = JSON.parse(localStorage.getItem("products"));

        const myColorValue = document.querySelector("#colors").value;

        const myQuantityValue = document.querySelector("#quantity").value;

        let product = {
            id: myId,
            color: myColorValue,
            quantity: myQuantityValue,

        }
        
        // Si aucune couleur et aucune quantité ne sont saisies, afficher un message d'alert.
        if (Number(myQuantityValue) <= 0 || myColorValue === "") {

            return alert("Veuillez sélectionner une couleur et une quantité.");
        }

        // Si le local storage est vide, créer un tableau vide et mettre un produit dans le local storage.
        if (tableauLocalStorage === null) {

            const kanapsInfos = [];

            kanapsInfos.push(product);
        
            return localStorage.setItem("products", JSON.stringify(kanapsInfos));
            
        }
        
        /* La methode array.some() renvoit un booléen true/false, si l'assertion entrée est vraie ou fausse,
           on va voir si le produit choisi par l'utilisateur est deja dans le localStorage ou pas.*/
        
        const isInsideLocalStorage = tableauLocalStorage.some((kanap) => {

            return kanap.id === myId && kanap.color === myColorValue;

        });

        // Si le produit ne se trouve dans le local storage, je le rajoute.

        if (isInsideLocalStorage === false) {

            tableauLocalStorage.push(product);

            return localStorage.setItem("products", JSON.stringify(tableauLocalStorage));

        }

        // La méthode map() crée un nouveau tableau avec les résultats de l'appel d'une fonction fournie sur chaque élément du tableau appelant.
        // Si le produit est identique, j'additionne les quantités.
        const updateTableauLocalStorage = tableauLocalStorage.map((kanap) => {

            if (kanap.color === myColorValue) {

                kanap.quantity = Number(kanap.quantity) + Number(myQuantityValue);

            }

            return kanap;
            
   
        });

        return localStorage.setItem("products", JSON.stringify(updateTableauLocalStorage));
        
    }
    
}
    
       
       
        
    
