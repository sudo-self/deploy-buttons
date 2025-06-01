import React, { useState, useRef } from 'react';

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
  { value: 'shake', label: 'Shake' },
];

export function ButtonCreator() {
  const [buttonConfig, setButtonConfig] = useState<ButtonConfig>({
    label: 'Click Me',
    imageUrl: '',
    borderColor: '#000000',
    animationType: 'none',
    link: 'https://example.com',
  });

  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const previewRef = useRef<HTMLAnchorElement>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setButtonConfig((prev) => ({ ...prev, [name]: value }));
  };

    const generateImage = async () => {
      if (!buttonConfig.label.trim()) {
        alert('Please enter button text first');
        return;
      }

      setIsGeneratingImage(true);
      try {
        const response = await fetch(
          `https://text-to-image.jessejesse.workers.dev?prompt=${encodeURIComponent(buttonConfig.label)}`
        );

        if (!response.ok) throw new Error('Image generation failed');
        const blob = await response.blob();
        const imageUrl = URL.createObjectURL(blob);

      
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64 = reader.result as string;
          setButtonConfig((prev) => ({ ...prev, imageUrl: base64 }));
        };
        reader.readAsDataURL(blob);
      } catch (error) {
        alert('Image generation failed.');
      } finally {
        setIsGeneratingImage(false);
      }
    };


    const generateButtonCode = () => {
      const anim = buttonConfig.animationType;
      const hasImage = buttonConfig.imageUrl?.trim();
      const style = `
        <style>
          @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
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
          body {
            margin: 0;
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #f9fafb;
          }
          .custom-button {
            display: inline-block;
            padding: 12px 24px;
            border-radius: 8px;
            border: 2px solid ${buttonConfig.borderColor};
            color: white;
            font-weight: bold;
            cursor: pointer;
            text-decoration: none;
            ${hasImage ? `background: url('${buttonConfig.imageUrl}') center / cover no-repeat;` : 'background: #4f46e5;'}
            ${anim !== 'none' ? `animation: ${anim} 1s infinite;` : ''}
          }
        </style>
      `;

      return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <title>Custom Button</title>
          ${style}
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
    const html = generateButtonCode();
    const blob = new Blob([html], { type: 'text/html' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'button.html';
    link.click();
  };

  return (
    <div className="max-w-xl mx-auto p-6 rounded-xl bg-white dark:bg-gray-900 shadow-lg">
      <style>
        {`
          @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
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
        `}
      </style>

      <h2 className="text-2xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-green-500 via-cyan-500 to-indigo-500">
        Create Image Button
      </h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Enter a prompt to generate button image
          </label>
          <input
            name="label"
            value={buttonConfig.label}
            onChange={handleInputChange}
            className="w-full mt-1 p-2 rounded border dark:bg-gray-800 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Link button will open on-click
          </label>
          <input
            name="link"
            value={buttonConfig.link}
            onChange={handleInputChange}
            className="w-full mt-1 p-2 rounded border dark:bg-gray-800 dark:text-white"
          />
        </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Border Color
            </label>
            <div className="flex items-center gap-2 mt-1">
              <input
                type="color"
                name="borderColor"
                value={buttonConfig.borderColor}
                onChange={handleInputChange}
                className="w-10 h-10 rounded"
              />
              <span className="px-2 py-1 text-xs font-mono rounded border border-gray-300 dark:border-gray-600 dark:text-white">
                {buttonConfig.borderColor}
              </span>
            </div>
          </div>


        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Animation
          </label>
          <select
            name="animationType"
            value={buttonConfig.animationType}
            onChange={handleInputChange}
            className="w-full mt-1 p-2 rounded border dark:bg-gray-800 dark:text-white"
          >
            {animationOptions.map((a) => (
              <option key={a.value} value={a.value}>
                {a.label}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={generateImage}
          disabled={isGeneratingImage}
          className="w-full mt-4 p-3 bg-indigo-600 text-white font-semibold rounded hover:bg-indigo-700 disabled:opacity-50"
        >
          {isGeneratingImage ? 'Generating...' : 'Generate Background Image'}
        </button>

        {buttonConfig.imageUrl && (
          <img
            src={buttonConfig.imageUrl}
            alt="Background"
            className="w-full h-32 object-cover rounded border"
          />
        )}

        <div className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600">
          <h3 className="text-center font-medium mb-2 dark:text-white">Live Preview</h3>
          <div className="flex justify-center">
            <a
              href={buttonConfig.link}
              ref={previewRef}
              className="px-6 py-3 rounded-lg font-semibold text-white"
              style={{
                border: `2px solid ${buttonConfig.borderColor}`,
                background: buttonConfig.imageUrl
                  ? `url(${buttonConfig.imageUrl}) center/cover`
                  : '#4f46e5',
                animation:
                  buttonConfig.animationType !== 'none'
                    ? `${buttonConfig.animationType} 1s infinite`
                    : undefined,
              }}
            >
              {buttonConfig.label}
            </a>
          </div>
        </div>

        <button
          onClick={downloadButton}
          className="w-full p-3 mt-4 bg-green-700 text-white rounded font-semibold hover:bg-pink-700"
        >
          Download
        </button>
      </div>
    </div>
  );
}
