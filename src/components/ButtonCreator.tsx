import { useState, useRef } from "react";

interface ButtonConfig {
  label: string;
  imageUrl: string;
  borderColor: string;
  animationType: 'none' | 'pulse' | 'bounce' | 'shake';
  link: string;
}

const animationOptions = [
  { value: 'none', label: 'No Animation' },
  { value: 'pulse', label: 'Pulse' },
  { value: 'bounce', label: 'Bounce' },
  { value: 'shake', label: 'Shake' }
];

export function ButtonCreator() {
  const [buttonConfig, setButtonConfig] = useState<ButtonConfig>({
    label: 'Click Me',
    imageUrl: '',
    borderColor: '#000000',
    animationType: 'none',
    link: 'https://example.com'
  });

  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const previewRef = useRef<HTMLButtonElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setButtonConfig(prev => ({ ...prev, [name]: value }));
  };

  const generateImage = async () => {
    if (!buttonConfig.label.trim()) {
      alert('Please enter button text first');
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
    const animationStyles = buttonConfig.animationType !== 'none' ? `
      @keyframes ${buttonConfig.animationType} {
        0%, 100% { transform: ${buttonConfig.animationType === 'pulse' ? 'scale(1)' : 'translateY(0)'}; }
        50% { transform: ${buttonConfig.animationType === 'pulse' ? 'scale(1.1)' : buttonConfig.animationType === 'bounce' ? 'translateY(-10px)' : 'translateX(5px)'}; }
      }
    ` : '';

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          ${animationStyles}
          .custom-button {
            display: inline-block;
            padding: 12px 24px;
            border: 2px solid ${buttonConfig.borderColor};
            border-radius: 8px;
            background: ${buttonConfig.imageUrl ? `url('${buttonConfig.imageUrl}') center/cover` : '#1389FD'};
            color: white;
            font-weight: bold;
            text-align: center;
            cursor: pointer;
            ${buttonConfig.animationType !== 'none' ? `animation: ${buttonConfig.animationType} 1s infinite;` : ''}
          }
        </style>
      </head>
      <body>
        <a href="${buttonConfig.link}" class="custom-button">
          ${buttonConfig.label}
        </a>
      </body>
      </html>
    `;
  };

  const downloadButton = () => {
    setIsDownloading(true);
    try {
      const buttonCode = generateButtonCode();
      const blob = new Blob([buttonCode], { type: 'text/html' });
      const url = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = 'button.html';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error('Download error:', error);
      alert('Failed to generate download.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="max-w-sm md:max-w-md lg:max-w-lg mx-auto p-6 rounded-xl bg-white dark:bg-gray-900 shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
        Create Image Button
      </h2>

      <div className="space-y-4">
        <div>
          <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">Button Text</label>
          <input
            type="text"
            name="label"
            value={buttonConfig.label}
            onChange={handleInputChange}
            className="w-full p-3 rounded-lg border bg-white border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">Link URL</label>
          <input
            type="text"
            name="link"
            value={buttonConfig.link}
            onChange={handleInputChange}
            className="w-full p-3 rounded-lg border bg-white border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>

        <div className="flex items-center gap-4">
          <div>
            <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">Border Color</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                name="borderColor"
                value={buttonConfig.borderColor}
                onChange={handleInputChange}
                className="w-10 h-10 cursor-pointer rounded-lg overflow-hidden border border-gray-300 dark:border-gray-600"
              />
              <span className="text-sm text-gray-600 dark:text-gray-400">{buttonConfig.borderColor}</span>
            </div>
          </div>

          <div className="flex-1">
            <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">Animation</label>
            <select
              name="animationType"
              value={buttonConfig.animationType}
              onChange={handleInputChange}
              className="w-full p-3 rounded-lg border bg-white border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              {animationOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">Background Image</label>
          <div className="flex gap-2">
            <button
              onClick={generateImage}
              disabled={isGeneratingImage}
              className={`flex-1 p-3 rounded-lg font-medium transition-colors ${isGeneratingImage ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'} text-white`}
            >
              {isGeneratingImage ? 'Generating...' : 'Generate Image'}
            </button>
          </div>
          {buttonConfig.imageUrl && (
            <div className="mt-4 relative">
              <img
                src={buttonConfig.imageUrl}
                alt="Button background"
                className="w-full h-32 object-cover rounded-lg border border-gray-300 dark:border-gray-600"
              />
              <button
                onClick={() => setButtonConfig(prev => ({ ...prev, imageUrl: '' }))}
                className="absolute top-2 right-2 p-1 rounded-full bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white"
              >
                ×
              </button>
            </div>
          )}
        </div>

        <div className="p-6 rounded-xl bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600">
          <h3 className="text-center mb-4 font-medium text-gray-700 dark:text-gray-300">Preview</h3>
          <div className="flex justify-center">
            <button
              ref={previewRef}
              className="px-8 py-3 rounded-lg flex items-center justify-center font-medium transition-all"
              style={{
                border: `2px solid ${buttonConfig.borderColor}`,
                background: buttonConfig.imageUrl ? `url(${buttonConfig.imageUrl}) center/cover` : '#4f46e5',
                color: 'white',
                animation: buttonConfig.animationType !== 'none' ? `${buttonConfig.animationType} 1s infinite` : 'none'
              }}
            >
              {buttonConfig.label}
            </button>
          </div>
        </div>

        <button
          onClick={downloadButton}
          disabled={isDownloading}
          className={`w-full p-4 rounded-lg font-medium transition-colors ${isDownloading ? 'bg-green-500' : 'bg-green-600 hover:bg-green-700'} text-white`}
        >
          {isDownloading ? 'Downloading...' : 'Download Button'}
        </button>
      </div>
    </div>
  );
}

