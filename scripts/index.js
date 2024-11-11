/* This page fetches the API and renders the products on the index.html page */

import { cart, addToCart } from '/scripts/cart.js'; // Import cart to avoid conflicts.

let products = JSON.parse(localStorage.getItem('products')) || []; // Check if products exist in localStorage.

if (products.length === 0) {
  // If no products in localStorage, fetch them from the API.
  fetch('https://fakestoreapi.com/products') // Fetch products from API.
    .then(apiData => apiData.json()) // Parse response to JSON.
    .then(productsArray => {
      // Store products in localStorage for future use.
      localStorage.setItem('products', JSON.stringify(productsArray));
      products = productsArray;
      console.log('Products loaded from API:', products);

      // Proceed with your code to render products on the page.
      renderProducts(products);
    })
    .catch(error => console.error('Error fetching products:', error));
} else {
  // If products are already in localStorage, use them directly.
  console.log('Products loaded from localStorage:', products);

  // Proceed with your code to render products on the page.
  renderProducts(products);
}

// Function to render the products
function renderProducts(productsArray) {
  const productsContainer = document.querySelector('.js-products-container'); // Targets product container/grid/parent.

  productsArray.forEach(productObject => {
    const productElement = document.createElement('div'); // Creates div for each product.
    productElement.classList.add('product'); // Add css class to divs.

    productElement.innerHTML = `
      <img src="${productObject.image}" alt="${productObject.title}">
      <p class="product-title">${productObject.title}</p>
      <p class="product-price">Price: £${(productObject.price).toFixed(2)}</p>
      <button class="js-add-to-cart-button add-to-cart-button" data-product-id="${productObject.id}">
        Add to Cart
      </button>
    `; // Add HTML content for each product.

    productsContainer.appendChild(productElement); // Renders HTML into parent.

    // Function to update cart quantity on the page.
    function updateCartQuantity() {
      let cartQuantity = 0;
      cart.forEach((cartItem) => {
        cartQuantity += cartItem.quantity;
        document.querySelector('.js-cart-quantity')
          .innerHTML = cartQuantity;
      });
    }

    // Add event listener to the add-to-cart button.
    const addButton = productElement.querySelector('.js-add-to-cart-button');
    addButton.addEventListener('click', () => {
      const productId = addButton.dataset.productId; // Gets product ID.
      addToCart(productId); // Runs function from cart.js to add to cart.
      localStorage.setItem('cart', JSON.stringify(cart)); // Save updated cart to localStorage.
      updateCartQuantity(); // Updates cart quantity on the page.
    });
  });
}
