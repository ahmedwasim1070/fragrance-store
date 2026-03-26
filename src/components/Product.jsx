// Imports
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import { CartContext } from '../context/CartContext';
import { productData } from '../data/Data';
import '../index.css';

function Product() {
  const { addToCart } = useContext(CartContext);

  const pDefault = (e) => {
    e.preventDefault();
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50 } }
  };

  return (
    <section className='w-full border border-solid border-gray-100 p-6 md:p-10 shadow-lg mt-16 mb-16 rounded-2xl bg-white'>
      <div className='w-full text-center mb-16'>
        <h2 className='text-4xl md:text-5xl font-bold text-gray-900 mb-4'>Our Collection</h2>
        <div className="w-24 h-1 bg-black mx-auto"></div>
      </div>
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-12 px-[2%]'
      >
        {productData.map((product, index) => (
          <Link to={`/product/${index}`} key={product.productId} className="group block">
            <motion.article 
              variants={itemVariants}
              className='flex flex-col h-full rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 bg-gray-50 border border-gray-100'
            >
              <div className='p-8 flex items-center justify-center relative overflow-hidden bg-white h-72'>
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                <img
                  loading='lazy'
                  className='max-w-full max-h-full object-contain drop-shadow-lg group-hover:scale-110 transition-transform duration-500 z-0'
                  alt={product.productName}
                  src={`/productimg/${product.productImg}`}
                />
              </div>
              
              <div className='flex flex-col flex-grow p-6 text-center'>
                <span className="text-xs uppercase tracking-widest text-gray-500 mb-2">{product.productType}</span>
                <h3 className='text-2xl font-bold mb-2'>{product.productName}</h3>
                
                <div className='flex items-center justify-center gap-3 mt-auto mb-6'>
                  {product.productSale > 0 && <span className='px-2 py-1 text-xs font-bold bg-red-600 text-white rounded'>SALE</span>}
                  <span className='text-xl font-bold text-gray-900'>
                    PKR {product.productPrice - product.productSale}
                  </span>
                </div>
                
                <button 
                  onClick={(e) => { 
                    pDefault(e);
                    addToCart(product.productId); 
                  }}
                  className='flex items-center justify-center gap-2 w-full py-3 font-semibold border-2 border-black rounded-full transition-colors duration-300 hover:bg-black hover:text-white group-hover:bg-black group-hover:text-white'
                >                
                  <ShoppingCart size={18} />
                  Add to Cart
                </button>
              </div>
            </motion.article>
          </Link>
        ))}
      </motion.div>
    </section>
  );
}

export default Product;
