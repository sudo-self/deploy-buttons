import React, { useState } from 'react';

export default function CustomButtonBuilder() {
  const [form, setForm] = useState({
    id: '',
    name: '',
    logo: '',
    color: '#000000',
    baseUrl: '',
    buttonText: 'Deploy',
    badgeLogo: '',
  });

  const [username, setUsername] = useState('');
  const [repo, setRepo] = useState('');
  const [copied, setCopied] = useState(false);
  const [showModal, setShowModal] = useState(true);

  const deployUrl = `${form.baseUrl}${username}/${repo}`;
  const badgeUrl = `https://img.shields.io/badge/${encodeURIComponent(
    form.buttonText.replaceAll(' ', '_')
  )}-${form.color.replace('#', '')}?logo=${form.badgeLogo}&logoColor=white&style=for-the-badge`;

  const buttonMarkdown = `[![${form.buttonText}](${badgeUrl})](${deployUrl})`;
  const buttonHtml = `<a href="${deployUrl}"><img src="${badgeUrl}" alt="${form.buttonText}"></a>`;

  const codeBlock = `{
  id: '${form.id}',
  name: '${form.name}',
  logo: '${form.logo}',
  color: '${form.color}',
  deployUrl: (username, repo) => \`${form.baseUrl}\${username}/\${repo}\`,
  buttonMarkdown: (username, repo) => \`[![${form.buttonText}](${badgeUrl})](${deployUrl})\`,
  buttonHtml: (username, repo) => \`<a href="${deployUrl}"><img src="${badgeUrl}" alt="${form.buttonText}"></a>\`
}`;

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(codeBlock);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const downloadJson = () => {
    const json = {
      ...form,
      deployUrl: `${form.baseUrl}{username}/{repo}`,
    };
    const blob = new Blob([JSON.stringify(json, null, 2)], {
      type: 'application/json',
    });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'deploy-button-config.json';
    a.click();
  };

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

      {/* About Section */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-blue-400 mb-2">About This Tool</h2>
        <p className="text-gray-300">
          Hi, I'm Jesse — an Army veteran and IT pro who builds tools for devs like this one.
          Use this builder to instantly generate a deploy badge and markdown/HTML snippet
          for your GitHub-based cloud deployment platform.
        </p>
        <p className="text-gray-500 text-sm mt-2">
          ⚡ Supports custom logos, text, base URLs, and button colors. Export as JSON or copy code directly.
        </p>
      </div>

      <h2 className="text-2xl font-bold mb-4">Custom Deploy Button Builder</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* ...keep rest of your form and preview exactly as you had... */}

    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center overflow-y-auto">
      <div className="bg-gray-900 rounded-xl shadow-lg max-w-3xl w-full mx-4 my-10 p-6 text-white relative overflow-y-auto max-h-[90vh]">
        <button
          onClick={() => setShowModal(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-red-400 text-xl"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold mb-4">Custom Deploy Button Builder</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            {[
              ['GitHub Username', username, setUsername, 'username'],
              ['Repository Name', repo, setRepo, 'repo'],
              ['Platform ID', form.id, (val: string) => setForm({ ...form, id: val }), 'id'],
              ['Platform Name', form.name, (val: string) => setForm({ ...form, name: val }), 'name'],
              ['Platform Logo', form.logo, (val: string) => setForm({ ...form, logo: val }), 'logo'],
              ['Base Deploy URL', form.baseUrl, (val: string) => setForm({ ...form, baseUrl: val }), 'baseUrl'],
              ['Button Text', form.buttonText, (val: string) => setForm({ ...form, buttonText: val }), 'buttonText'],
              ['Badge Logo', form.badgeLogo, (val: string) => setForm({ ...form, badgeLogo: val }), 'badgeLogo'],
            ].map(([label, value, setter, name]) => (
              <div key={name}>
                <label className="block text-sm font-medium text-gray-300 mb-1">{label}</label>
                <input
                  type="text"
                  name={name as string}
                  value={value as string}
                  onChange={(e) => setter(e.target.value)}
                  className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700 text-white"
                />
              </div>
            ))}

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Button Color</label>
              <input
                type="color"
                value={form.color}
                onChange={(e) => setForm({ ...form, color: e.target.value })}
                className="w-full h-10 rounded bg-gray-800 border border-gray-700"
              />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Live Preview</h3>
            <div className="p-3 bg-gray-800 rounded mb-4">
              <a href={deployUrl} target="_blank" rel="noopener noreferrer">
                <img src={badgeUrl} alt={form.buttonText} />
              </a>
            </div>

            <h3 className="text-lg font-semibold mb-2">Generated Code</h3>
            <pre className="bg-black p-3 rounded text-xs whitespace-pre-wrap max-h-[250px] overflow-auto border border-gray-700">
              {codeBlock}
            </pre>

            <div className="mt-4 flex space-x-3">
              <button
                onClick={copyToClipboard}
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
              >
                {copied ? 'Copied!' : 'Copy Code'}
              </button>

              <button
                onClick={downloadJson}
                className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
              >
                Download JSON
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}






