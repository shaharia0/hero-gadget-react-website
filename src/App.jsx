import Header from "./components/Header";
import React, { createContext, useState } from "react";
import Home from "./components/Home";
import Footer from "./components/Footer";
import { Outlet, useLoaderData } from "react-router-dom";
import Modal from "./components/Modal";

export const ProductContext = createContext([]);
export const CartContext = createContext([]);

const App = () => {
  let [isOpen, setIsOpen] = useState(false)
  const {cartArray, products} = useLoaderData()
  const [cart, setCart] = useState(cartArray)

  const cartAlert = sessionStorage.getItem('alert')
  if(cart.length > 0 && cartAlert !== 'true'){
     setIsOpen(true)
     sessionStorage.setItem('alert', true)
  }
   
  return (
    <ProductContext.Provider value={products}>
       <CartContext.Provider value={[cart, setCart]}>
       <Header></Header>
      <div className="min-h-[calc(100vh-137px)]">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}></Modal>
       </CartContext.Provider>
    </ProductContext.Provider>
  );
};

export default App;
