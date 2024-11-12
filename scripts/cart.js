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
      productId: productId,  
      quantity: 1
    });
    saveToStorage(); 
  }
}
// <------------- Converts product Id to a number ---------------> //
// <-------------  sameItem variable left undefined to track existing item in cart ---------------> //
// <------------- For loops through CART ARRAY to check if item exists in cart. Compares productIds ---------------> //
// <------------- If yes then we reassign the value of sameItem variable to be the same as the cartItem  ---------------> //
// <-------------  If the item is already in the CART ARRAY, increase quantity by 1---------------> //
// <---------- If the item is not found in the CART ARRAY, add it to the cart by way of pushing to the array ------------> //
// <------------- Save updated cart to local storage to be retrieved on checkout page---------------> //










// --------------------------- declare saveToStorage function ----------------------------------- //
export function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));  
}
// <------------- Saves cart data to localStorage as a string to hold cart content across pages ---------------> //




// --------------------------- declare getFromStorage function ----------------------------------- //
export function getFromStorage() {
  return JSON.parse(localStorage.getItem('cart'));  
}
// <----------- Retrieves cart from localStorage as a string and parses it into JSON ---------------> //





// --------------------------- declare goToCheckout function ----------------------------------- //
export function goToCheckout(event) {
  event.preventDefault();  
  saveToStorage();
  window.location.href = 'checkout.html'; 
}
// <------------ RED LIGHT- event.preventDefault();  halts immediate navigation to checkout.html --------------> //
// <------------ AMBER LIGHT - this lets us save our cart to local storage before following href ---------------> //
// <------------- GREEN LIGHT - window.location.href  tell us its ok to go to destination  ---------------> //








// --------------------------- declare waitForCartToLoad function ----------------------------------- //
export function waitForCartToLoad() {
  document.addEventListener("DOMContentLoaded", () => { 
    const cartIcon = document.getElementById("cartIcon");  
    if (cartIcon) {
      cartIcon.addEventListener('click', goToCheckout);  
    }
    
    const submitOrderButton = document.querySelector('.js-submit-order-button');  
    if (submitOrderButton) {
      submitOrderButton.addEventListener('click', submitOrder);  
    }
  });
}
// <------ Adds event listener to wait for  DOM to load because generating so much html on checkout page -------> //
// <--------- similar to queryselector we get "carticon""html by ID and assign as value to cartIcon variable------- ---> //
// <--------- then if if statement we check to see if cartIcon has loaded, if true then add event listener for click and run goToCheckout function. We run the exact same logic for the submitOrder button------- ---> //
//












// --------------------------- declare submitOrder function ----------------------------------- //
function submitOrder() {

  const cart = getFromStorage () || [];

  if (cart.length === 0) {
    alert(`It's dangerous to go alone! 

Come back with supplies.`);
    return;
  }
  const productsInCart = cart.map(cartItem => ({
    productId: cartItem.productId,
    quantity: cartItem.quantity 
  }));
  // Post the order data to the API
  fetch('https://fakestoreapi.com/carts', {
    method: "POST",
    body: JSON.stringify(
      {
        userId: 8, 
        date: new Date().toISOString(), //reformats date+time to YYYY-MM-DDT00:00:00
        products: productsInCart
      }
    ),
    headers: {
      'Content-Type': 'application/json' // send string data with a tag to tell API to parse to JSON
    }
  })
    .then(response => response.json())
    .then(json => {
      console.log('Order submitted successfully:', json);
      alert('Order submitted successfully!');
  
      localStorage.removeItem('cart');
    })
}
// <---------------- If the cart is empty then alert with pop up and do not run any code -----------------> //
// <----------- the .map() method makes a duplicate, more condensed version of the local cart. Containing only properties that the API can read. Think of you scanning your physcial basket through a self service checkout.  ---------------> 

// <------------- We the make POST request to API to create a new cart ---------------> //
// <--------- We get a response from the API documented for now in console logs, will update to order confirmation page ------------> //










// --------------------------- declare deleteFromCart function ----------------------------------- //
export function deleteFromCart(productId) {
  cart = getFromStorage() || [];  
  cart = cart.filter(item => item.productId !== Number(productId));  // Assign updatedCart back to cart
  saveToStorage();
}
// <------------- Removes a product from the cart by comparing productId ---------------> //
// <------- uses .filter method to make a new list of items that don’t match the productId to remove --------> //
// <------------ stores the new list (updatedCart) of items to local storage ---------> //









// --------------------------- declare adjustCartMinusOne function ----------------------------------- //
export function adjustCartMinusOne(productId) {
   cart = getFromStorage() || [];  
  const item = cart.find(item => item.productId === Number(productId));
  if (item && item.quantity > 1) {
    item.quantity -= 1;
    console.log('minus');
  }
 saveToStorage();
}
// <------------- .find () method goes through cart, compares products IDs---------------> //
// <------------- if Ids match check if quantity is greater than 1 then remove 1 quantity ---------------> //





// --------------------------- declare adjustCartMinusOne function ----------------------------------- //
export function adjustCartAddOne(productId) {
   cart = getFromStorage() || [];  
  const item = cart.find(item => item.productId === Number(productId));
  if (item && item.quantity >= 0) {
    item.quantity += 1;
    console.log('add');
  }

  localStorage.setItem('cart', JSON.stringify(cart));
}
// <------------- .find () method goes through cart, compares products IDs---------------> //
// <------------- if Ids match check if quantity is greater than or equal to 0, then add 1---------------> //




waitForCartToLoad();  // Wait for cart to load and set up event listeners when the DOM is ready
