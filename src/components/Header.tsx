'use client';

import React, { useState } from 'react';
import {
  RocketIcon,
  SunIcon,
  MoonIcon,
  MountainSnow,
  Hammer,
  Github,
  DollarSign,
  Copy,
  Check
} from 'lucide-react';

interface HeaderProps {
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ theme, onToggleTheme }) => {
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [showNpxPanel, setShowNpxPanel] = useState(false);
  const [copied, setCopied] = useState(false);

  const closeAboutModal = () => {
    setShowAboutModal(false);
  };

  const copyCommand = () => {
    navigator.clipboard.writeText('npx floater-xyz');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <header className={`w-full py-6 px-4 relative z-40 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-200'}`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <MountainSnow className="w-8 h-8 text-indigo-500" />
          <h1 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Repo Buttons
          </h1>
        </div>

        {/* Controls */}
        <div className="flex items-center space-x-4">
          {/* NPX Command Panel Button */}
          <button
            onClick={() => setShowNpxPanel(!showNpxPanel)}
            className={`p-2 rounded-lg transition-colors duration-200 ${
              theme === 'dark'
                ? 'text-gray-400 hover:text-white hover:bg-gray-800'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
            aria-label="Show NPX command"
          >
            <RocketIcon className="w-5 h-5 text-pink-500" aria-hidden="true" />
            <span className="sr-only">NPX Command</span>
          </button>

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
            <Hammer className="w-5 h-5 text-green-600" aria-hidden="true" />
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

      {/* NPX Command Panel */}
      {showNpxPanel && (
        <div className="border border-gray-200 dark:border-gray-700 absolute top-full right-4 mt-2 w-[320px] max-w-full bg-white dark:bg-gray-900 text-black dark:text-gray-200 shadow-xl rounded-lg p-4 z-50">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center space-x-2">
              <RocketIcon className="w-5 h-5 text-pink-500" />
              <h3 className="text-md font-semibold">Command Line</h3>
            </div>
            <button
              onClick={() => setShowNpxPanel(false)}
              className="text-gray-500 hover:text-red-500 font-bold text-xl"
            >
              ×
            </button>
          </div>

          <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md flex justify-between items-center">
            <code className="text-sm font-mono text-gray-800 dark:text-gray-200">
              npx floater-xyz
            </code>
            <button
              onClick={copyCommand}
              className={`p-1.5 rounded ${
                theme === 'dark' 
                  ? 'bg-gray-700 hover:bg-gray-600' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label="Copy command"
            >
              {copied ?
                <Check className="w-4 h-4 text-green-500" /> :
                <Copy className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              }
            </button>
          </div>

          <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
            Run this command to setup a floater button in your project.
          </p>
        </div>
      )}

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

            <h2 className="text-2xl font-bold mb-4">Repo Buttons</h2>

            <p className="mb-4">
              Welcome to Repo Buttons — a utility web app for generating buttons from GitHub repos and existing URLs. Developed by <span className="font-semibold">sudo-self</span>.
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









