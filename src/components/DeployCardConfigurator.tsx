import { useState } from 'react';

export default function AboutModal() {
  const [showModal, setShowModal] = useState(true);

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center overflow-y-auto">
      <div className="bg-gray-900 rounded-xl shadow-lg max-w-xl w-full mx-4 my-10 p-6 text-white relative overflow-y-auto max-h-[90vh]">
        <button
          onClick={() => setShowModal(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-red-400 text-xl"
          aria-label="Close"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold mb-4">Hello World!</h2>

        <p className="mb-4">
          Welcome to the Deploy Button Builder — a utility for generating deployment markdown and buttons,
          developed by <span className="font-semibold">sudo-self</span>.
        </p>

        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <i className="fa-brands fa-github text-white text-lg" aria-hidden="true"></i>
            <a
              href="https://github.com/sudo-self/repo-buttons"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline text-blue-400"
            >
              Source Code
            </a>
          </div>

      <div className="flex items-center space-x-2">
  <i className="fa-solid fa-dollar-sign text-green-500 text-lg" aria-hidden="true"></i>
  <a
    href="https://cash.app/$ilostmyipod"
    target="_blank"
    rel="noopener noreferrer"
    className="hover:underline text-green-400"
  >
    Donations
  </a>
</div>

<p>BTC: 32WfTVZTzoJXSTdgfLer1Ad3SMVvjokkbX</p>
<p>ETH: 0xc0b2C8d8d63C333767Ce3Fad48649A6a14aE2037</p>

        </div>
      </div>
    </div>
  );
}




