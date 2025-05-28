import React, { useState } from 'react';
import { DeployPlatform } from '../types';
import { CheckIcon, CopyIcon, CodeIcon, ImageIcon, ExternalLinkIcon } from 'lucide-react';

interface DeployButtonProps {
  platform: DeployPlatform;
  username: string;
  repo: string;
}

const DeployButton: React.FC<DeployButtonProps> = ({ platform, username, repo }) => {
  const [copied, setCopied] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'markdown' | 'html'>('markdown');

  const handleCopy = (type: string) => {
    const textToCopy = type === 'markdown' 
      ? platform.buttonMarkdown(username, repo)
      : platform.buttonHtml(username, repo);
    
    navigator.clipboard.writeText(textToCopy);
    setCopied(type);
    
    setTimeout(() => {
      setCopied(null);
    }, 2000);
  };

  return (
    <div 
      className="bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
      style={{ borderTop: `3px solid ${platform.color}` }}
    >
      <div className="p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-white">{platform.name}</h3>
          <a 
            href={platform.deployUrl(username, repo)} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-indigo-400 hover:text-indigo-300 flex items-center"
          >
            <ExternalLinkIcon className="w-4 h-4 mr-1" />
            <span className="text-sm">Open</span>
          </a>
        </div>
        
        <div className="mb-4">
          <div className="flex rounded-t-md overflow-hidden border-b border-gray-700">
            <button
              onClick={() => setActiveTab('markdown')}
              className={`px-4 py-2 text-sm flex-1 flex items-center justify-center ${
                activeTab === 'markdown' 
                  ? 'bg-gray-700 text-white' 
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700/50'
              }`}
            >
              <CodeIcon className="w-4 h-4 mr-1" />
              Markdown
            </button>
            <button
              onClick={() => setActiveTab('html')}
              className={`px-4 py-2 text-sm flex-1 flex items-center justify-center ${
                activeTab === 'html' 
                  ? 'bg-gray-700 text-white' 
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700/50'
              }`}
            >
              <ImageIcon className="w-4 h-4 mr-1" />
              HTML
            </button>
          </div>
          
          <div className="bg-gray-900 p-3 rounded-b-md">
            <div className="relative">
              <pre className="text-gray-300 text-xs sm:text-sm overflow-x-auto p-2">
                {activeTab === 'markdown' 
                  ? platform.buttonMarkdown(username, repo)
                  : platform.buttonHtml(username, repo)
                }
              </pre>
              <button
                onClick={() => handleCopy(activeTab)}
                className="absolute top-2 right-2 p-1.5 rounded-md bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white transition-colors duration-200"
                aria-label={`Copy ${activeTab} code`}
              >
                {copied === activeTab ? (
                  <CheckIcon className="w-4 h-4 text-green-500" />
                ) : (
                  <CopyIcon className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center">
          <div 
            className="p-2 bg-gray-900 rounded-md" 
            dangerouslySetInnerHTML={{ 
              __html: platform.buttonHtml(username, repo) 
            }} 
          />
        </div>
      </div>
    </div>
  );
};

export default DeployButton;