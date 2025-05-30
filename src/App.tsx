import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import RepoForm from './components/RepoForm';
import ButtonGrid from './components/ButtonGrid';
import Footer from './components/Footer';
import { deployPlatforms } from './data/platforms';
import { FormState } from './types';
import { FloaterButtonConfigurator } from './components/FloaterButtonConfigurator';

function App() {
  const [formState, setFormState] = useState<FormState>({
    username: '',
    repo: ''
  });
  
  const [hasGenerated, setHasGenerated] = useState<boolean>(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [activeForm, setActiveForm] = useState<'deploy' | 'floater'>('deploy');
  
  useEffect(() => {
    const savedForm = localStorage.getItem('deployButtonForm');
    if (savedForm) {
      try {
        const parsed = JSON.parse(savedForm);
        setFormState(parsed);
        
        if (parsed.username && parsed.repo) {
          setHasGenerated(true);
        }
      } catch (e) {
        console.error('Failed to parse saved form data');
      }
    }

    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);
  
  const handleSubmit = (data: FormState) => {
    setFormState(data);
    setHasGenerated(true);
    
    setTimeout(() => {
      window.scrollTo({
        top: document.getElementById('results')?.offsetTop || 0,
        behavior: 'smooth'
      });
    }, 100);
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-gray-200' : 'bg-gray-200 text-gray-900'}`}>
      <Header theme={theme} onToggleTheme={toggleTheme} />
      
      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            GitHub Repo Buttons
          </h1>
          <p className={`${theme === 'dark' ? 'text-cyan-500' : 'text-cyan-700'} max-w-2xl mx-auto`}>
                 A utility web app for generating multi purpose buttons for your projects.
    
          </p>
        </div>
        
        {/* Form selector tabs */}
        <div className="flex justify-center mb-8">
          <div className={`inline-flex rounded-md shadow-sm ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-300'}`} role="group">
            <button
              type="button"
              onClick={() => setActiveForm('deploy')}
              className={`px-4 py-2 text-sm font-medium rounded-l-lg ${activeForm === 'deploy' 
                ? (theme === 'dark' ? 'bg-indigo-600 text-white' : 'bg-indigo-500 text-white') 
                : (theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700')}`}
            >
              Deploy Buttons
            </button>
            <button
              type="button"
              onClick={() => setActiveForm('floater')}
              className={`px-4 py-2 text-sm font-medium rounded-r-lg ${activeForm === 'floater' 
                ? (theme === 'dark' ? 'bg-indigo-600 text-white' : 'bg-indigo-500 text-white') 
                : (theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700')}`}
            >
              Floater Button
            </button>
          </div>
        </div>
        
        {/* Forms container with sliding animation */}
        <div className="relative overflow-hidden mb-16 min-h-[400px]">
          <div
            className={`transition-all duration-300 flex ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-200'} rounded-lg shadow-lg p-6`}
            style={{
              transform: activeForm === 'deploy' ? 'translateX(0)' : 'translateX(-50%)',
              width: '200%',
              display: 'flex'
            }}
          >
            <div className="w-1/2 px-4">
              <RepoForm formState={formState} onSubmit={handleSubmit} />
            </div>
            <div className="w-1/2 px-4">
              <FloaterButtonConfigurator />
            </div>
          </div>
        </div>
        
        {/* Results section (only for deploy buttons) */}
        {activeForm === 'deploy' && (
          <div id="results" className={`transition-all duration-500 ${hasGenerated ? 'opacity-100' : 'opacity-0'}`}>
            {hasGenerated && (
              <ButtonGrid platforms={deployPlatforms} formState={formState} />
            )}
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
