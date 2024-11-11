import { removeFromCart } from "./cart.js";

// Load the cart and products from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let products = JSON.parse(localStorage.getItem('products')) || [];

// Log the cart to verify it's correctly loaded
console.log("Cart from localStorage:", cart);
console.log("Products from localStorage:", products);

// If the cart is empty, display a "No items in your cart" message
if (cart.length === 0) {
  document.querySelector('.js-order-summary').innerHTML = '<p>Houston, we have a problem...the cargo hold is empty.</p>';
} else {
  let cartSummaryHTML = ''; // Initialize the variable to hold the HTML for the cart summary

  // Loop through each item in the cart and generate the HTML for each
  cart.forEach((cartItem) => {
    const productId = cartItem.productId;
    const matchingProduct = products.find(product => String(product.id) === String(productId));

    if (matchingProduct) {
      // If a matching product is found, append its details to the cart summary HTML
      cartSummaryHTML += `
        <div class="cart-item-container">
          <div class="delivery-date">Delivery date: Tuesday, June 21</div>
          <div class="cart-item-details-grid">
            <img class="product-image" src="${matchingProduct.image}" alt="${matchingProduct.title}">
            <div class="cart-item-details">
              <div class="product-name">${matchingProduct.title}</div>
              <div class="product-price">£${(matchingProduct.price).toFixed(2)}</div>
              <div class="product-quantity">
                Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                <span class="update-quantity-link link-primary">Update</span>
                <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">Delete</span>
              </div>
            </div>
          </div>
        </div>
      `;
    } else {
      console.log(`Product with ID ${productId} not found in products array.`); // Debugging when no product matches
    }
  });

  // Insert the generated cart summary HTML into the page
  document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

  // Function to generate the payment summary
function generatePaymentSummary() {
  // Calculate the total quantity of items in the cart
  const totalQuantity = cart.reduce((total, cartItem) => total + cartItem.quantity, 0);

  const totalAmount = cart.reduce((total, cartItem) => {
    const matchingProduct = products.find(product => String(product.id) === String(cartItem.productId));
    return matchingProduct ? total + matchingProduct.price * cartItem.quantity : total;
  }, 0);

  const paymentSummaryHTML = `
    <div class="payment-summary-title">
      Order Summary
    </div>
    <div class="payment-summary-row">
      <div>Items (${totalQuantity}):</div>
      <div class="payment-summary-money">£${totalAmount.toFixed(2)}</div>
    </div>
    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money">£${totalAmount.toFixed(2)}</div>
    </div>
      <button class="submit-order-button button-primary js-submit-order-button">
      Submit order
    </button>
  
  `;
  
  document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;
}


  generatePaymentSummary();

  // Reattach event listeners for delete buttons
  document.querySelectorAll('.js-delete-link').forEach((link) => {
    link.addEventListener('click', (event) => {
      const productIdLink = event.target.dataset.productId;
      removeFromCart(productIdLink);  // Call removeFromCart with the productIdLink
      updateCartDisplay();  // Update the cart display after removal
    });
  });
}

// Function to update the cart display after an item is removed
function updateCartDisplay() {
  // Re-fetch the cart from localStorage after removal and re-render
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  console.log("Updated cart after deletion:", cart);  // Log the updated cart for debugging

  // Re-render the cart summary
  if (cart.length === 0) {
    document.querySelector('.js-order-summary').innerHTML = '<p>Houston, we have a problem...the cargo hold is empty.</p>';
  } else {
    let cartSummaryHTML = '';
    cart.forEach((cartItem) => {
      const productId = cartItem.productId;
      const matchingProduct = products.find(product => String(product.id) === String(cartItem.productId));
      if (matchingProduct) {
        cartSummaryHTML += `
          <div class="cart-item-container">
            <div class="delivery-date">Delivery date: Tuesday, June 21</div>
            <div class="cart-item-details-grid">
              <img class="product-image" src="${matchingProduct.image}" alt="${matchingProduct.title}">
              <div class="cart-item-details">
                <div class="product-name">${matchingProduct.title}</div>
                <div class="product-price">£${(matchingProduct.price).toFixed(2)}</div>
                <div class="product-quantity">
                  Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                  <span class="update-quantity-link link-primary">Update</span>
                  <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">Delete</span>
                </div>
              </div>
            </div>
          </div>
        `;
      }
    });
    document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

    // Reattach event listeners for delete buttons after updating the HTML
    document.querySelectorAll('.js-delete-link').forEach((link) => {
      const productId = link.dataset.productId;
      console.log("Attach delete listener for Product ID:", productId, "Type:", typeof productId);

      link.addEventListener('click', (event) => {
        const productIdLink = event.target.dataset.productId;
        console.log("Clicked Delete on Product ID:", productIdLink, "Type:", typeof productIdLink);  // Log the type
        removeFromCart(productIdLink);  // Pass the productId to removeFromCart
        updateCartDisplay();  // Update the cart display after removal
        generatePaymentSummary();  // Update payment summary after cart change
      });
    });
  }
}