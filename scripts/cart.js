export const cart = []; // Initialize an empty array for the shopping cart

export function addToCart(productId) {
  let sameItem; // Variable to store the matching cart item, if found

  cart.forEach((cartItem) => { 
    if (cartItem.productId === productId) { // For loops through the cart and check if the product is already added
      sameItem = cartItem; 
    }
  });

  if (sameItem) { 
    sameItem.quantity += 1; // If the product is already in  cart, increase quantity by 1
  } else {
    cart.push({ 
      productId: productId, // If the product is not in cart add it with quantity 1
      quantity: 1
    });
  }
}

export function goToCheckout(event) {
  event.preventDefault(); // Prevent the default behavior (redirecting to a link)
  localStorage.setItem('cart', JSON.stringify(cart)); // Save the current cart to localStorage for later use
  window.location.href = 'checkout.html'; // Redirect the user to the checkout page
}

// Set up an event listener for the cart icon click event
export function waitForCartToLoad() {
  document.addEventListener("DOMContentLoaded", () => { // Wait for the page to load completely
    const cartIcon = document.getElementById("cartIcon"); // Get the cart icon element by its ID
    if (cartIcon) { // Check if the cart icon exists on the page
      cartIcon.addEventListener("click", goToCheckout); // Add a click event listener that goes to checkout page
    }
  });
}

waitForCartToLoad(); // Initialize the event listener once the page has loaded