import React, { useState } from 'react';
import {
  RocketIcon,
  SunIcon,
  MoonIcon,
  MountainSnow,
  Hammer,
  Github,
  DollarSign,
} from 'lucide-react';

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
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <MountainSnow className="w-8 h-8 text-indigo-500" />
          <h1 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Deploy Buttons
          </h1>
        </div>

        {/* Controls */}
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
            <Hammer className="w-5 h-5 text-green-500" aria-hidden="true" />
            <span className="sr-only">About</span>
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
              <SunIcon className="w-5 h-5 text-cyan-500" />
            ) : (
              <MoonIcon className="w-5 h-5 text-cyan-500" />
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
                            Welcome to Deploy Buttons — a utility web app for generating one-click deploy buttons for your GitHub repo. You can feature these deploy buttons in your project or docs. Developed by <span className="font-semibold">sudo-self</span>.
                          </p>


            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Github className="w-5 h-5 text-white" aria-hidden="true" />
                <a
                  href="https://github.com/sudo-self/deploy-buttons"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline text-blue-400"
                >
                  Source Code
                </a>
              </div>

              <div className="flex items-center space-x-2">
                <DollarSign className="w-5 h-5 text-green-500" aria-hidden="true" />
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









