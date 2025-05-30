import React, { useState, useEffect } from 'react';
import { FormState } from '../types';
import { GithubIcon } from 'lucide-react';

interface RepoFormProps {
  formState: FormState;
  onSubmit: (formData: FormState) => void;
}

const RepoForm: React.FC<RepoFormProps> = ({ formState, onSubmit }) => {
 const [form, setForm] = useState<FormState>({ username: '', repo: '' });

  const [error, setError] = useState<string>('');

  useEffect(() => {
  
    const savedForm = localStorage.getItem('deployButtonForm');
    if (savedForm) {
      try {
        const parsed = JSON.parse(savedForm);
        setForm(parsed);
      } catch (e) {
        console.error('Failed to parse saved form data');
      }
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
 
    if (!form.username.trim() || !form.repo.trim()) {
      setError('Both username and repository name are required');
      return;
    }
    

    setError('');
    
  
    localStorage.setItem('deployButtonForm', JSON.stringify(form));
    
  
    onSubmit(form);
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-gray-900 border border-gray-200 rounded-lg shadow-xl overflow-hidden transform transition-all hover:shadow-2xl duration-300">
      <div className="px-6 py-8">
        <div className="flex items-center justify-center mb-6">
          <GithubIcon className="w-10 h-10 text-white mr-2" />
          <h2 className="text-2xl font-bold text-white">Create Deploy Buttons</h2>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-1">
              GitHub Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              onChange={handleChange}
              placeholder="Username"
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
            />
          </div>
          
          <div>
            <label htmlFor="repository" className="block text-sm font-medium text-gray-300 mb-1">
              Repository Name
            </label>
            <input
              type="text"
              id="repo"
              name="repo"
              onChange={handleChange}
              placeholder="Repository"
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
            />
          </div>
          
          {error && (
            <div className="text-red-400 text-sm py-2 px-3 bg-red-900/30 rounded-md">
              {error}
            </div>
          )}
          
          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 transform hover:scale-[1.02]"
          >
            Create Buttons
          </button>
        </form>
      </div>
    </div>
  );
};

export default RepoForm;
