import { useState, useRef } from "react";

interface ButtonConfig {
  id?: string;
  label: string;
  imageUrl: string;
  hoverText: string;
  action: string;
  color: string;
  textColor: string;
  borderColor: string;
  borderWidth: string;
  borderRadius: string;
  padding: string;
  fontSize: string;
  fontFamily: string;
  fontWeight: string;
  boxShadow: string;
  onClickBehavior: 'link' | 'function' | 'scroll';
  targetElement?: string;
  animationType: 'none' | 'pulse' | 'bounce' | 'shake';
  icon: string;
  iconPosition: 'left' | 'right';
  iconSize: string;
}

const fontFamilies = [
  'Arial, sans-serif',
  'Helvetica, sans-serif',
  'Verdana, sans-serif',
  'Georgia, serif',
  'Times New Roman, serif',
  'Courier New, monospace',
  'Impact, sans-serif',
  'Comic Sans MS, cursive'
];

const animationOptions = [
  { value: 'none', label: 'No Animation' },
  { value: 'pulse', label: 'Pulse' },
  { value: 'bounce', label: 'Bounce' },
  { value: 'shake', label: 'Shake' }
];

const iconOptions = [
  { value: '', label: 'None' },
  { value: '⭐', label: 'Star' },
  { value: '❤️', label: 'Heart' },
  { value: '🚀', label: 'Rocket' },
  { value: '🔔', label: 'Bell' },
  { value: '🔍', label: 'Search' },
  { value: '📩', label: 'Envelope' },
  { value: '🛒', label: 'Cart' },
  { value: '🔑', label: 'Key' },
  { value: '💡', label: 'Lightbulb' }
];

