// Imports
import React, { createContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { productData } from '../data/Data';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const savedCartData = localStorage.getItem('cartData');
    if (savedCartData) {
      setCartData(JSON.parse(savedCartData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cartData', JSON.stringify(cartData));
  }, [cartData]);

  const addToCart = (productId) => {
    const itemToAdd = productData.find(p => p.productId === productId);
    if (!itemToAdd) return;

    const isRepeat = cartData.some(item => item.productId === itemToAdd.productId);
    if (!isRepeat) {
      setCartData([...cartData, itemToAdd]);
      toast.info(
        <>
          <p>{itemToAdd.productName} added to the Cart.{' '}</p>
          <Link className='cursor-pointer underline' to='/cart'>
            View Cart &gt; &gt;
          </Link>
        </>,
        {
          autoClose: 2000,
          hideProgressBar: true,
          pauseOnHover: false,
        }
      );
    } else {
      toast.error(
        <>
          <p>{itemToAdd.productName} is already in the Cart.{' '}</p>
          <Link className='cursor-pointer underline' to='/cart'>
            View Cart &gt; &gt;
          </Link>
        </>,
        {
          autoClose: 2000,
          hideProgressBar: true,
          pauseOnHover: false,
        }
      );
    }
  };

  const removeCart = (index) => {
    const itemToRemove = cartData[index];
    setCartData(cartData.filter((_, i) => i !== index));
    toast.info(
      <>
        <p>{itemToRemove?.productName} removed from the Cart.{' '}</p>
      </>,
      {
        autoClose: 2000,
        hideProgressBar: true,
        pauseOnHover: false,
      }
    );
  };

  return (
    <CartContext.Provider value={{ cartData, addToCart, removeCart }}>
      {children}
    </CartContext.Provider>
  );
};
