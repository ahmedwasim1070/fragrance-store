// Imports
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import About from '../components/About';

function AboutPage() {
  const [shSmNav, setShSmNav] = useState(false);
  
  const smNav = () => setShSmNav(!shSmNav);
  const smNavClick = (event) => event.stopPropagation();

  return (
    <main className='w-full min-h-screen overflow-x-hidden flex flex-col'>
      <Helmet>
        <title>Crush | About Us</title>
        <meta name="keywords" content="Crush Fragrance About Us, Crush Perfumes About Us" />
        <meta name="description" content="Love at First Scent > Check-out our Premium Fragrances Now" />
      </Helmet>

      <div className='w-full mx-auto fl:container flex-grow'>
        <Header smNav={smNav} />
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <About />
        </motion.div>
        
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

export default AboutPage;
