// Imports
import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, ShoppingBag } from 'lucide-react';
import { CartContext } from '../context/CartContext';
import { productData } from '../data/Data';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Product from '../components/Product';
import Contact from '../components/Contact';
import About from '../components/About';
import '../index.css';

function Home({ idxPr, setIdxPr }) {
  const [shSmNav, setShSmNav] = useState(false);

  const smNav = () => setShSmNav(!shSmNav);
  const smNavClick = (event) => event.stopPropagation();

  return (
    <main className='w-full overflow-x-hidden'>
      <Helmet>
        <title>Crush | Fragrances</title>
        <meta name="keywords" content="Crush Fragrance, Crush Perfumes, Premium Fragrances" />
        <meta name="description" content="Love at First Scent > Check-out our Premium Fragrances Now" />
      </Helmet>

      <div className='w-full mx-auto fl:container'>
        <Header smNav={smNav} />
        
        <Hero idxPr={idxPr} setIdxPr={setIdxPr} />
        
        <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8 }}>
          <Product />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8 }}>
          <Contact />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8 }}>
          <About />
        </motion.div>

        <Footer />

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
    </main>
  );
}

function Hero({ idxPr, setIdxPr }) {
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const interval = setInterval(() => {
      setIdxPr((prev) => (prev >= productData.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(interval);
  }, [setIdxPr]);

  const changeIdx = (direction) => {
    if (direction === 'next') {
      setIdxPr((prev) => (prev >= productData.length - 1 ? 0 : prev + 1));
    } else {
      setIdxPr((prev) => (prev <= 0 ? productData.length - 1 : prev - 1));
    }
  };

  const currentProduct = productData[idxPr];

  return (
    <section className={`relative w-full h-[85vh] min-h-[600px] flex flex-col md:flex-row items-center justify-between text-white overflow-hidden ${currentProduct.productBg} transition-colors duration-700`}>
      
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent pointer-events-none" />

      <AnimatePresence mode='wait'>
        <motion.div 
          key={idxPr}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 50 }}
          transition={{ duration: 0.5 }}
          className='flex-1 flex flex-col justify-center px-6 md:px-20 z-10 pt-20 md:pt-0'
        >
          <span className="text-sm md:text-md uppercase tracking-widest mb-4 opacity-80">{currentProduct.productType}</span>
          <h1 className='text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight'>{currentProduct.productName}</h1>
          <p className='text-xl md:text-2xl font-light opacity-90 max-w-lg mb-8'>{currentProduct.productTagline}</p>
          
          <div className="flex items-center gap-6">
            <button 
              onClick={(e) => { e.preventDefault(); addToCart(currentProduct.productId); }}
              className='group flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-semibold hover:bg-black hover:text-white transition-all duration-300'
            >
              <ShoppingBag size={20} />
              <span>Add to Cart</span>
              <span className="font-bold ml-2">Rs {currentProduct.productPrice - currentProduct.productSale}</span>
            </button>
            <Link to={`/product/${currentProduct.productId}`} className="text-white underline hover:opacity-70 transition-opacity">
              View Details
            </Link>
          </div>
        </motion.div>
      </AnimatePresence>

      <AnimatePresence mode='wait'>
        <motion.div 
          key={`img-${idxPr}`}
          initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 0.8, rotate: 10 }}
          transition={{ duration: 0.6, type: "spring" }}
          className='flex-1 flex justify-center items-center z-10 relative mt-10 md:mt-0'
        >
          <img 
            className={`w-[250px] md:w-[400px] lg:w-[500px] drop-shadow-2xl`} 
            alt={currentProduct.productName} 
            src={`/productimg/${currentProduct.productImg}`} 
          />
        </motion.div>
      </AnimatePresence>

      <div className='absolute bottom-10 right-10 flex gap-4 z-20'>
        <button 
          onClick={() => changeIdx('prev')} 
          className='p-3 rounded-full bg-white/10 hover:bg-white/30 backdrop-blur-md transition-all text-white border border-white/20'
        >
          <ChevronLeft size={24} />
        </button>
        <button 
          onClick={() => changeIdx('next')} 
          className='p-3 rounded-full bg-white/10 hover:bg-white/30 backdrop-blur-md transition-all text-white border border-white/20'
        >
          <ChevronRight size={24} />
        </button>
      </div>

    </section>
  );
}

export default Home;