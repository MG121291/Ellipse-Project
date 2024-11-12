import { addToCart, deleteFromCart, adjustCartAddOne, adjustCartMinusOne } from "./cart.js"; 



// Load the cart and products from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let products = JSON.parse(localStorage.getItem('products')) || [];


// If the cart is empty, display a "No items in your cart" message
if (cart.length === 0) {
  document.querySelector('.js-order-summary').innerHTML = '<p>Houston, we have a problem...the cargo hold is empty.</p>';
} else {
  updateCartDisplay();
  generatePaymentSummary();
}

// Function to update the cart display after an item is removed
function updateCartDisplay() {
  // Re-fetch the cart from localStorage after removal and re-render
  cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  let cartSummaryHTML = '';  // Initialize the variable to hold the HTML for the cart summary

  if (cart.length === 0) {
    document.querySelector('.js-order-summary').innerHTML = '<p>Houston, we have a problem...the cargo hold is empty.</p>';
  } else {
    const today = new Date();
    const deliveryDay = new Date(today.setDate(today.getDate() + 3));

    // Loop through each item in the cart and generate the HTML for each
    cart.forEach((cartItem) => {
      const matchingProduct = products.find(product => String(product.id) === String(cartItem.productId));

      if (matchingProduct) {
        cartSummaryHTML += `
          <div class="cart-item-container">
            <div class="delivery-date">Delivery date: ${deliveryDay.toDateString()}</div>
            <div class="cart-item-details-grid">
              <img class="product-image" src="${matchingProduct.image}" alt="${matchingProduct.title}">
              <div class="cart-item-details">
                <div class="product-name">${matchingProduct.title}</div>
                <div class="product-price">£${(matchingProduct.price).toFixed(2)}</div>
                <div class="product-quantity">
                  Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                  <button class="minus-1-quantity link-primary js-minus-1-button" data-product-id="${matchingProduct.id}">-</button>
                  <button class="add-1-quantity link-primary js-add-1-button" data-product-id="${matchingProduct.id}">+</button>
                  <p class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">Delete</p>
                </div>
              </div>
            </div>
          </div>
        `;
      }
    });

    // Insert the generated cart summary HTML into the page
    document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

    // Reattach event listeners for delete buttons after updating the HTML
    document.querySelectorAll('.js-delete-link').forEach((link) => {
      link.addEventListener('click', (event) => {
        const productId = event.target.dataset.productId;
        deleteFromCart(productId);  // Call deleteFromCart with the productId
        updateCartDisplay();  // Update the cart display after removal
        generatePaymentSummary();  // Update payment summary after cart change
      });
    });
    document.querySelectorAll('.js-minus-1-button').forEach((button) => {
      button.addEventListener('click', (event) => {
        const productId = event.target.dataset.productId;
        adjustCartMinusOne(productId);  
        updateCartDisplay();  // Update the cart display after removal
        generatePaymentSummary();  // Update payment summary after cart change
      });
    });
    document.querySelectorAll('.js-add-1-button').forEach((button) => {
      button.addEventListener('click', (event) => {
        const productId = event.target.dataset.productId;
        adjustCartAddOne(productId); 
        updateCartDisplay();  // Update the cart display after removal
        generatePaymentSummary();  // Update payment summary after cart change
      });
    });
  }
}

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

// Initial call to display cart and payment summary
updateCartDisplay();
generatePaymentSummary();
