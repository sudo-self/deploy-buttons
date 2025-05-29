import React from 'react';
import { HeartIcon } from 'lucide-react';

const Footer: React.FC = () => {
  return (
   <footer className="w-full py-6 px-4 mt-12">
  <div className="max-w-7xl mx-auto text-center">
    <p className="text-cyan-700 text-sm">
      <HeartIcon className="inline-block w-4 h-4 text-red-500 mx-1" /> {' '}
      <a
        href="https:/deploy-buttons.web.app"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:underline text-cyan-500"
      >
       deploy-buttons.web.app
      </a>
    </p>
    <div className="mt-2 text-gray-600 text-xs">
      buttons are not official or affiliated with any platforms
    </div>
  </div>
</footer>

  );
};

export default Footer;
