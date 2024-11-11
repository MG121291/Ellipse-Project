export let cart = JSON.parse(localStorage.getItem('cart')) || [];
// <------- exporting CART ARRAY and FUNCTIONS to keep files modular --------> //





// --------------------------- declare addToCart function ----------------------------------- //
export function addToCart(productId) {
  productId = Number(productId);  
  
  let sameItem = null; 

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
    saveToStorage();  // 
  }
}
// <------------- Converts product Id to a number ---------------> //
// <-------------  sameItem variable left undefined to track existing item in cart ---------------> //
// <------------- For loops through CART ARRAY to check if item exists in cart. Compares productIds ---------------> //
// <------------- If yes then we reassign the value of sameItem variable to be the same as the cartItem  ---------------> //
// <-------------  If the item is already in the CART ARRAY, increase quantity by 1---------------> //
// <------------- If the item is not found in the CART ARRAY, add it to the cart by way of pushing to the array---------------> //
// <------------- Save updated cart to local storage to be retrieved on checkout page---------------> //





// --------------------------- declare saveToStorage function ----------------------------------- //
export function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));  // Save cart array to localStorage as a string
}
// <------------- Saves cart data to localStorage to persist cart state across pages ---------------> //





// --------------------------- declare getFromStorage function ----------------------------------- //
export function getFromStorage() {
  return JSON.parse(localStorage.getItem('cart'));  // Retrieves cart from localStorage and parses it into JSON
}
// <------------- Retrieves and parses the cart data from localStorage ---------------> //





// --------------------------- declare goToCheckout function ----------------------------------- //
export function goToCheckout(event) {
  event.preventDefault();  // Prevent default form submission behavior
  localStorage.setItem('cart', JSON.stringify(cart));  // Save cart to localStorage
  window.location.href = 'checkout.html';  // Redirect to checkout page
}
// <------------- Saves the cart to localStorage and navigates to checkout page ---------------> //





// --------------------------- declare waitForCartToLoad function ----------------------------------- //
export function waitForCartToLoad() {
  document.addEventListener("DOMContentLoaded", () => {  // Wait for the DOM to load
    const cartIcon = document.getElementById("cartIcon");  // Get cart icon element
    if (cartIcon) {
      cartIcon.addEventListener("click", goToCheckout);  // Add event listener to cart icon to go to checkout page
    }
    // Add event listener for the submit order button
    const submitOrderButton = document.querySelector('.js-submit-order-button');  // Get submit order button
    if (submitOrderButton) {
      submitOrderButton.addEventListener('click', submitOrder);  // Attach submitOrder function to button
    }
  });
}
// <------------- Waits for the DOM to load, then attaches event listeners to cart icon and submit button ---------------> //





// --------------------------- declare removeFromCart function ----------------------------------- //
export function removeFromCart(productId) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];  // Retrieve and parse the cart data from localStorage

  console.log("Cart before removal:", cart);
  console.log("Removing product ID:", productId, "Type:", typeof productId);

  const updatedCart = cart.filter(item => {
    console.log("Comparing with cart item productId:", item.productId, "Type:", typeof item.productId);
    return item.productId !== parseInt(productId);  // Compare product IDs as integers to find and remove the item
  });

  console.log("Updated Cart after removal:", updatedCart);

  if (updatedCart.length === cart.length) {
    console.log(`No changes: Product ID ${productId} was not found.`);  // If no item was removed
  }

  localStorage.setItem('cart', JSON.stringify(updatedCart));  // Save the updated cart to localStorage

  return updatedCart;  // Return the updated cart after removal
}
// <------------- Removes a product from the cart by comparing productId and updates localStorage ---------------> //





// --------------------------- declare submitOrder function ----------------------------------- //
function submitOrder() {
  // Fetch the cart from localStorage
  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  // Check if the cart is empty
  if (cart.length === 0) {
    alert('Your cart is empty. Please add items to your cart before submitting the order.');
    return;
  }

  // Prepare the products in the cart to be posted to the API
  const productsInCart = cart.map(cartItem => ({
    productId: cartItem.productId,
    quantity: cartItem.quantity // Use the actual quantity from the cart
  }));

  // Prepare the order data
  const orderData = {
    userId: 8,  // Assuming a static user ID for the sake of this example
    date: new Date().toISOString().split('T')[0],  // Use the current date in ISO format
    products: productsInCart
  };

  // Post the order data to the API
  fetch('https://fakestoreapi.com/carts', {
    method: "POST",
    body: JSON.stringify(orderData),
    headers: {
      'Content-Type': 'application/json'  // Ensure the request body is in JSON format
    }
  })
    .then(response => response.json())
    .then(json => {
      console.log('Order submitted successfully:', json);
      alert('Order submitted successfully!');
      // Optionally clear the cart after successful submission
      localStorage.removeItem('cart');
    })
    .catch(error => {
      console.error('Error submitting order:', error);
      alert('There was an error submitting the order.');
    });
}
// <------------- Submits the cart as an order to the API, and clears the cart after success ---------------> //



waitForCartToLoad();  // Wait for cart to load and set up event listeners when the DOM is ready
