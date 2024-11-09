fetch('https://fakestoreapi.com/products') 
// *fetch* method, tells browser to go to API and GETs the information

    .then(rawData => rawData.json()) // *then* method, processes response data. I named it rawData =>data.json() is shorthand function. converts data to json 

    .then(productsArray => {  // the converted data is stored as an Array of Objects with Property-Value pairs.
        const productsContainer = document.querySelector('.js-products-container'); // *querySelector* method searches DOM for html class . 

        productsArray.forEach(productObject => { 
            // *forEach* method is a for loop, cycling through each Object within the array. 
            const productElement = document.createElement('div'); 
            // part of the for loop, the function generates a <div> for each Object in the array.  Saved as variable.
            productElement.classList.add('product'); 
            // adds a CSS class named product to the new div

            productElement.innerHTML = `
                <img src="${productObject.image}">
                <p class="product-title">${productObject.title}</p>
                <p class="product-price">Price: £${productObject.price}</p>
                <button class="js-add-to-cart-button button-primary" data-product-id="${productObject.id}">
                    Add to Cart
                </button>
            `;
            // dot notation targets  productElement variable and its <div>
            // Writing html directly within multi-line string assigns  html elements inside productElement div 
            // The content for each new element is determined by the Property of the Object being called 
            // can also add additional elements that don't correspond to Object data, ie button

            productsContainer.appendChild(productElement);
            // *appendChild* method takes all the html assigned with child element= productElement and injects it into the parent=productsContainer. 
            // This parent needs to be pre-existing element with targetable class to work  "js-products-container"

            
            const addButton = productElement.querySelector('.js-add-to-cart-button');
            addButton.addEventListener('click', ( ) => {
             const productId = addButton.dataset.productId

             let sameItem;

             cart.forEach((item) => {
                if (item.productId === productId) {
                    sameItem = item;
            }});
                if(sameItem) {
                    sameItem.quantity += 1;
                } else {
                cart.push({
                    productId: productId,
                    quantity: 1
                    });
              }
                console.log(cart);
             });
             // the above is functionality for add to cart button. 
             // we identify all buttons in the DOM via the class
             // uses an event listener rather than a standard onclick event bc multiple buttons shared function, different property values
             //function targets addButton.dataset.productAttribute)
        });
    })
    .catch(error => console.error('Error fetching products:', error));



//<p class="product-description">${product.description}</p>


function getUsers() {
  fetch('https://fakestoreapi.com/users')
            .then(res=>res.json())
            .then(json=>console.log(json))
}