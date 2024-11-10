export let cart = []; // Initialize an empty array for the shopping cart

export function addToCart(productId) {
  // Ensure productId is a number
  productId = Number(productId); // Convert to number
  
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
  }

  // Optionally, save the updated cart to localStorage
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
  });
}

// Adjusting the removeFromCart function to handle string ID comparison
export function removeFromCart(productId) {
  // Fetch the cart from localStorage
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  // Log the cart to debug
  console.log("Cart before removal:", cart);

  // Log the types of productId and item.productId to debug
  console.log("Removing product ID:", productId, "Type:", typeof productId);

  const updatedCart = cart.filter(item => {
    console.log("Comparing with cart item productId:", item.productId, "Type:", typeof item.productId);
    return item.productId !== parseInt(productId);  // Compare as integers
  });

  // Log the updated cart
  console.log("Updated Cart after removal:", updatedCart);

  // If no change in cart, log that too
  if (updatedCart.length === cart.length) {
    console.log(`No changes: Product ID ${productId} was not found.`);
  }

  // Update the localStorage with the new cart
  localStorage.setItem('cart', JSON.stringify(updatedCart));

  return updatedCart;  // Returning updated cart
}






waitForCartToLoad();
