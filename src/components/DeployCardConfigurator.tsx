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
    id: 'vercel',
    name: 'Vercel',
    logo: 'Vercel',
    color: '#000000',
    baseUrl: 'https://vercel.com/new/clone?repository-url=https://github.com/',
    buttonText: 'Deploy with Vercel',
    badgeLogo: 'vercel',
  });

  const [username, setUsername] = useState<string>('your-username');
  const [repo, setRepo] = useState<string>('your-repo');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
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
    <div className="max-w-xl mx-auto p-4 space-y-4">
      <h2 className="text-xl font-semibold">Deploy Card Configurator</h2>

      <div className="grid grid-cols-2 gap-4">
        {(
          Object.keys(form) as (keyof DeployForm)[]
        ).map((field) => (
          <div key={field} className="flex flex-col space-y-1">
            <label htmlFor={field} className="text-sm text-gray-700">
              {field}
            </label>
            <input
              id={field}
              name={field}
              value={form[field]}
              onChange={handleChange}
              className="p-2 border rounded text-black dark:text-white"
            />
          </div>
        ))}
        <div className="flex flex-col space-y-1">
          <label htmlFor="username" className="text-sm text-gray-700">
            GitHub Username
          </label>
          <input
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="p-2 border rounded text-black dark:text-white"
          />
        </div>
        <div className="flex flex-col space-y-1">
          <label htmlFor="repo" className="text-sm text-gray-700">
            GitHub Repo
          </label>
          <input
            id="repo"
            name="repo"
            value={repo}
            onChange={(e) => setRepo(e.target.value)}
            className="p-2 border rounded text-black dark:text-white"
          />
        </div>
      </div>

      <h3 className="text-lg font-semibold mt-6">Live Preview</h3>
      <div className="border p-4 rounded shadow-lg mt-4">
        <div className="flex flex-col space-y-2">
          {/* Render the deploy button directly here */}
          <a
            href={deployUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 border rounded bg-blue-500 text-white"
          >
            {form.buttonText}
          </a>

          <h4 className="font-medium mt-4">Generated Code</h4>
          <div className="overflow-auto max-h-60">
            <pre className="text-sm bg-gray-100 p-2 rounded whitespace-pre-wrap break-words">
              {`{
  id: '${platform.id}',
  name: '${platform.name}',
  logo: '${platform.logo}',
  color: '${platform.color}',
  deployUrl: (username: string, repo: string) => 
    \`${platform.deployUrl(username, repo)}\`,
  buttonMarkdown: (username: string, repo: string) => 
    \`[![Deploy with ${platform.name}](${badgeUrl})](${deployUrl})\`,
  buttonHtml: (username: string, repo: string) => 
    \`<a href="\${${deployUrl}}"><img src="\${${badgeUrl}}" alt="Deploy with ${platform.name}"></a>\`
}`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeployCardConfigurator;



