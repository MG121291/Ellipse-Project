// Retrieve the cart from localStorage (or use an empty array if not found)
let cart = JSON.parse(localStorage.getItem('cart')) || []; 

// Retrieve the products from localStorage (or use an empty array if not found)
let products = JSON.parse(localStorage.getItem('products')) || [];

// If the cart is empty, display a "No items in your cart" message
if (cart.length === 0) {
  document.querySelector('.js-order-summary').innerHTML = '<p>No items in your cart.</p>';
} else {
  let cartSummaryHTML = ''; // Initialize the variable to hold the HTML for the cart summary

  // Loop through each item in the cart and generate the HTML for each
  cart.forEach((cartItem) => {
    const productId = cartItem.productId; // Get the product ID from the cart item

    // Find the product that matches the cart item based on the productId
    const matchingProduct = products.find(product => String(product.id) === String(productId));

    if (matchingProduct) {
      // If a matching product is found, append its details to the cart summary HTML
      cartSummaryHTML += `
      <div class="cart-item-container">
        <div class="delivery-date">
          Delivery date: Tuesday, June 21
        </div>
        <div class="cart-item-details-grid">
          <img class="product-image" src="${matchingProduct.image}" alt="${matchingProduct.title}">
          <div class="cart-item-details">
            <div class="product-name">${matchingProduct.title}</div>
            <div class="product-price">£${matchingProduct.price}</div>
            <div class="product-quantity">
              Quantity: <span class="quantity-label">${cartItem.quantity}</span>
            </div>
          </div>
        </div>
      </div>
      `;
    } else {
      // If no matching product is found, log a message for debugging
      console.log(`Product with ID ${productId} not found in products.`);
    }
  });

  // Insert the generated cart summary HTML into the page
  document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;
}
