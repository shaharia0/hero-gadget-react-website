
import { useLoaderData } from 'react-router-dom';
import ProductCard from './Cards/ProductCard';
import { addToDb } from '../Utilities/fakeDB';
import { CartContext, ProductContext } from '../App';
import { useContext } from 'react';
import { toast } from 'react-hot-toast';

const Shop = () => {
  const products = useContext(ProductContext);
  const [cart, setCart] = useContext(CartContext)
  // console.log(products);
// cart button handler 
  const handleAddToCart = product =>{
  let newCart = [];
  const exist = cart.find(existingProduct=>existingProduct.id === product.id)
  if(!exist){
   product.quantity = 1
      newCart = [...cart, product]
  }else{
    const rest = cart.filter(existingProduct=>existingProduct.id !== product.id) 
    exist.quantity = exist.quantity + 1;
    newCart = [...rest, exist]
  }
  toast.success('Product Added! 🛒', { autoClose: 500 })
  setCart(newCart)
  addToDb(product.id)
  }
  return (
    <div className='product-container'>
      {
        products.map(product=> <ProductCard 
          key={product.id} 
          product={product}
          handleAddToCart={handleAddToCart}
          ></ProductCard>)
      }
    </div>
  );
};

export default Shop;