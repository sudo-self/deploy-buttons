import React, { useState } from 'react';
import { FaGithub, FaCashRegister } from 'react-icons/fa';

export default function CustomButtonBuilder() {
  const [showModal, setShowModal] = useState(true);

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center overflow-y-auto">
      <div className="bg-gray-900 rounded-xl shadow-lg max-w-2xl w-full mx-4 my-10 p-6 text-white relative overflow-y-auto max-h-[90vh]">
        <button
          onClick={() => setShowModal(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-red-400 text-xl"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold text-blue-400 mb-4">deploy.sudo-self.com</h2>

        <div className="space-y-4 text-gray-300 text-sm">
          <p>
            Generate custom deploy buttons for various platforms.
          </p>

          <p>
            Project maintained by <span className="text-white font-semibold">sudo-self</span>.
          </p>

          <div className="flex items-center space-x-4 pt-2">
            <a
              href="https://github.com/sudo-self/repo-buttons"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 hover:text-white text-gray-400"
            >
              <FaGithub size={18} />
              <span>GitHub</span>
            </a>

            <a
              href="https://cash.app/$ilostmyipad"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 hover:text-green-400 text-gray-400"
            >
              <FaCashRegister size={18} />
              <span>Donate</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

