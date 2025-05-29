import React, { useState, ChangeEvent } from 'react';
import DeployButton from './DeployButton';

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
    id: 'replit',
    name: 'Replit',
    logo: 'Zap',
    color: '#667881',
    baseUrl: 'https://replit.com/github',
    buttonText: 'Run on Replit',
    badgeLogo: 'replit',
  });

  const [username, setUsername] = useState<string>('your-username');
  const [repo, setRepo] = useState<string>('your-repo');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  // Generate based on user input
  const deployUrl = `${form.baseUrl}/${username}/${repo}`;
  const badgeUrl = `https://img.shields.io/badge/${encodeURIComponent(
    form.buttonText.replaceAll(' ', '_')
  )}-${form.color.replace('#', '')}?logo=${form.badgeLogo}&logoColor=white&style=for-the-badge`;

  const platform = {
    id: form.id,
    name: form.name,
    logo: form.logo,
    color: form.color,
    baseUrl: form.baseUrl,
    buttonText: form.buttonText,
    badgeLogo: form.badgeLogo,
    deployUrl: deployUrl,
    buttonMarkdown: (username: string, repo: string) =>
      `[![${form.buttonText}](${badgeUrl})](${deployUrl})`,
    buttonHtml: (username: string, repo: string) =>
      `<a href="${deployUrl}"><img src="${badgeUrl}" alt="${form.buttonText}"></a>`,
  };

  return (
    <div className="max-w-xl mx-auto p-4 space-y-4">
      <h2 className="text-xl font-semibold">Deploy Card Configurator</h2>

      <div className="grid grid-cols-2 gap-4">
      
        {(
          Object.keys(form) as (keyof DeployForm)[]
        ).map((field) => (
          <div key={field} className="flex flex-col space-y-2">
            <label htmlFor={field} className="text-sm font-medium">{field}</label>
            <input
              id={field}
              name={field}
              value={form[field as keyof DeployForm]}
              onChange={handleChange}
              placeholder={field}
              className="p-2 border rounded text-black dark:text-white"
            />
          </div>
        ))}

        {/* Additional fields for username and repo */}
        <div className="flex flex-col space-y-2">
          <label htmlFor="username" className="text-sm font-medium">GitHub Username</label>
          <input
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="GitHub Username"
            className="p-2 border rounded text-black dark:text-white"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="repo" className="text-sm font-medium">GitHub Repo</label>
          <input
            id="repo"
            name="repo"
            value={repo}
            onChange={(e) => setRepo(e.target.value)}
            placeholder="GitHub Repo"
            className="p-2 border rounded text-black dark:text-white"
          />
        </div>
      </div>

      <h3 className="text-lg font-semibold mt-6">Live Preview</h3>
      <div className="border p-4 rounded shadow-lg mt-4">
        {/* Display a single deploy card preview */}
        <DeployButton
          platform={platform}
          username={username}
          repo={repo}
        />
      </div>
    </div>
  );
};

export default DeployCardConfigurator;



