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

  // Generate the deploy URL based on the form and user input
  const deployUrl = `${form.baseUrl}/${username}/${repo}`;
  const badgeUrl = `https://img.shields.io/badge/${encodeURIComponent(
    form.buttonText.replaceAll(' ', '_')
  )}-${form.color.replace('#', '')}?logo=${form.badgeLogo}&logoColor=white&style=for-the-badge`;

  return (
    <div className="max-w-xl mx-auto p-4 space-y-4">
      <h2 className="text-xl font-semibold">Deploy Card Configurator</h2>

      <div className="grid grid-cols-2 gap-4">
        {(
          Object.keys(form) as (keyof DeployForm)[]
        ).map((field) => (
          <input
            key={field}
            name={field}
            value={form[field]}
            onChange={handleChange}
            placeholder={field}
            className="p-2 border rounded text-black dark:text-white"
          />
        ))}
        <input
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="GitHub Username"
          className="p-2 border rounded text-black dark:text-white"
        />
        <input
          name="repo"
          value={repo}
          onChange={(e) => setRepo(e.target.value)}
          placeholder="GitHub Repo"
          className="p-2 border rounded text-black dark:text-white"
        />
      </div>

      <h3 className="text-lg font-semibold mt-6">Live Preview</h3>
      <div className="border p-4 rounded shadow-lg mt-4">
        {/* Render the deploy button directly here */}
        <div className="flex flex-col space-y-2">
          <a
            href={deployUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 border rounded bg-blue-500 text-white"
          >
            {form.buttonText}
          </a>
          <pre className="text-sm bg-gray-100 p-2 rounded">
            {`[![${form.buttonText}](${badgeUrl})](${deployUrl})`}
          </pre>
          <pre className="text-sm bg-gray-100 p-2 rounded">
            {`<a href="${deployUrl}"><img src="${badgeUrl}" alt="${form.buttonText}"></a>`}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default DeployCardConfigurator;

