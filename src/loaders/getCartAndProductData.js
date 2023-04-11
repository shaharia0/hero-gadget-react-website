import { getStoredCart } from "../Utilities/fakeDB";

 export const productsAndCartData = async()=>{
  const prouductsData = await fetch('products.json')
  const products = await prouductsData.json();
  const savedCart = getStoredCart();
  let cartArray = [];
   
  for(let id in savedCart){
    const foundProuduct = products.find(product=> product.id === id)
    if(foundProuduct){
      const quantity = savedCart[id]
      foundProuduct.quantity = quantity;
      cartArray.push(foundProuduct)
    }
  }
  return {cartArray, products};
}
export default productsAndCartData