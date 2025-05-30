import React from 'react';
import { HeartIcon, CoffeeIcon } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full py-6 px-4 mt-12">
      <div className="max-w-7xl mx-auto text-center">
        {/* Centered Deploy Button with Icon */}
        <div className="flex justify-center items-center mb-2 space-x-2">
          <CoffeeIcon className="w-5 h-5 text-yellow-600" />
          <a
            href="https://buymeacoffee.com/mrjesseropm"
            target="_blank"
            rel="noopener noreferrer"
            className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-sm font-medium"
            aria-label="Buy me a coffee"
          >
            Buy me a coffee
          </a>
        </div>

        {/* Footer Text */}
        <p className="text-cyan-700 dark:text-green-500 text-sm">
        
          {' '}
          <a
            href="https://repo-buttons.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline text-cyan-700 dark:text-green-500"
          >
          repo-buttons.vercel.app
          </a>
        </p>

        <div className="mt-2 text-gray-600 text-xs dark:text-gray-400">
          buttons are not official or affiliated with any platforms
        </div>
      </div>
    </footer>
  );
};

export default Footer;






