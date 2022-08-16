fetch('http://localhost:3000/api/products')
    .then((response) => {
        return response.json();
    })
    .then((result) => {
        let html = "";
        const j = result.length;
        for (let i = 0; i < j; i++) {
            html += `

        <a href="./product.html?id=${result[i]?._id}">
            <article>
              <img src="${result[i]?.imageUrl}" alt="${result[i]?.altTxt}">
              <h3>${result[i]?.name}</h3>
              <p>${result[i]?.description}</p>
            </article>
          </a>`;
        }

        document.querySelector("#items").innerHTML = html;

    });


