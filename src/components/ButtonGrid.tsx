import React from 'react';
import { DeployPlatform, FormState } from '../types';
import DeployButton from './DeployButton';

interface ButtonGridProps {
  platforms: DeployPlatform[];
  formState: FormState;
}

const ButtonGrid: React.FC<ButtonGridProps> = ({ platforms, formState }) => {
  const { username, repo } = formState;
  
  if (!username || !repo) {
    return null;
  }

  return (
    <div className="w-full max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
 {' '}
  <a
    href={`https://github.com/${username}/${repo}`}
    target="_blank"
    rel="noopener noreferrer" 
    className="text-indigo-600 dark:text-indigo-400 hover:underline"
  >
     {username} / {repo}
  </a>
</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {platforms.map(platform => (
          <DeployButton
            key={platform.id}
            platform={platform}
            username={username}
            repo={repo}
          />
        ))}
      </div>
    </div>
  );
};

export default ButtonGrid;