export function ButtonCreator() {
  const [buttonConfig, setButtonConfig] = useState<ButtonConfig>({
    label: '',
    imageUrl: '',
    hoverText: '',
    action: '',
    color: '#1389FD',
    textColor: '#FFFFFF',
    borderColor: 'transparent',
    borderWidth: '1px',
    borderRadius: '8px',
    padding: '12px 24px',
    fontSize: '16px',
    fontFamily: 'Arial, sans-serif',
    fontWeight: 'bold',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    onClickBehavior: 'link',
    animationType: 'none',
    icon: '',
    iconPosition: 'left',
    iconSize: '16px'
  });
  
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadLink, setDownloadLink] = useState<string | null>(null);
  const [showCode, setShowCode] = useState(false);
  const [copied, setCopied] = useState(false);
  const previewRef = useRef<HTMLButtonElement>(null);
  const codeRef = useRef<HTMLTextAreaElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
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
    let actionCode = '';
    if (buttonConfig.onClickBehavior === 'link') {
      actionCode = `window.location.href='${buttonConfig.action}'`;
    } else if (buttonConfig.onClickBehavior === 'function') {
      actionCode = buttonConfig.action;
    } else if (buttonConfig.onClickBehavior === 'scroll') {
      actionCode = `document.querySelector('${buttonConfig.targetElement}').scrollIntoView({ behavior: 'smooth' })`;
    }

    let animationStyles = '';
    if (buttonConfig.animationType !== 'none') {
      animationStyles = `
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
      `;
    }

    const buttonCode = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          ${animationStyles}
          .custom-button {
            background-color: ${buttonConfig.color};
            color: ${buttonConfig.textColor};
            ${buttonConfig.imageUrl ? `background-image: url('${buttonConfig.imageUrl}'); background-size: cover;` : ''}
            border: ${buttonConfig.borderWidth} solid ${buttonConfig.borderColor};
            padding: ${buttonConfig.padding};
            border-radius: ${buttonConfig.borderRadius};
            font-size: ${buttonConfig.fontSize};
            font-family: ${buttonConfig.fontFamily};
            font-weight: ${buttonConfig.fontWeight};
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: ${buttonConfig.boxShadow};
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            ${buttonConfig.animationType !== 'none' ? `animation: ${buttonConfig.animationType} 2s infinite;` : ''}
          }
          .custom-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 10px rgba(0,0,0,0.15);
          }
          .custom-button:active {
            transform: translateY(0);
          }
          .custom-button-icon {
            font-size: ${buttonConfig.iconSize};
            display: ${buttonConfig.icon ? 'inline-block' : 'none'};
          }
        </style>
      </head>
      <body>
        <button 
          class="custom-button"
          title="${buttonConfig.hoverText || buttonConfig.label}"
          onclick="${actionCode}"
        >
          ${buttonConfig.iconPosition === 'left' && buttonConfig.icon ? `<span class="custom-button-icon">${buttonConfig.icon}</span>` : ''}
          ${buttonConfig.label}
          ${buttonConfig.iconPosition === 'right' && buttonConfig.icon ? `<span class="custom-button-icon">${buttonConfig.icon}</span>` : ''}
        </button>
      </body>
      </html>
    `;
    
    return buttonCode;
  };

  const downloadButton = () => {
    if (!buttonConfig.label.trim() || (buttonConfig.onClickBehavior !== 'scroll' && !buttonConfig.action.trim())) {
      alert('Label and Action are required fields');
      return;
    }

    setIsDownloading(true);
    try {
      const buttonCode = generateButtonCode();
      const blob = new Blob([buttonCode], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      setDownloadLink(url);
      
      const a = document.createElement('a');
      a.href = url;
      a.download = 'custom-button.html';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      
      setTimeout(() => {
        URL.revokeObjectURL(url);
      }, 100);
    } catch (error) {
      console.error('Download error:', error);
      alert('Failed to generate download.');
    } finally {
      setIsDownloading(false);
    }
  };

  const copyToClipboard = () => {
    if (codeRef.current) {
      navigator.clipboard.writeText(codeRef.current.value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const resetForm = () => {
    setButtonConfig({
      label: '',
      imageUrl: '',
      hoverText: '',
      action: '',
      color: '#1389FD',
      textColor: '#FFFFFF',
      borderColor: 'transparent',
      borderWidth: '1px',
      borderRadius: '8px',
      padding: '12px 24px',
      fontSize: '16px',
      fontFamily: 'Arial, sans-serif',
      fontWeight: 'bold',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      onClickBehavior: 'link',
      animationType: 'none',
      icon: '',
      iconPosition: 'left',
      iconSize: '16px'
    });
  };

  return (
    <div className="border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg p-6 max-w-3xl mx-auto bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200">
      <h2 className="text-2xl text-center font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
        Advanced Button Creator
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Button Text</label>
              <input
                type="text"
                name="label"
                value={buttonConfig.label}
                onChange={handleInputChange}
                placeholder="Button text"
                className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Hover Text</label>
              <input
                type="text"
                name="hoverText"
                value={buttonConfig.hoverText}
                onChange={handleInputChange}
                placeholder="Tooltip text"
                className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>
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
              <option value="scroll">Scroll to Element</option>
            </select>
          </div>

          {buttonConfig.onClickBehavior === 'scroll' ? (
            <div>
              <label className="block text-sm font-medium mb-1">Target Element Selector</label>
              <input
                type="text"
                name="targetElement"
                value={buttonConfig.targetElement || ''}
                onChange={handleInputChange}
                placeholder="#section-id or .class-name"
                className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium mb-1">
                {buttonConfig.onClickBehavior === 'link' ? 'Link URL' : 'Function Name'}
              </label>
              <input
                type="text"
                name="action"
                value={buttonConfig.action}
                onChange={handleInputChange}
                placeholder={buttonConfig.onClickBehavior === 'link' ? 'https://example.com' : 'myFunction()'}
                className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>
          )}

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
                <input
                  type="text"
                  name="color"
                  value={buttonConfig.color}
                  onChange={handleInputChange}
                  className="ml-2 w-24 p-1 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
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
                <input
                  type="text"
                  name="textColor"
                  value={buttonConfig.textColor}
                  onChange={handleInputChange}
                  className="ml-2 w-24 p-1 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Border Color</label>
              <div className="flex items-center">
                <input
                  type="color"
                  name="borderColor"
                  value={buttonConfig.borderColor}
                  onChange={handleInputChange}
                  className="w-10 h-10 p-1 rounded cursor-pointer"
                />
                <input
                  type="text"
                  name="borderColor"
                  value={buttonConfig.borderColor}
                  onChange={handleInputChange}
                  className="ml-2 w-24 p-1 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Border Width</label>
              <input
                type="text"
                name="borderWidth"
                value={buttonConfig.borderWidth}
                onChange={handleInputChange}
                placeholder="e.g. 2px"
                className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Border Radius</label>
              <input
                type="text"
                name="borderRadius"
                value={buttonConfig.borderRadius}
                onChange={handleInputChange}
                placeholder="e.g. 8px"
                className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Padding</label>
              <input
                type="text"
                name="padding"
                value={buttonConfig.padding}
                onChange={handleInputChange}
                placeholder="e.g. 12px 24px"
                className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Font Size</label>
              <input
                type="text"
                name="fontSize"
                value={buttonConfig.fontSize}
                onChange={handleInputChange}
                placeholder="e.g. 16px"
                className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Font Family</label>
              <select
                name="fontFamily"
                value={buttonConfig.fontFamily}
                onChange={handleInputChange}
                className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                {fontFamilies.map(font => (
                  <option key={font} value={font}>{font.split(',')[0]}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Font Weight</label>
              <select
                name="fontWeight"
                value={buttonConfig.fontWeight}
                onChange={handleInputChange}
                className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                <option value="normal">Normal</option>
                <option value="bold">Bold</option>
                <option value="bolder">Bolder</option>
                <option value="lighter">Lighter</option>
                <option value="100">100</option>
                <option value="200">200</option>
                <option value="300">300</option>
                <option value="400">400</option>
                <option value="500">500</option>
                <option value="600">600</option>
                <option value="700">700</option>
                <option value="800">800</option>
                <option value="900">900</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Box Shadow</label>
            <input
              type="text"
              name="boxShadow"
              value={buttonConfig.boxShadow}
              onChange={handleInputChange}
              placeholder="e.g. 0 4px 6px rgba(0,0,0,0.1)"
              className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Animation</label>
              <select
                name="animationType"
                value={buttonConfig.animationType}
                onChange={handleInputChange}
                className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                {animationOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Icon</label>
              <select
                name="icon"
                value={buttonConfig.icon}
                onChange={handleInputChange}
                className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                {iconOptions.map(option => (
                  <option key={option.value || 'none'} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
          </div>

          {buttonConfig.icon && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Icon Position</label>
                <select
                  name="iconPosition"
                  value={buttonConfig.iconPosition}
                  onChange={handleInputChange}
                  className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                >
                  <option value="left">Left</option>
                  <option value="right">Right</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Icon Size</label>
                <input
                  type="text"
                  name="iconSize"
                  value={buttonConfig.iconSize}
                  onChange={handleInputChange}
                  placeholder="e.g. 16px"
                  className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-1">Background Image</label>
            <div className="flex gap-2">
              <input
                type="text"
                name="label"
                value={buttonConfig.label}
                onChange={handleInputChange}
                placeholder="Text for image generation"
                className="flex-1 p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              />
              <button
                onClick={generateImage}
                disabled={isGeneratingImage}
                className="py-2 px-4 rounded-md font-medium transition-colors flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white"
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
            </div>
            
            {buttonConfig.imageUrl && (
              <div className="mt-4">
                <div className="font-medium text-sm mb-1">Image Preview</div>
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
        </div>

        <div className="space-y-4">
          <div className="p-4 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800">
            <h3 className="text-lg font-medium mb-3 text-center">Live Preview</h3>
            <div className="flex justify-center">
              <button
                ref={previewRef}
                className="py-2 px-6 rounded-md font-medium transition-all duration-300 flex items-center justify-center gap-2"
                style={{
                  backgroundColor: buttonConfig.color,
                  color: buttonConfig.textColor,
                  backgroundImage: buttonConfig.imageUrl ? `url(${buttonConfig.imageUrl})` : 'none',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  border: `${buttonConfig.borderWidth} solid ${buttonConfig.borderColor}`,
                  borderRadius: buttonConfig.borderRadius,
                  padding: buttonConfig.padding,
                  fontSize: buttonConfig.fontSize,
                  fontFamily: buttonConfig.fontFamily,
                  fontWeight: buttonConfig.fontWeight,
                  boxShadow: buttonConfig.boxShadow,
                  animation: buttonConfig.animationType !== 'none' ? `${buttonConfig.animationType} 2s infinite` : 'none'
                }}
                title={buttonConfig.hoverText}
              >
                {buttonConfig.iconPosition === 'left' && buttonConfig.icon && (
                  <span style={{ fontSize: buttonConfig.iconSize }}>{buttonConfig.icon}</span>
                )}
                {buttonConfig.label || 'Your Button'}
                {buttonConfig.iconPosition === 'right' && buttonConfig.icon && (
                  <span style={{ fontSize: buttonConfig.iconSize }}>{buttonConfig.icon}</span>
                )}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <button
              className="w-full py-2 px-4 rounded-md font-medium transition-colors bg-green-600 hover:bg-green-700 text-white"
              onClick={downloadButton}
              disabled={isDownloading}
            >
              {isDownloading ? (
                <>
                  <span className="w-4 h-4 border-2 border-t-transparent border-current rounded-full animate-spin mr-2"></span>
                  Downloading...
                </>
              ) : (
                'Download HTML File'
              )}
            </button>

            <button
              className="w-full py-2 px-4 rounded-md font-medium transition-colors bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => setShowCode(!showCode)}
            >
              {showCode ? 'Hide Code' : 'Show Generated Code'}
            </button>

            <button
              className="w-full py-2 px-4 rounded-md font-medium transition-colors bg-gray-600 hover:bg-gray-700 text-white"
              onClick={resetForm}
            >
              Reset Form
            </button>

            {downloadLink && (
              <div className="text-center text-sm">
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

          {showCode && (
            <div className="mt-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-medium">Generated Code</h3>
                <button
                  onClick={copyToClipboard}
                  className="py-1 px-3 rounded text-sm bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
                >
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <textarea
                ref={codeRef}
                value={generateButtonCode()}
                readOnly
                className="w-full h-64 p-3 rounded border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-200 font-mono text-sm"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
