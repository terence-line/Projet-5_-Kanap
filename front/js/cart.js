const products = JSON.parse(localStorage.getItem("products"));

function getPrice(product){

     return new Promise((resolve)=>{

          fetch(`http://localhost:3000/api/products/${product.id}`).then((response)=>{

                return response.json();

          }).then((result)=>{

                product.altTxt = result.altTxt;
                
                product.imageUrl = result.imageUrl;

                product.price = result.price;

                return resolve(product);

          });

     });

}

Promise.all(products.map(getPrice)).then((result)=>{

     // Ici tu ecris ton code

});