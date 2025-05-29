import React, { useState } from 'react';
import { RocketIcon, SunIcon, MoonIcon } from 'lucide-react';
import { MountainSnow } from 'lucide-react';

interface HeaderProps {
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ theme, onToggleTheme }) => {
  const [showAboutModal, setShowAboutModal] = useState(false); 

  const closeAboutModal = () => {
    setShowAboutModal(false);
  };

  return (
    <header className={`w-full py-6 px-4 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-200'}`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <MountainSnow className="w-8 h-8 text-indigo-500" />
          <h1 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Deploy Buttons
          </h1>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* About Button */}
          <button
            onClick={() => setShowAboutModal(true)}
            className={`p-2 rounded-lg transition-colors duration-200 ${
              theme === 'dark' 
                ? 'text-gray-400 hover:text-white hover:bg-gray-800' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
            aria-label="Open About modal"
          >
            About
          </button>

          {/* Theme Toggle Button */}
          <button
            onClick={onToggleTheme}
            className={`p-2 rounded-lg transition-colors duration-200 ${
              theme === 'dark' 
                ? 'text-gray-400 hover:text-white hover:bg-gray-800' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <SunIcon className="w-5 h-5" />
            ) : (
              <MoonIcon className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Modal for About */}
      {showAboutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center">
          <div className="bg-gray-900 rounded-xl shadow-lg max-w-xl w-full mx-4 my-10 p-6 text-white relative overflow-y-auto max-h-[90vh]">
            <button
              onClick={closeAboutModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-red-400 text-xl"
              aria-label="Close About modal"
            >
              &times;
            </button>

            <h2 className="text-2xl font-bold mb-4">Deploy Buttons</h2>

            <p className="mb-4">
              Welcome to the Deploy Buttons — a utility for generating deploy buttons in markdown and html,
              developed by <span className="font-semibold">sudo-self</span>.
            </p>

            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <i className="fa-brands fa-github text-white text-lg" aria-hidden="true"></i>
                <a
                  href="https://github.com/sudo-self/repo-buttons"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline text-blue-400"
                >
                  source code
                </a>
              </div>

              <div className="flex items-center space-x-2">
                <i className="fa-solid fa-dollar-sign text-green-500 text-lg" aria-hidden="true"></i>
                <a
                  href="https://cash.app/$ilostmyipod"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline text-green-400"
                >
                  Donations
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;





