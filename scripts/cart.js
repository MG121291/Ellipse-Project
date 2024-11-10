export let cart = JSON.parse(localStorage.getItem('cart')) || [];

export function addToCart(productId) {
  productId = Number(productId);  // Convert to number

  let sameItem;

  cart.forEach((cartItem) => {
    if (cartItem.productId === productId) {
      sameItem = cartItem;
    }
  });

  if (sameItem) {
    sameItem.quantity += 1;
  } else {
    cart.push({
      productId: productId,  // Store productId as a number
      quantity: 1
    });
    saveToStorage();
  }
}

function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function goToCheckout(event) {
  event.preventDefault();
  localStorage.setItem('cart', JSON.stringify(cart));
  window.location.href = 'checkout.html';
}

export function waitForCartToLoad() {
  document.addEventListener("DOMContentLoaded", () => {
    const cartIcon = document.getElementById("cartIcon");
    if (cartIcon) {
      cartIcon.addEventListener("click", goToCheckout);
    }
    // Add event listener for the submit order button
    const submitOrderButton = document.querySelector('.js-submit-order-button');
    if (submitOrderButton) {
      submitOrderButton.addEventListener('click', submitOrder);  // Attach the event listener to the button
    }
  });
}

// Adjusted the removeFromCart function to handle string ID comparison
export function removeFromCart(productId) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  console.log("Cart before removal:", cart);
  console.log("Removing product ID:", productId, "Type:", typeof productId);

  const updatedCart = cart.filter(item => {
    console.log("Comparing with cart item productId:", item.productId, "Type:", typeof item.productId);
    return item.productId !== parseInt(productId);  // Compare as integers
  });

  console.log("Updated Cart after removal:", updatedCart);

  if (updatedCart.length === cart.length) {
    console.log(`No changes: Product ID ${productId} was not found.`);
  }

  localStorage.setItem('cart', JSON.stringify(updatedCart));

  return updatedCart;  // Return updated cart
}

// The submitOrder function for when the submit button is clicked
function submitOrder() {
  alert('Order Submitted!');  // Placeholder for the submit order functionality
}

waitForCartToLoad();
