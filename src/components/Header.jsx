// Imports
import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Menu } from 'lucide-react';
import { CartContext } from '../context/CartContext';
import '../index.css';

function Header({ smNav }) {
  const { cartData } = useContext(CartContext);
  const [navResize, setNavResize] = useState(window.innerWidth >= 1150);

  const handleResize = () => {
    window.innerWidth >= 1150 ? setNavResize(true) : setNavResize(false);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <header className='w-full h-[120px] text-black flex'>
      <div className='flex items-center justify-center pb-3 2xl:pl-20 xl:pl-20 lg:pl-20 md:pl-14 sm:pl-14 esm:pl-4'>
        <Link aria-label='Logo' to='/'>
          <img className='2xl:w-[160px] xl:w-[161px] lg:w-[162px] md:w-[165px] sm:w-[250px] esm:w-[250px] h-[58px]' alt='logo' src='/crush-logo.webp' />
        </Link>
      </div>

      {navResize && (
        <nav className='w-[75%] flex justify-center items-center'>  
          <ul className='flex gap-20 font-[600]'>
            <Link to='/'><li className='underline-animation'>Home</li></Link>
            <Link to='/products'><li className='underline-animation'>Product</li></Link>
            <Link to='/contact-us'><li className='underline-animation'>Contact Us</li></Link>
            <Link to='/about-us'><li className='underline-animation'>About Us</li></Link>
          </ul>
        </nav>
      )}

      <div className={`flex justify-end items-center ${!navResize ? 'w-[90%]' : ''}`}>
        <div className='flex gap-5 mr-[3vw]'>
          <Link to='/cart'>
            <button className='border border-solid border-[rgba(0,0,0,0.5)] p-3 rounded-full transition-all duration-300 hover:bg-[rgba(0,0,0,0.2)] relative flex items-center justify-center'>
              {cartData?.length > 0 && (
                <span className='absolute text-sm left-[80%] top-[-10%] px-2.5 py-1 grow-animation text-white bg-red-500 rounded-full'>
                  {cartData.length}
                </span>
              )}
              <ShoppingCart size={24} color="#000" />
            </button>
          </Link>            
          
          {!navResize && (
            <button onClick={smNav} className='border border-black p-3 rounded-full transition-all duration-300 hover:bg-[rgba(255,255,255,0.3)] flex items-center justify-center'>
              <Menu size={24} color="#000" />
            </button>
          )}
        </div>
      </div>
    </header>  
  );
}

export default Header;
