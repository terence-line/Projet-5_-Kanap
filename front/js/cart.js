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

