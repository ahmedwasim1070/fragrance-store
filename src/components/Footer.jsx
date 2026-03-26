// Imports
import React from "react";
import { Copyright } from "lucide-react";

function Footer() {
  return (
    <footer className="w-full py-12 flex flex-col justify-center text-gray-600 items-center gap-y-4 border-t border-gray-100 mt-10">
      <div className="flex gap-3 text-lg items-center">
        <Copyright size={20} />
        <span>{new Date().getFullYear()} Crush Fragrances LTD. All rights reserved.</span>
      </div>
      <div className="flex gap-6 mt-4">
        <a href="#" className="hover:text-black transition-colors">Privacy Policy</a>
        <a href="#" className="hover:text-black transition-colors">Terms of Service</a>
        <a href="#" className="hover:text-black transition-colors">Shipping Info</a>
      </div>
    </footer>
  );
}

export default Footer;
