export const cart = [ 
];

export function addToCart (productId) {
                
  let sameItem; 

  cart.forEach((cartItem) => {
     if (cartItem.productId === productId) {
         sameItem = cartItem; 
 }});
     if(sameItem) {
         sameItem.quantity += 1;
     } else {
     cart.push({
         productId: productId,
         quantity: 1
         }); 
   }
 }