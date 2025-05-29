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

  const deployUrl = `${form.baseUrl}/${username}/${repo}`;
  const badgeUrl = `https://img.shields.io/badge/${encodeURIComponent(
    form.buttonText.replaceAll(' ', '_')
  )}-${form.color.replace('#', '')}?logo=${form.badgeLogo}&logoColor=white&style=for-the-badge`;

  const cardObject = {
    id: form.id,
    name: form.name,
    logo: form.logo,
    color: form.color,
    deployUrl: (username: string, repo: string) =>
      `${form.baseUrl}/${username}/${repo}`,
    buttonMarkdown: (username: string, repo: string) =>
      `[![${form.buttonText}](${badgeUrl})](${form.baseUrl}/${username}/${repo})`,
    buttonHtml: (username: string, repo: string) =>
      `<a href="${form.baseUrl}/${username}/${repo}"><img src="${badgeUrl}" alt="${form.buttonText}"></a>`,
  };

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
            className="p-2 border rounded"
          />
        ))}
        <input
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="GitHub Username"
          className="p-2 border rounded"
        />
        <input
          name="repo"
          value={repo}
          onChange={(e) => setRepo(e.target.value)}
          placeholder="GitHub Repo"
          className="p-2 border rounded"
        />
      </div>

      <pre className="bg-gray-100 p-4 rounded text-xs overflow-x-auto">
        {JSON.stringify(cardObject, null, 2)}
      </pre>

      <div className="pt-4">
        <a href={deployUrl} target="_blank" rel="noopener noreferrer">
          <img src={badgeUrl} alt={form.buttonText} />
        </a>
      </div>
    </div>
  );
};

export default DeployCardConfigurator;
