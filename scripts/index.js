/*This page fetches the API and renders the products on the index.html page*/ 


import {cart, addToCart} from '/scripts/cart.js'; // Import cart to avoid conflicts.

fetch('https://fakestoreapi.com/products') // Fetch products from API.
    .then(apiData => apiData.json()) // Parse response to JSON.
    .then(productsArray => { 
        localStorage.setItem('products', JSON.stringify(productsArray)); 
        // Save copy of products to localStorage for cart transfer
        // Data is retrieved in checkout.js to display products in the cart.

        const productsContainer = document.querySelector('.js-products-container'); // Targets product container/grid/parent.
        productsArray.forEach(productObject => {  // Loop through products.
            const productElement = document.createElement('div'); // creates div for each
            productElement.classList.add('product'); // Add css class to divs

            productElement.innerHTML = `
                <img src="${productObject.image}">
                <p class="product-title">${productObject.title}</p>
                <p class="product-price">Price: £${(productObject.price).toFixed(2)}</p>
                <button class="js-add-to-cart-button add-to-cart-button" data-product-id="${productObject.id}">
                    Add to Cart
                </button>
            `; // Add HTML content for each product.

            productsContainer.appendChild(productElement); // renders HTML into parent. 

            function updateCartQuantity() {
                let cartQuantity = 0;
                cart.forEach((cartItem) => {
                    cartQuantity += cartItem.quantity;
                    document.querySelector('.js-cart-quantity')
                        .innerHTML = cartQuantity;
                });
            } // when ran, updates the cart quantity and displays it on the page

            const addButton = productElement.querySelector('.js-add-to-cart-button'); 
            addButton.addEventListener('click', () => { // When clicked does following:
                const productId = addButton.dataset.productId; // gets product ID
                addToCart(productId); // runs function from cart.js 
                localStorage.setItem('cart', JSON.stringify(cart)); 
                // Save cart to localStorage.
                // Data is used in checkout.js to display cart details and summary.
                updateCartQuantity(); // Runs function to update cart quantity + display
            });
        });
    })
    .catch(error => console.error('Error fetching products:', error));
