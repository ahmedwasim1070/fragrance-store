// Imports
import React, { useEffect, useRef, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, Star, ShoppingBag, Truck, ShieldCheck, Check, Send, User, MapPin } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { productData, countryCity } from "../data/Data";
import { reviewData } from "../data/reviewData";
import { CartContext } from "../context/CartContext";

function ProductPage() {
  const { id } = useParams();
  const [shSmNav, setShSmNav] = useState(false);
  const [isForm, setIsForm] = useState(false);
  const { addToCart } = useContext(CartContext);
  const formRef = useRef(null);

  const product = productData[id];

  const smNav = () => setShSmNav(!shSmNav);
  const smNavClick = (event) => event.stopPropagation();

  const viewForm = () => {
    if (product.productStatus === "In-Stock") {
      setIsForm(true);
      setTimeout(() => formRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
    } else {
      toast.error("This product is currently out of stock!");
    }
  };

  if (!product) {
    return <div className="min-h-screen flex items-center justify-center">Product not found.</div>;
  }

  return (
    <main className="w-full min-h-screen flex flex-col bg-white">
      <Helmet>
        <title>Crush | {product.productName}</title>
      </Helmet>
      
      <div className="flex-grow">
        <Header smNav={smNav} />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
            
            {/* Image Gallery */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}
              className="lg:w-1/2 flex flex-col gap-6"
            >
              <div className={`w-full aspect-[4/5] rounded-3xl overflow-hidden flex items-center justify-center p-8 border border-gray-100 relative ${product.productBg}`}>
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent pointer-events-none" />
                <img 
                  src={`/productimg/${product.productImg}`} 
                  alt={product.productName} 
                  className="w-full h-full object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500 z-10" 
                />
              </div>
            </motion.div>

            {/* Product Info */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}
              className="lg:w-1/2 flex flex-col"
            >
              <span className="text-sm font-semibold tracking-widest text-gray-400 uppercase mb-2">{product.productType}</span>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{product.productName}</h1>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="flex text-yellow-400">
                  {[1,2,3,4,5].map(i => <Star key={i} size={20} fill="currentColor" />)}
                </div>
                <span className="text-gray-500 text-sm">{reviewData[id]?.length || 0} Reviews</span>
              </div>

              <div className="flex items-center gap-4 mb-8">
                <span className="text-3xl font-bold text-gray-900">PKR {product.productPrice - product.productSale}</span>
                {product.productSale > 0 && (
                  <span className="text-xl text-gray-400 line-through">PKR {product.productPrice}</span>
                )}
                {product.productStatus === "In-Stock" ? (
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1"><Check size={14}/> In Stock</span>
                ) : (
                  <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-semibold">Out of Stock</span>
                )}
              </div>

              <p className="text-gray-600 text-lg mb-10 leading-relaxed">
                {product.productTagline}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <button 
                  onClick={() => addToCart(product.productId)}
                  disabled={product.productStatus !== "In-Stock"}
                  className="flex-1 flex items-center justify-center gap-2 bg-white text-black border-2 border-black px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ShoppingBag size={20} />
                  Add to Cart
                </button>
                <button 
                  onClick={viewForm}
                  className="flex-1 flex items-center justify-center gap-2 bg-black text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-800 transition-colors"
                >
                  Buy Now Fast
                </button>
              </div>

              <div className="grid grid-cols-2 gap-6 py-8 border-y border-gray-100 mb-10">
                <div className="flex items-center gap-3">
                  <Truck className="text-gray-400" size={24} />
                  <div className="flex flex-col">
                    <span className="font-semibold text-gray-900">Free Delivery</span>
                    <span className="text-sm text-gray-500">2-4 Business Days</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <ShieldCheck className="text-gray-400" size={24} />
                  <div className="flex flex-col">
                    <span className="font-semibold text-gray-900">Authentic</span>
                    <span className="text-sm text-gray-500">100% Original</span>
                  </div>
                </div>
              </div>

              {/* Accordions */}
              <Accordion title="Description" content={<div dangerouslySetInnerHTML={{ __html: product.productDes }} />} defaultOpen />
              <Accordion title="Notes" content={
                <div className="space-y-4 text-gray-600 mt-4">
                  <p><strong className="text-black">Top Notes:</strong> {product.productTNotes}</p>
                  <p><strong className="text-black">Middle Notes:</strong> {product.productMNotes}</p>
                  <p><strong className="text-black">Base Notes:</strong> {product.productBNotes}</p>
                </div>
              } />
              <Accordion title="Accords" content={<div className="mt-4"><strong className="text-black block mb-2">Inspired By {product.productIns}</strong><p>{product.productAccords}</p></div>} />
              <Accordion title={`Reviews (${reviewData[id]?.length || 0})`} content={
                <div className="mt-4 space-y-6">
                  {reviewData[id]?.length > 0 ? reviewData[id].map((rev, i) => (
                    <div key={i} className="border-b border-gray-50 pb-4">
                      <div className="flex text-yellow-400 mb-1">
                        {[1,2,3,4,5].map(star => <Star key={star} size={14} fill={star <= rev.star ? "currentColor" : "none"} />)}
                      </div>
                      <p className="font-bold text-gray-900">{rev.name}</p>
                      <p className="text-gray-600 text-sm mt-1">{rev.message}</p>
                    </div>
                  )) : <p className="text-gray-500 italic">No reviews yet. Be the first to review!</p>}
                </div>
              } />

            </motion.div>
          </div>

          {/* Quick Buy Form Section */}
          {isForm && (
            <motion.div 
              initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}
              className="mt-24 pt-16 border-t border-gray-100"
              ref={formRef}
            >
              <QuickBuyForm product={product} />
            </motion.div>
          )}

        </div>

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

function Accordion({ title, content, defaultOpen = false }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-gray-100 py-4">
      <button onClick={() => setIsOpen(!isOpen)} className="flex w-full items-center justify-between text-left font-bold text-gray-900 hover:text-gray-600 transition-colors">
        <span className="text-lg">{title}</span>
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden text-gray-600 leading-relaxed whitespace-pre-line">
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function QuickBuyForm({ product }) {
  const [selectedProvince, setSelectedProvince] = useState("punjab");
  const [cityList, setCityList] = useState(countryCity["punjab"] || []);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  const price = product.productPrice - product.productSale;

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Mocking emailjs or backend call here since we simplified
    setTimeout(() => {
      toast.success("Order Placed Successfully! We will contact you soon.");
      setLoading(false);
      e.target.reset();
      setQuantity(1);
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto bg-gray-50 rounded-3xl p-8 md:p-12 shadow-lg border border-gray-100">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Quick Checkout</h2>
        <p className="text-gray-500">Enter your details below to place your order directly.</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-gray-700">Full Name</label>
            <input type="text" required className="w-full bg-white border border-gray-200 rounded-xl p-4 focus:ring-2 focus:ring-black outline-none" placeholder="John Doe" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-gray-700">Phone Number</label>
            <input type="tel" required pattern="[0-9]{11}" className="w-full bg-white border border-gray-200 rounded-xl p-4 focus:ring-2 focus:ring-black outline-none" placeholder="03XXXXXXXXX" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-gray-700">Province</label>
            <select 
              className="w-full bg-white border border-gray-200 rounded-xl p-4 focus:ring-2 focus:ring-black outline-none"
              onChange={(e) => {
                setSelectedProvince(e.target.value);
                setCityList(countryCity[e.target.value] || []);
              }}
            >
              <option value="punjab">Punjab</option>
              <option value="sindh">Sindh</option>
              <option value="kpk">Khyber Pakhtunkhwa (KPK)</option>
              <option value="balochistan">Balochistan</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-gray-700">City</label>
            <select required className="w-full bg-white border border-gray-200 rounded-xl p-4 focus:ring-2 focus:ring-black outline-none">
              {cityList.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-semibold text-gray-700">Detailed Address</label>
          <textarea required className="w-full h-32 bg-white border border-gray-200 rounded-xl p-4 focus:ring-2 focus:ring-black outline-none resize-none" placeholder="House/Apt, Street, Area..."></textarea>
        </div>

        <div className="flex items-center justify-between bg-white p-6 rounded-xl border border-gray-200 mt-4">
          <div className="flex items-center gap-4">
            <img src={`/productimg/${product.productImg}`} alt="Product" className="w-16 h-16 object-contain" />
            <div>
              <p className="font-bold text-gray-900">{product.productName}</p>
              <p className="text-gray-500 text-sm">PKR {price} x {quantity}</p>
            </div>
          </div>
          <div className="flex items-center bg-gray-100 rounded-full overflow-hidden">
            <button type="button" onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-2 hover:bg-gray-200 font-bold">-</button>
            <span className="px-4 font-semibold">{quantity}</span>
            <button type="button" onClick={() => setQuantity(Math.min(10, quantity + 1))} className="px-4 py-2 hover:bg-gray-200 font-bold">+</button>
          </div>
        </div>

        <div className="flex justify-between items-center text-xl font-bold px-2">
          <span>Total:</span>
          <span>PKR {price * quantity}</span>
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 bg-black text-white py-5 rounded-xl font-bold text-lg hover:bg-gray-800 transition-colors mt-4 disabled:opacity-70"
        >
          {loading ? "Processing..." : (
            <>
              <Send size={20} />
              Place Order
            </>
          )}
        </button>
      </form>
    </div>
  );
}

export default ProductPage;
