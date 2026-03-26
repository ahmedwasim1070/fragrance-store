// Imports
import React from 'react';
import { FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import '../index.css';

function About() {
  return (
    <section className='w-full mt-20 mb-16 bg-white border border-gray-100 shadow-xl rounded-2xl overflow-hidden'>
      <div className='w-full py-16 flex flex-col items-center justify-center bg-gray-50 border-b border-gray-100'>
        <h1 className='text-4xl md:text-5xl font-bold text-gray-900'>Our Story</h1>
        <div className="w-16 h-1 bg-black mt-6"></div>
      </div>
      
      <div className='w-full max-w-4xl mx-auto px-6 py-12'>
        <div className='flex flex-col md:flex-row items-center justify-between gap-10 mb-12'>
          <div className='flex items-center gap-6'>
            <img 
              className='w-24 h-24 rounded-full border-4 border-gray-100 shadow-md object-cover' 
              alt='Crush Fragrances Logo' 
              src='/crush-icon.webp'
            />
            <h2 className='text-3xl font-semibold'>Crush Fragrances</h2>
          </div>
          
          <div className="flex items-center gap-4">
            <a href='https://www.facebook.com/' target="_blank" rel="noreferrer" className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-sm">
              <FaFacebook size={24} />
            </a>
            <a href='https://www.instagram.com/crush.fragrances/' target="_blank" rel="noreferrer" className="w-12 h-12 flex items-center justify-center rounded-full bg-pink-50 text-pink-600 hover:bg-pink-600 hover:text-white transition-all duration-300 shadow-sm">
              <FaInstagram size={24} />
            </a>
            <a href='https://wa.me/+923206469705' target="_blank" rel="noreferrer" className="w-12 h-12 flex items-center justify-center rounded-full bg-green-50 text-green-600 hover:bg-green-600 hover:text-white transition-all duration-300 shadow-sm">
              <FaWhatsapp size={24} />
            </a>
          </div>
        </div>
        
        <article className='prose prose-lg max-w-none text-gray-600 space-y-6'>
          <p className='text-2xl font-light text-black mb-8 leading-relaxed'>
            Do you believe in “Love at First Sight”? We don't either. But we do believe in <strong className="font-semibold">“Love at First Scent.”</strong>
          </p>
          <p>
            At Crush Fragrance, we believe scent is more than just a fragrance—it's a journey of self-expression. Founded by a collective of bold, innovative individuals with a passion for the art of perfume, Crush Fragrance set out to redefine what it means to wear a scent in the modern world.
          </p>
          <p>
            Every bottle we create is a blend of curiosity and creativity, designed to evoke emotion and inspire connection. Our e-commerce store offers a wide variety of perfumes, from bold and daring men's fragrances to captivating and elegant women's perfumes. Whether you're searching for your next signature fragrance or exploring something entirely new, we have the perfect scent for every moment.
          </p>
          <p>
            Rooted in sustainability and innovation, Crush Fragrance crafts its perfumes with the finest ingredients, ensuring each note tells a unique story—one that reflects the essence of who you are. And with the ease of online shopping, your signature Crush Fragrance is always just a click away.
          </p>
          <p className="font-semibold text-black text-xl mt-8">
            At Crush Fragrance, we don't just follow trends, we create them. Welcome to the future of fragrance.
          </p>
        </article>
      </div>
    </section>
  );
}

export default About;
