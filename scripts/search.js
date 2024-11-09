function searchBar () {  
  const searchBar = document.querySelector('.js-search-bar'); // targets search bar input
 
  let searchResult = String(searchBar.value); //targets the text inside the search bar and saves value as string variable
 
  const inventoryCheck = document.getElementsByClassName("product-title"); // check DOM for all elements named product-title
 }
 
 
 /*
 
 
 
 // store name elements in array-like object
 
 
 // listen for user events
 searchInput.addEventListener("keyup", (event) => {
     const { value } = event.target;
     
     // get user search input converted to lowercase
     const searchQuery = value.toLowerCase();
     
     for (const nameElement of namesFromDOM) {
         // store name text and convert to lowercase
         let name = nameElement.textContent.toLowerCase();
         
         // compare current name to search input
         if (name.includes(searchQuery)) {
             // found name matching search, display it
             nameElement.style.display = "block";
         } else {
             // no match, don't display name
             nameElement.style.display = "none";
         }
     }
 });
 */