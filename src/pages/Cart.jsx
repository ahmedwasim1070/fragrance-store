// Imports
import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, ArrowRight } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { CartContext } from '../context/CartContext';
import 'react-toastify/dist/ReactToastify.css';

function Cart() {
  const { cartData, removeCart } = useContext(CartContext);
  const [shSmNav, setShSmNav] = useState(false);
  
  const smNav = () => setShSmNav(!shSmNav);
  const smNavClick = (event) => event.stopPropagation();

  const pDefault = (e) => e.preventDefault();

  return (
    <main className='w-full min-h-screen overflow-x-hidden flex flex-col'>
      <Helmet>
        <title>Crush | Your Cart</title>
      </Helmet>

      <div className='w-full mx-auto fl:container flex-grow'>
        <Header smNav={smNav} />
        
        {cartData.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} 
            className='flex flex-col items-center justify-center mt-32 px-4'
          >
            <h2 className='text-3xl font-bold text-gray-800 mb-4'>Your cart is empty</h2>
            <p className='text-gray-500 mb-8'>Looks like you haven't added any fragrances yet.</p>
            <Link to="/products" className="flex items-center gap-2 bg-black text-white px-8 py-4 rounded-full font-semibold hover:bg-gray-800 transition-colors">
              <span>Start Shopping</span>
              <ArrowRight size={20} />
            </Link>
          </motion.div>
        ) : (
          <CartProduct cartData={cartData} removeCart={removeCart} pDefault={pDefault} />
        )}
        
        <AnimatePresence>
          {shSmNav && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={smNav} 
              className='fixed inset-0 top-[120px] z-50 flex justify-end backdrop-blur-sm'
            >
              <motion.div 
                initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'tween' }}
                onClick={smNavClick} 
                className='w-[60%] md:w-[40%] h-full bg-white shadow-2xl'
              >
                <ul className='w-full h-full text-black text-center text-[1.2rem] mt-8 flex flex-col items-center gap-4'>
                  <Link onClick={smNav} to='/'><li className='py-4 font-semibold'>Home</li></Link>
                  <Link onClick={smNav} to='/products'><li className='py-4 font-semibold'>Products</li></Link>
                  <Link onClick={smNav} to='/contact-us'><li className='py-4 font-semibold'>Contact Us</li></Link>
                  <Link onClick={smNav} to='/about-us'><li className='py-4 font-semibold'>About Us</li></Link>
                </ul>
              </motion.div>
            </motion.div> 
          )}
        </AnimatePresence>
      </div>
      
      <Footer />
    </main>
  );
}

function CartProduct({ cartData, removeCart, pDefault }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    show: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 60 } }
  };

  const total = cartData.reduce((acc, item) => acc + (item.productPrice - item.productSale), 0);

  return (
    <section className='w-full px-4 md:px-10 mt-16 mb-20'>
      <div className='w-full text-center mb-16'>
        <h2 className='text-4xl md:text-5xl font-bold text-gray-900 mb-4'>Your Cart</h2>
        <div className="w-16 h-1 bg-black mx-auto"></div>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-10">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className='flex-grow grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'
        >
          {cartData.map((item, index) => (
            <Link to={`/product/${item.productId}`} key={index} className="group block">
              <motion.article 
                variants={itemVariants}
                className='flex flex-col h-full bg-white border border-gray-100 shadow-md rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl'
              >
                <div className='p-6 flex items-center justify-center bg-gray-50 h-56'>
                  <img
                    loading='lazy'
                    className='max-w-full max-h-full object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-500'
                    src={`/productimg/${item.productImg}`}
                    alt={item.productName}
                  />
                </div>
                
                <div className='p-6 flex flex-col flex-grow text-center'>
                  <h3 className='text-xl font-bold mb-2'>{item.productName}</h3>
                  <div className='flex items-center justify-center gap-3 mt-auto mb-6'>
                    {item.productSale > 0 && <span className='px-2 py-1 text-xs font-bold bg-red-600 text-white rounded'>SALE</span>}
                    <span className='text-lg font-bold text-gray-900'>
                      PKR {item.productPrice - item.productSale}
                    </span>
                    {item.productSale > 0 && (
                      <span className='text-sm line-through text-gray-400'>
                        PKR {item.productPrice}
                      </span>
                    )}
                  </div>
                  
                  <button 
                    onClick={(e) => { 
                      pDefault(e);
                      removeCart(index);
                    }} 
                    className='flex items-center justify-center gap-2 w-full py-2.5 font-semibold text-red-600 border border-red-200 bg-red-50 rounded-lg transition-colors duration-300 hover:bg-red-600 hover:text-white'
                  >
                    <Trash2 size={16} />
                    <span>Remove</span>
                  </button>
                </div>
              </motion.article>
            </Link>
          ))}
        </motion.div>
        
        <div className="w-full lg:w-96">
          <div className="bg-gray-50 border border-gray-100 rounded-2xl p-8 sticky top-32">
            <h3 className="text-2xl font-bold mb-6">Order Summary</h3>
            <div className="flex justify-between mb-4 text-gray-600">
              <span>Subtotal ({cartData.length} items)</span>
              <span>PKR {total}</span>
            </div>
            <div className="flex justify-between mb-6 text-gray-600">
              <span>Shipping</span>
              <span className="text-green-600 font-medium">Free</span>
            </div>
            <div className="border-t border-gray-200 pt-6 mb-8 flex justify-between items-center">
              <span className="text-xl font-bold">Total</span>
              <span className="text-2xl font-bold">PKR {total}</span>
            </div>
            <button className="w-full bg-black text-white font-bold text-lg py-4 rounded-xl hover:bg-gray-800 transition-colors shadow-lg shadow-black/20">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Cart;
