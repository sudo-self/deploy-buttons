import React from 'react';
import { RocketIcon, SunIcon, MoonIcon } from 'lucide-react';
import { MountainSnow } from 'lucide-react';

interface HeaderProps {
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ theme, onToggleTheme }) => {
  return (
    <header className={`w-full py-6 px-4 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-200`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
           <MountainSnow className="w-8 h-8 text-indigo-500" />
          <h1 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Repo Buttons</h1>
        </div>
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
    </header>
  );
};

export default Header;

