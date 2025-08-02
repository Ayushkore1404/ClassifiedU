import { useState } from "react";
import { Link } from "wouter";
import { GraduationCap } from "lucide-react";
import ContactModal from "@/components/contact-modal";

export default function Footer() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsContactModalOpen(true);
  };

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <GraduationCap className="text-white" size={20} />
              </div>
              <span className="text-2xl font-bold">ClassifiedU</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              The premier marketplace for college students to buy, sell, rent academic materials and find roommates within their university community.
            </p>
            <div className="flex space-x-4">
              <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center cursor-pointer hover:bg-primary transition">
                <span className="text-sm">f</span>
              </div>
              <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center cursor-pointer hover:bg-primary transition">
                <span className="text-sm">t</span>
              </div>
              <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center cursor-pointer hover:bg-primary transition">
                <span className="text-sm">i</span>
              </div>
              <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center cursor-pointer hover:bg-primary transition">
                <span className="text-sm">in</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Marketplace</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/browse" className="hover:text-white">Browse Items</Link></li>
              <li><Link href="/sell" className="hover:text-white">Sell Items</Link></li>
              <li><Link href="/browse?category=textbooks" className="hover:text-white">Textbooks</Link></li>
              <li><Link href="/browse?category=electronics" className="hover:text-white">Electronics</Link></li>
              <li><Link href="/browse?category=notes" className="hover:text-white">Study Notes</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Community</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/roommates" className="hover:text-white">Find Roommates</Link></li>
              <li><a href="#" className="hover:text-white">Safety Tips</a></li>
              <li><a href="#" className="hover:text-white">Student Guide</a></li>
              <li><a href="#" className="hover:text-white">Help Center</a></li>
              <li><a href="#" onClick={handleContactClick} className="hover:text-white cursor-pointer">Contact Us</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 ClassifiedU. All rights reserved. | Privacy Policy | Terms of Service</p>
        </div>
      </div>

      {/* Contact Modal */}
      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />
    </footer>
  );
}
