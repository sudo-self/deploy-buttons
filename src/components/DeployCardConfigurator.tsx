import React, { useState } from 'react';

import React, { useState } from 'react';

export default function CustomButtonBuilder() {
  const [showModal, setShowModal] = useState(true);

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center overflow-y-auto">
      <div className="bg-gray-900 rounded-xl shadow-lg max-w-3xl w-full mx-4 my-10 p-6 text-white relative overflow-y-auto max-h-[90vh]">
        <button
          onClick={() => setShowModal(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-red-400 text-xl"
        >
          &times;
        </button>

        <h2 className="text-3xl font-bold text-blue-400 mb-4">Custom Deploy Button Builder</h2>

        <div className="space-y-4 text-gray-300">
          <p>
            Hey, I’m Jesse — an Army veteran and IT professional with a background in full-stack
            development, network security, and automation. I build tools like this to help
            developers deploy faster and smarter.
          </p>
          <p>
            This modal originally hosted a custom button builder, but now serves as an "About Me"
            section while preserving the project's styling and branding.
          </p>
          <p>
            I specialize in:
          </p>
          <ul className="list-disc list-inside ml-2 text-gray-400">
            <li>React/Next.js apps</li>
            <li>Cloudflare Workers & Firebase</li>
            <li>Dev tools, automation, and SEO utilities</li>
            <li>Building fast, accessible UIs with Tailwind CSS</li>
          </ul>
          <p>
            Feel free to check out my latest projects or connect with me:
          </p>
          <div className="space-x-3 mt-2">
            <a
              href="https://github.com/sudo-self/repo-buttons"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-4 py-2 bg-gray-800 border border-gray-700 rounded hover:bg-gray-700"
            >
              GitHub
            </a>
            <a
              href="mailto:rop20038@intellitec.edu"
              className="inline-block px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded"
            >
              Email Me
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
