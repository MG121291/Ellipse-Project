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


export function saveToStorage() {
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

waitForCartToLoad();
