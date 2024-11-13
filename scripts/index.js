import { cart, addToCart, saveToStorage } from '/scripts/cart.js'; 
// <------- importing functions to keep files modular --------> //

// -------------------------on initialize---------------------------------------//
let products = JSON.parse(localStorage.getItem('products')) || []; 

if (products.length === 0) {
  fetch('https://cors-anywhere.herokuapp.com/https://fakestoreapi.com/products')
    .then(apiData => apiData.json()) 
    .then(productsArray => {
      localStorage.setItem('products', JSON.stringify(productsArray));
      products = productsArray;
    });
} 
  displayProductsFromAPI(products);

// <------------- check if profucts exist in local storage OR use empty array ---------------> //
// <----------- if products array is empty then fetch products from API -------------------> //
// <------ parse string response to JSON productsArray, assign to products variable ----> //
// <----------run function to display the contents of products on screen ----------------> //






// <--------------------------- declare displayProducts function -----------------------------------> //
function displayProductsFromAPI() {
  const productsContainer = document.querySelector('.js-products-container');
  
  products.forEach(productObject => {
    const productElement = document.createElement('div');
    productElement.classList.add('product');
    productElement.innerHTML = `
      <img src="${productObject.image}" alt="${productObject.title}">
      <p class="product-title">${productObject.title}</p>
      <p class="product-price">Price: £${(productObject.price).toFixed(2)}</p>
      <button class="js-add-to-cart-button add-to-cart-button" data-product-id="${productObject.id}">
        Add to Cart
      </button>
    `;
    productsContainer.appendChild(productElement);

    const addButton = productElement.querySelector('.js-add-to-cart-button');
    addButtonListener(addButton, productObject.id);
  });
}



// <--------------------- Target js-products-container HTML element and assign to variable  ---------------------> //
// <---------- For Loop through PRODUCTS array. Creates a div for each object. Assigned to variable ----------> //
// <------------- Div variabe targeted in DOM to generates additional html with Object properties ------------> //
// <-------------- Div variable and its content pushed to the parent Container via .appendChild --------------> //
// <------------------- Target generated js-add-to-cart-button save as addButton variable  -------------------> //
// <------- Runs the addButtonListener function, targets individual AddButtons via productObject.id (addedProductId) -------> //








// --------------------------- declare AddButtonListener function -----------------------------------//
function addButtonListener(button, addedProductId) {
  button.addEventListener('click', () => {
    addToCart(addedProductId); // imported from cart.js
    saveToStorage(); // imported from cart.js
    updateCartQuantity(); // Update cart quantity on the page
  });
}
// <------ uses button parameter, targets <button> elements in the DOM directly ------> //
// <----------- uses productID parameter, passed in from addToCart function ----------> //
// <------- target buttons on DOM, adds event listener for a click on a button --------> //
// <------ when button clicked runs addToCart + parameter, SaveToStorage and updateCartQuantity functions ------> //









// --------------------------- declare update cart function -----------------------------------//
function updateCartQuantity() {
  let cartQuantity = 0;
  cart.forEach((cartItem) => { //cart array imported from cart.js
    cartQuantity += cartItem.quantity;
    document.querySelector('.js-cart-quantity')
      .innerHTML = cartQuantity;
  });
}

// <------- sets default cart quantity as 0 --------> //
// <------- For loops through the items in cart array --------> //
// <------- For loops through each item in cart array and checks how many of that item there is--------> //
// <--------- Adds the total number of each item together and adds to cartQantity variable -----------> //
// <------- targets DOM for js-cart-quantity and updates content to dispay total cartQuantity--------> //



