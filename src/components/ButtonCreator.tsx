import { useState } from "react";

interface ButtonConfig {
  id?: string;
  label: string;
  imageUrl: string;
  hoverText: string;
  action: string;
  color: string;
  textColor: string;
  onClickBehavior: 'link' | 'function';
}

export function ButtonCreator() {
  const [buttonConfig, setButtonConfig] = useState<ButtonConfig>({
    label: '',
    imageUrl: '',
    hoverText: '',
    action: '',
    color: '#1389FD',
    textColor: '#FFFFFF',
    onClickBehavior: 'link'
  });
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadLink, setDownloadLink] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setButtonConfig(prev => ({ ...prev, [name]: value }));
  };

  const generateImage = async () => {
    if (!buttonConfig.label.trim()) {
      alert('Please enter a label first to use as image prompt');
      return;
    }

    setIsGeneratingImage(true);
    try {
      const workerUrl = 'https://text-to-image.jessejesse.workers.dev';
      const response = await fetch(`${workerUrl}?prompt=${encodeURIComponent(buttonConfig.label)}`);
      
      if (!response.ok) throw new Error('Image generation failed');
      
      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);
      setButtonConfig(prev => ({ ...prev, imageUrl }));
    } catch (error) {
      console.error('Image generation error:', error);
      alert('Failed to generate image. Please try again.');
    } finally {
      setIsGeneratingImage(false);
    }
  };

  const generateButtonCode = () => {
    const buttonCode = `
      <button 
        title="${buttonConfig.hoverText || buttonConfig.label}"
        onclick="${buttonConfig.onClickBehavior === 'link' ? `window.location.href='${buttonConfig.action}'` : buttonConfig.action}"
        style="
          background-color: ${buttonConfig.color};
          color: ${buttonConfig.textColor};
          ${buttonConfig.imageUrl ? `background-image: url('${buttonConfig.imageUrl}'); background-size: cover;` : ''}
          border: none;
          padding: 12px 24px;
          border-radius: 8px;
          font-size: 16px;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        "
        onmouseover="this.style.transform = 'translateY(-2px)'; this.style.boxShadow = '0 6px 10px rgba(0,0,0,0.15)';"
        onmouseout="this.style.transform = 'none'; this.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';"
      >
        ${buttonConfig.label}
      </button>
    `;
    
    return buttonCode;
  };

  const downloadButton = () => {
    if (!buttonConfig.label.trim() || !buttonConfig.action.trim()) {
      alert('Label and Action are required fields');
      return;
    }

    setIsDownloading(true);
    try {
      const buttonCode = generateButtonCode();
      const blob = new Blob([buttonCode], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      setDownloadLink(url);
      
      // Create a temporary link to trigger download
      const a = document.createElement('a');
      a.href = url;
      a.download = 'custom-button.html';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      
      // Reset form but keep color preferences
      setButtonConfig(prev => ({
        label: '',
        imageUrl: '',
        hoverText: '',
        action: '',
        color: prev.color,
        textColor: prev.textColor,
        onClickBehavior: prev.onClickBehavior
      }));
    } catch (error) {
      console.error('Download error:', error);
      alert('Failed to generate download.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg p-6 max-w-lg mx-auto bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200">
      <h2 className="text-2xl text-center font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-gray-500 to-orange-700">
        Create Custom Button
      </h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Background Image</label>
          <input
            type="text"
            name="label"
            value={buttonConfig.label}
            onChange={handleInputChange}
            placeholder="What should the button say?"
            className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Background Color</label>
            <div className="flex items-center">
              <input
                type="color"
                name="color"
                value={buttonConfig.color}
                onChange={handleInputChange}
                className="w-10 h-10 p-1 rounded cursor-pointer"
              />
              <span className="ml-2 text-sm">{buttonConfig.color}</span>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Text Color</label>
            <div className="flex items-center">
              <input
                type="color"
                name="textColor"
                value={buttonConfig.textColor}
                onChange={handleInputChange}
                className="w-10 h-10 p-1 rounded cursor-pointer"
              />
              <span className="ml-2 text-sm">{buttonConfig.textColor}</span>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Hover Text</label>
          <input
            type="text"
            name="hoverText"
            onChange={handleInputChange}
            placeholder="Text on hover"
            className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Button Action:</label>
          <input
            type="text"
            name="action"
            value={buttonConfig.action}
            onChange={handleInputChange}
            placeholder={buttonConfig.onClickBehavior === 'link' ? 'https://...' : 'functionName()'}
            className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">On-Click Behavior</label>
          <select
            name="onClickBehavior"
            value={buttonConfig.onClickBehavior}
            onChange={handleInputChange}
            className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          >
            <option value="link">Open Link</option>
            <option value="function">Call Function</option>
          </select>
        </div>

        <div>
          <button
            onClick={generateImage}
            disabled={isGeneratingImage}
            className="w-full py-2 px-4 rounded-md font-medium transition-colors flex items-center justify-center"
            style={{
              backgroundColor: buttonConfig.color,
              color: buttonConfig.textColor
            }}
          >
            {isGeneratingImage ? (
              <>
                <span className="w-4 h-4 border-2 border-t-transparent border-current rounded-full animate-spin mr-2"></span>
                Generating...
              </>
            ) : (
              'Generate Image'
            )}
          </button>
          
          {buttonConfig.imageUrl && (
            <div className="mt-4">
              <div className="font-medium text-sm mb-1">Image</div>
              <div className="relative">
                <img
                  src={buttonConfig.imageUrl}
                  alt="Button background preview"
                  className="w-full max-w-xs rounded-md border border-gray-300 dark:border-gray-600"
                />
                <button
                  onClick={() => setButtonConfig(prev => ({ ...prev, imageUrl: '' }))}
                  className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-1 rounded-full"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 p-4 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800">
          <h3 className="text-lg font-medium mb-3 text-center">Preview</h3>
          <div className="flex justify-center">
            <button
              className="py-2 px-6 rounded-md font-medium transition-all duration-300 flex items-center justify-center"
              style={{
                backgroundColor: buttonConfig.color,
                color: buttonConfig.textColor,
                backgroundImage: buttonConfig.imageUrl ? `url(${buttonConfig.imageUrl})` : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                border: `2px solid ${buttonConfig.textColor}`
              }}
              title={buttonConfig.hoverText}
            >
              {buttonConfig.label || 'Your Button'}
            </button>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3">
          <button
            className="py-2 px-4 rounded-md font-medium transition-colors flex items-center justify-center"
            onClick={downloadButton}
            disabled={isDownloading}
            style={{
              backgroundColor: buttonConfig.color,
              color: buttonConfig.textColor
            }}
          >
            {isDownloading ? (
              <>
                <span className="w-4 h-4 border-2 border-t-transparent border-current rounded-full animate-spin mr-2"></span>
                Downloading...
              </>
            ) : (
              'Download'
            )}
          </button>

          {downloadLink && (
            <div className="mt-2 text-center text-sm">
              <a
                href={downloadLink}
                download="custom-button.html"
                className="text-green-600 dark:text-green-400 hover:underline"
              >
                Click here if download didn't start automatically
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
