import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import RepoForm from './components/RepoForm';
import ButtonGrid from './components/ButtonGrid';
import Footer from './components/Footer';
import { deployPlatforms } from './data/platforms';
import { FormState } from './types';

function App() {
  const [formState, setFormState] = useState<FormState>({
    username: '',
    repo: ''
  });
  
  const [hasGenerated, setHasGenerated] = useState<boolean>(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  
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
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-gray-50' : 'bg-gray-200 text-gray-900'}`}>
      <Header theme={theme} onToggleTheme={toggleTheme} />
      
      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            Deploy Button Generator
          </h1>
          <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} max-w-2xl mx-auto`}>
           Create one-click deploy buttons for your GitHub repositories. Simply enter your username and repository name to generate buttons and get the code to embed them in your project.
          </p>
        </div>
        
        <div className="mb-16">
          <RepoForm formState={formState} onSubmit={handleSubmit} />
        </div>
        
        <div id="results" className={`transition-all duration-500 ${hasGenerated ? 'opacity-100' : 'opacity-0'}`}>
          {hasGenerated && (
            <ButtonGrid platforms={deployPlatforms} formState={formState} />
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
