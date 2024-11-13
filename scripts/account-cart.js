// Function to fetch and display the cart data
function getCart() {
  fetch('https://fakestoreapi.com/carts/1')
    .then(apiCart => apiCart.json())
    .then(cartObject => {
      const cartContainer = document.querySelector('.js-current-cart');
      
      // Clear the container to avoid duplicate content
      cartContainer.innerHTML = '';

      // Create and append new cart HTML based on fetched data
      const cartElement = document.createElement('div');
      cartElement.classList.add('cart');

      // Create the list to display cart information
      const cartList = document.createElement('ul');
      cartList.classList.add('cart-list');

      cartList.innerHTML = `
        <h4>Current invoice:</h4>
        <ul>
        <li class="cart-id">Order Id: ${cartObject.id}</li>
        <li class="cart-user-id">Placed by User Id: ${cartObject.userId}</li>
        <li class="cart-date">Date of order: ${cartObject.date}</li>
        <li class="cart-products">Details of order:</li>
        
          ${cartObject.products.map(product => 
            `<li>Product ID: ${product.productId}, Quantity: ${product.quantity}</li>`
          ).join('')}
        </ul>
      `;

      cartElement.appendChild(cartList);
      cartContainer.appendChild(cartElement);
    });
}

// Function to update the cart data and refresh the displayed cart
function updateCart() {
  const dateNow = new Date();

  // Send PATCH request to update the existing cart data
  fetch('https://fakestoreapi.com/carts/1', {
    method: "PATCH",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      userId: 1,
      date: dateNow,
      products: [
        { productId: 1, quantity: 9 },
        { productId: 2, quantity: 3 },
        { productId: 3, quantity: 1 }
      ]
    })
  })
    .then(res => res.json())
    .then(updatedCart => {
      // Now update the UI with the updated data directly from the response
      const newCartContainer = document.querySelector('.js-current-cart');
      newCartContainer.innerHTML = '';

      // Create and append new cart HTML based on the updated data
      const newCartElement = document.createElement('div');
      newCartElement.classList.add('cart');

      newCartElement.innerHTML = `
        <h4>New invoice:</h4>
          <ul>
        <li class="cart-id">Order Id: ${updatedCart.id}</li>
        <li class="cart-user-id">Placed by User Id: ${updatedCart.userId}</li>
        <li class="cart-date">Date of order: ${updatedCart.date}</li>
          ${updatedCart.products.map(product => 
            `<li>Product ID: ${product.productId}, Quantity: ${product.quantity}</li>`
          ).join('')}
        </ul>
      `;

      newCartContainer.appendChild(newCartElement);
    })
}

// Initial fetch of the cart data when the page loads
getCart();
