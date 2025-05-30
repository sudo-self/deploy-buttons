import React, { useState } from 'react';

declare global {
  interface Window {
    FloaterButton: any;
  }
}

export const FloaterButtonConfigurator: React.FC = () => {
  const [iframeUrl, setIframeUrl] = useState('');
  const [tooltip, setTooltip] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loaded, setLoaded] = useState(false);
  const [downloadLink, setDownloadLink] = useState<string | null>(null);

  const handleCreateButton = () => {
    if (!iframeUrl || !tooltip || !imageUrl) return;

    const scriptContent = `
      class FloaterButton {
        constructor(options = {}) {
          this.buttonId = options.buttonId || 'btn-qrtdogd-floating-button';
          this.popupId = options.popupId || 'btn-qrtdogd-popup';
          this.tooltipText = options.tooltipText || 'Floater B.';
          this.iframeSrc = options.iframeSrc || 'https://floater.jessejesse.xyz';
          this.imageUrl = options.imageUrl;

          this.createStyles();
          this.createButton();
          this.createPopup();
          this.createTooltip();
          this.attachEventListeners();
        }

        createStyles() {
          const style = document.createElement('style');
          style.innerHTML = \`
            .btn-qrtdogd-floating-button {
              position: fixed;
              bottom: 20px;
              right: 20px;
              display: flex;
              justify-content: center;
              align-items: center;
              cursor: pointer;
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
              transition: background-color 0.3s ease;
              z-index: 1000;
              border-radius: 50%;
              width: 60px;
              height: 60px;
              background-image: url('\${this.imageUrl}');
              background-size: cover;
              background-position: center;
              background-repeat: no-repeat;
            }
            .btn-qrtdogd-floating-button:hover {
              background-color: rgba(75, 0, 130, 0.8);
            }
            .btn-qrtdogd-popup {
              display: none;
              position: fixed;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              width: 80%;
              max-width: 600px;
              background-color: #2d3748;
              color: #e5e7eb;
              padding: 20px;
              border-radius: 8px;
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
              z-index: 1001;
              box-sizing: border-box;
            }
            .btn-qrtdogd-popup iframe {
              width: 100%;
              height: 400px;
              border: none;
              display: block;
            }
            .btn-qrtdogd-close-button {
              position: absolute;
              top: 10px;
              right: 10px;
              background-color: #e74c3c;
              border: none;
              color: #ffffff;
              border-radius: 50%;
              width: 30px;
              height: 30px;
              display: flex;
              justify-content: center;
              align-items: center;
              cursor: pointer;
              font-size: 16px;
            }
            .btn-qrtdogd-tooltip {
              position: absolute;
              background-color: #333;
              color: #f8f8f2;
              border-radius: 5px;
              padding: 5px 10px;
              font-size: 12px;
              white-space: nowrap;
              opacity: 0;
              transition: opacity 0.3s ease;
              pointer-events: none;
              z-index: 1001;
              bottom: 100%;
              left: 50%;
              transform: translateX(-50%);
              margin-bottom: 10px;
            }
            .btn-qrtdogd-tooltip.visible {
              opacity: 1;
            }
          \`;
          document.head.appendChild(style);
        }

        createButton() {
          this.button = document.createElement('div');
          this.button.id = this.buttonId;
          this.button.className = 'btn-qrtdogd-floating-button';
          document.body.appendChild(this.button);
        }

        createPopup() {
          this.popup = document.createElement('div');
          this.popup.id = this.popupId;
          this.popup.className = 'btn-qrtdogd-popup';
          this.popup.innerHTML = \`
            <button class="btn-qrtdogd-close-button">×</button>
            <iframe src="\${this.iframeSrc}" title="Floater Content"></iframe>
          \`;
          document.body.appendChild(this.popup);
        }

        createTooltip() {
          this.tooltip = document.createElement('div');
          this.tooltip.className = 'btn-qrtdogd-tooltip';
          this.tooltip.innerText = this.tooltipText;
          this.button.appendChild(this.tooltip);
        }

        attachEventListeners() {
          this.button.addEventListener('click', () => this.openPopup());
          this.button.addEventListener('touchend', (e) => {
            e.preventDefault();
            this.openPopup();
          });

          document.querySelector(\`#\${this.popupId} .btn-qrtdogd-close-button\`)?.addEventListener('click', () => this.closePopup());

          this.button.addEventListener('mouseover', () => {
            this.tooltip.classList.add('visible');
          });
          this.button.addEventListener('mouseout', () => {
            this.tooltip.classList.remove('visible');
          });

          this.button.addEventListener('mousedown', (e) => this.startDrag(e));
          this.button.addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.startDrag(e);
          });
        }

        openPopup() {
          if (this.popup) this.popup.style.display = 'block';
        }

        closePopup() {
          if (this.popup) this.popup.style.display = 'none';
        }

        startDrag(e) {
          this.isDragging = true;
          const clientX = e.clientX || e.touches[0].clientX;
          const clientY = e.clientY || e.touches[0].clientY;
          this.offsetX = clientX - this.button.getBoundingClientRect().left;
          this.offsetY = clientY - this.button.getBoundingClientRect().top;
          document.addEventListener('mousemove', (e) => this.onMouseMove(e));
          document.addEventListener('mouseup', () => this.onMouseUp());
          document.addEventListener('touchmove', (e) => this.onTouchMove(e));
          document.addEventListener('touchend', () => this.onTouchEnd());
        }

        onMouseMove(e) {
          if (!this.isDragging) return;
          const newLeft = e.clientX - this.offsetX;
          const newTop = e.clientY - this.offsetY;
          this.button.style.left = \`\${newLeft}px\`;
          this.button.style.top = \`\${newTop}px\`;
        }

        onMouseUp() {
          this.isDragging = false;
        }

        onTouchMove(e) {
          if (!this.isDragging) return;
          const touch = e.touches[0];
          const newLeft = touch.clientX - this.offsetX;
          const newTop = touch.clientY - this.offsetY;
          this.button.style.left = \`\${newLeft}px\`;
          this.button.style.top = \`\${newTop}px\`;
        }

        onTouchEnd() {
          this.isDragging = false;
        }
      }

      new FloaterButton({
        tooltipText: "${tooltip}",
        iframeSrc: "${iframeUrl}",
        imageUrl: "${imageUrl}"
      });
    `;

    const script = document.createElement('script');
    script.innerHTML = scriptContent;
    document.body.appendChild(script);

    const blob = new Blob([scriptContent], { type: 'application/javascript' });
    const url = URL.createObjectURL(blob);
    setDownloadLink(url);
    setLoaded(true);
  };

  return (
    <div className="dark:bg-gray-900 dark:text-gray-200 p-6 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
        Floater Button Generator
      </h2>
      <div className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Enter website URL"
          value={iframeUrl}
          onChange={(e) => setIframeUrl(e.target.value)}
          className="p-2 rounded bg-gray-800 text-white placeholder-gray-400"
        />
        <input
          type="text"
          placeholder="Title"
          value={tooltip}
          onChange={(e) => setTooltip(e.target.value)}
          className="p-2 rounded bg-gray-800 text-white placeholder-gray-400"
        />
        <input
          type="text"
          placeholder="Enter image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="p-2 rounded bg-gray-800 text-white placeholder-gray-400"
        />
        <button
          onClick={handleCreateButton}
          className="mt-2 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded"
        >
          Create Button
        </button>
        {loaded && downloadLink && (
          <a
            href={downloadLink}
            download="floater-button.js"
            className="text-indigo-400 text-sm mt-2 inline-block"
          >
            Download Button
          </a>
        )}
        {loaded && (
          <div className="mt-4">
            <h3 className="text-sm font-semibold">Add the button</h3>
            <code className="text-sm block mt-1">
              {'<script src="./floater-button.js"></script>'}
            </code>
          </div>
        )}
        {loaded && (
          <p className="text-cyan-500 text-sm mt-2">Floater added to page!</p>
        )}
      </div>
    </div>
  );
};





