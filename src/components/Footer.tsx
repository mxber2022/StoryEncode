import React from 'react';
import { Twitter, Github, MessageCircle } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black/90 border-t border-gray-800/50 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          {/* Brand */}
          <div className="flex items-center space-x-3">
            {/* Custom S Logo */}
            {/* <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-400/20 via-gray-300/30 to-gray-500/20 rounded-lg blur-md group-hover:blur-lg transition-all duration-500"></div>
              <div className="relative bg-gradient-to-br from-gray-400 via-gray-300 to-gray-500 p-2 rounded-lg shadow-xl border border-gray-600/40 backdrop-blur-sm">
                <div className="w-5 h-5 flex items-center justify-center">
                  <svg 
                    viewBox="0 0 24 24" 
                    className="w-5 h-5 text-black font-bold"
                    fill="currentColor"
                  >
                    <path d="M12 2C8.5 2 6 4.5 6 8c0 1.5 0.5 2.8 1.3 3.8L6 13c-1.1 0.6-2 1.9-2 3.5C4 19.5 6.5 22 10 22h4c3.5 0 6-2.5 6-6c0-1.5-0.5-2.8-1.3-3.8L20 11c1.1-0.6 2-1.9 2-3.5C22 4.5 19.5 2 16 2h-4zm0 2h4c2.5 0 4 1.5 4 3.5c0 0.8-0.3 1.5-0.8 2L18 10.2c0.8 0.8 1.2 1.8 1.2 2.8c0 2.5-1.5 4-4 4h-4c-2.5 0-4-1.5-4-4c0-0.8 0.3-1.5 0.8-2L9 10.2C8.2 9.4 7.8 8.4 7.8 7.5C7.8 5 9.3 3.5 12 3.5z"/>
                  </svg>
                </div>
              </div>
            </div> */}
            <div>
              {/* <h3 className="text-lg font-bold bg-gradient-to-r from-gray-200 via-gray-100 to-gray-300 bg-clip-text text-transparent">
                StoryMint
              </h3> */}
              <p className="text-sm font-semibold tracking-wide bg-gradient-to-r from-teal-400 bg-red-400 to-red-600 bg-clip-text text-transparent flex items-center gap-1">
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="#10b981" />
    <path d="M8 12l2 2 4-4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
  Powered by TomoWallet
</p>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center space-x-6">
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-gray-200 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-200 transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-200 transition-colors">
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
            
            <div className="hidden md:block w-px h-6 bg-gray-700"></div>
            
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>© 2024 StoryMint</span>
              <a href="#" className="hover:text-gray-200 transition-colors">Privacy</a>
              <a href="#" className="hover:text-gray-200 transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;