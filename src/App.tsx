import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import RepoForm from './components/RepoForm';
import ButtonGrid from './components/ButtonGrid';
import Footer from './components/Footer';
import { deployPlatforms } from './data/platforms';
import { FormState } from './types';
import { FloaterButtonConfigurator } from './components/FloaterButtonConfigurator';
import { ButtonCreator } from './components/ButtonCreator';

function App() {
  const [formState, setFormState] = useState<FormState>({
    username: '',
    repo: ''
  });

  const [hasGenerated, setHasGenerated] = useState<boolean>(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [activeForm, setActiveForm] = useState<'deploy' | 'floater' | 'creator'>('deploy');

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
      const resultsElement = document.getElementById('results');
      if (resultsElement) {
        resultsElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
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

        {/* Improved tab buttons with better separation */}
        <div className="flex justify-center mb-8 gap-2">
          {['deploy', 'floater', 'creator'].map((formType) => (
            <button
              key={formType}
              type="button"
              onClick={() => setActiveForm(formType as typeof activeForm)}
              className={`
                px-6 py-3 text-sm font-medium rounded-lg border transition-all duration-200
                ${activeForm === formType
                  ? theme === 'dark'
                    ? 'bg-indigo-600 text-white border-indigo-700 shadow-md'
                    : 'bg-indigo-500 text-white border-indigo-600 shadow-md'
                  : theme === 'dark'
                    ? 'bg-gray-800 text-gray-300 border-gray-700 hover:bg-gray-700'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                }
                ${activeForm === formType ? 'z-10 transform scale-105' : 'hover:scale-102'}
                relative overflow-hidden
              `}
              style={{ minWidth: '140px' }}
            >
              {formType === 'deploy' ? 'Deploy Buttons' :
               formType === 'floater' ? 'Floater Button' : 'Button Creator'}
              {activeForm === formType && (
                <span className="absolute bottom-0 left-0 right-0 h-1 bg-indigo-400"></span>
              )}
            </button>
          ))}
        </div>

        {/* Forms container with dynamic height */}
        <div
          className="relative overflow-hidden mb-8 transition-all duration-300"
          style={{
            minHeight: activeForm === 'deploy' ? '300px' : '200px',
          }}
        >
          <div
            className={`transition-all duration-300 flex ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-200'}`}
            style={{
              transform:
                activeForm === 'deploy'
                  ? 'translateX(0%)'
                  : activeForm === 'floater'
                  ? 'translateX(-33.33%)'
                  : 'translateX(-66.66%)',
              width: '300%',
            }}
          >
            <div className="w-1/3 px-4">
              <RepoForm formState={formState} onSubmit={handleSubmit} />
            </div>
            <div className="w-1/3 px-4">
              <FloaterButtonConfigurator />
            </div>
            <div className="w-1/3 px-4">
              <ButtonCreator />
            </div>
          </div>
        </div>

        {/* Results section */}
        {activeForm === 'deploy' && (
          <div
            id="results"
            className={`transition-opacity duration-500 ${hasGenerated ? 'opacity-100' : 'opacity-0'} mb-16`}
          >
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

