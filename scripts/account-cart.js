// Function to fetch and display the cart data
function getCart() {
  fetch('https://fakestoreapi.com/carts/1')
    .then(apiCart => apiCart.json())
    .then(cartObject => {
      const cartContainer = document.querySelector('.js-update-cart');
      
      // Clear the container to avoid duplicate content
      cartContainer.innerHTML = '';

      // Create and append new cart HTML based on fetched data
      const cartElement = document.createElement('div');
      cartElement.classList.add('cart');

      cartElement.innerHTML = `
        <p class="cart-id">Order Id: ${cartObject.id}</p>
        <p class="cart-user-id">Placed by User Id: ${cartObject.userId}</p>
        <p class="cart-date">Date of order: ${cartObject.date}</p>
        <div class="cart-products">Details of order: ${JSON.stringify(cartObject.products)}</div>
      `;

      cartContainer.appendChild(cartElement);
    })
    .catch(error => {
      console.error("Error fetching cart data:", error);
    });
}

// Function to update the cart data and refresh the displayed cart
function updateCart() {
  // Send PATCH request to update the cart data
  fetch('https://fakestoreapi.com/carts/1', {
    method: "PATCH",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      userId: 3,
      date: '2019-12-10',
      products: [{ productId: 1, quantity: 900000 }]
    })
  })
    .then(res => res.json())
    .then(updatedCart => {
      console.log("Updated cart:", updatedCart); // Log the updated cart to confirm

      // Now update the UI with the updated data directly from the response
      const cartContainer = document.querySelector('.js-update-cart');
      cartContainer.innerHTML = '';

      // Create and append new cart HTML based on the updated data
      const cartElement = document.createElement('div');
      cartElement.classList.add('cart');

      cartElement.innerHTML = `
        <p class="cart-id">Order Id: ${updatedCart.id}</p>
        <p class="cart-user-id">Placed by User Id: ${updatedCart.userId}</p>
        <p class="cart-date">Date of order: ${updatedCart.date}</p>
        <div class="cart-products">Details of order: ${JSON.stringify(updatedCart.products)}</div>
      `;

      cartContainer.appendChild(cartElement);
    })
    .catch(error => {
      console.error("Error updating cart data:", error);
    });
}

// Initial fetch of the cart data when the page loads
getCart();
