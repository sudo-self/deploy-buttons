import React, { useState, ChangeEvent } from 'react';

interface DeployForm {
  id: string;
  name: string;
  logo: string;
  color: string;
  baseUrl: string;
  buttonText: string;
  badgeLogo: string;
}

const DeployCardConfigurator: React.FC = () => {
  const [form, setForm] = useState<DeployForm>({
    id: '', 
    name: '', 
    logo: '', 
    color: '#000000', 
    baseUrl: '', 
    buttonText: 'Deploy', 
    badgeLogo: '', 
  });

  const [username, setUsername] = useState<string>('');
  const [repo, setRepo] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !repo.trim()) {
      setError('Both username and repository name are required');
      return;
    }
    setError('');
  };

  // Generate the deploy URL based on the form and user input
  const deployUrl = `${form.baseUrl}${username}/${repo}`;
  const badgeUrl = `https://img.shields.io/badge/${encodeURIComponent(
    form.buttonText.replaceAll(' ', '_')
  )}-${form.color.replace('#', '')}?logo=${form.badgeLogo}&logoColor=white&style=for-the-badge`;

  // The output format based on user input
  const platform = {
    id: form.id,
    name: form.name,
    logo: form.logo,
    color: form.color,
    deployUrl: (username: string, repo: string) =>
      `${form.baseUrl}${username}/${repo}`,
    buttonMarkdown: (username: string, repo: string) =>
      `[![${form.buttonText}](${badgeUrl})](${deployUrl})`,
    buttonHtml: (username: string, repo: string) =>
      `<a href="${deployUrl}"><img src="${badgeUrl}" alt="${form.buttonText}"></a>`,
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-gray-800 rounded-lg shadow-xl overflow-hidden transform transition-all hover:shadow-2xl duration-300">
      <div className="px-6 py-8">
        <div className="flex items-center justify-center mb-6">
          <h2 className="text-2xl font-bold text-white">Custom Deploy Button Config</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-1">
              GitHub Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
            />
          </div>

          <div>
            <label htmlFor="repo" className="block text-sm font-medium text-gray-300 mb-1">
              Repository Name
            </label>
            <input
              type="text"
              id="repo"
              name="repo"
              value={repo}
              onChange={(e) => setRepo(e.target.value)}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
            />
          </div>

          <div>
            <label htmlFor="buttonText" className="block text-sm font-medium text-gray-300 mb-1">
              Button Text
            </label>
            <input
              type="text"
              id="buttonText"
              name="buttonText"
              value={form.buttonText}
              onChange={handleChange}
              placeholder="Button Text"
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
            />
          </div>

          <div>
            <label htmlFor="logo" className="block text-sm font-medium text-gray-300 mb-1">
              Button Logo
            </label>
            <input
              type="text"
              id="logo"
              name="logo"
              value={form.logo}
              onChange={handleChange}
              placeholder="Logo Name"
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
            />
          </div>

          <div>
            <label htmlFor="color" className="block text-sm font-medium text-gray-300 mb-1">
              Button Color
            </label>
            <input
              type="color"
              id="color"
              name="color"
              value={form.color}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
            />
          </div>

          <div>
            <label htmlFor="badgeLogo" className="block text-sm font-medium text-gray-300 mb-1">
              Badge Logo (Optional)
            </label>
            <input
              type="text"
              id="badgeLogo"
              name="badgeLogo"
              value={form.badgeLogo}
              onChange={handleChange}
              placeholder="Badge Logo"
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
            />
          </div>

          {error && (
            <div className="text-red-400 text-sm py-2 px-3 bg-red-900/30 rounded-md">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 transform hover:scale-[1.02]"
          >
            Generate Deploy Button
          </button>
        </form>

        <h3 className="text-lg font-semibold mt-6 text-white">Live Preview</h3>
        <div className="border p-4 rounded shadow-lg mt-4 bg-gray-700 text-white">
          <a
            href={deployUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 border rounded bg-indigo-600 text-white"
          >
            {form.buttonText}
          </a>

          <h4 className="font-medium mt-4">Generated Code</h4>
          <div className="overflow-auto max-h-60">
            <pre className="text-sm bg-gray-800 p-2 rounded whitespace-pre-wrap break-words">
              {`{
  id: '${platform.id}',
  name: '${platform.name}',
  logo: '${platform.logo}',
  color: '${platform.color}',
  deployUrl: (username: string, repo: string) => 
    \`${platform.deployUrl(username, repo)}\`,
  buttonMarkdown: (username: string, repo: string) => 
    \`[![${platform.buttonText}](${badgeUrl})](${deployUrl})\`,
  buttonHtml: (username: string, repo: string) => 
    \`<a href="\${${deployUrl}}"><img src="\${${badgeUrl}}" alt="${platform.buttonText}"></a>\`
}`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeployCardConfigurator;






