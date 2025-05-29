import { DeployPlatform } from '../types';

export const deployPlatforms: DeployPlatform[] = [
  {
    id: 'netlify',
    name: 'Netlify',
    logo: 'Netlify',
    color: '#00AD9F',
    deployUrl: (username: string, repo: string) => 
      `https://app.netlify.com/start/deploy?repository=https://github.com/${username}/${repo}`,
    buttonMarkdown: (username: string, repo: string) => 
      `[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/${username}/${repo})`,
    buttonHtml: (username: string, repo: string) => 
      `<a href="https://app.netlify.com/start/deploy?repository=https://github.com/${username}/${repo}"><img src="https://www.netlify.com/img/deploy/button.svg" alt="Deploy to Netlify"></a>`
  },
  {
    id: 'vercel',
    name: 'Vercel',
    logo: 'Vercel',
    color: '#000000',
    deployUrl: (username: string, repo: string) => 
      `https://vercel.com/new/clone?repository-url=https://github.com/${username}/${repo}`,
    buttonMarkdown: (username: string, repo: string) => 
      `[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/${username}/${repo})`,
    buttonHtml: (username: string, repo: string) => 
      `<a href="https://vercel.com/new/clone?repository-url=https://github.com/${username}/${repo}"><img src="https://vercel.com/button" alt="Deploy with Vercel"></a>`
  },
  {
    id: 'heroku',
    name: 'Heroku',
    logo: 'Cpu',
    color: '#430098',
    deployUrl: (username: string, repo: string) => 
      `https://heroku.com/deploy?template=https://github.com/${username}/${repo}`,
    buttonMarkdown: (username: string, repo: string) => 
      `[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/${username}/${repo})`,
    buttonHtml: (username: string, repo: string) => 
      `<a href="https://heroku.com/deploy?template=https://github.com/${username}/${repo}"><img src="https://www.herokucdn.com/deploy/button.svg" alt="Deploy to Heroku"></a>`
  },
  {
    id: 'railway',
    name: 'Railway',
    logo: 'Train',
    color: '#0B0D0E',
    deployUrl: (username: string, repo: string) => 
      `https://railway.app/new/template?template=https://github.com/${username}/${repo}`,
    buttonMarkdown: (username: string, repo: string) => 
      `[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template?template=https://github.com/${username}/${repo})`,
    buttonHtml: (username: string, repo: string) => 
      `<a href="https://railway.app/new/template?template=https://github.com/${username}/${repo}"><img src="https://railway.app/button.svg" alt="Deploy on Railway"></a>`
  },
  {
    id: 'render',
    name: 'Render',
    logo: 'Activity',
    color: '#46E3B7',
    deployUrl: (username: string, repo: string) => 
      `https://render.com/deploy?repo=https://github.com/${username}/${repo}`,
    buttonMarkdown: (username: string, repo: string) => 
      `[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/${username}/${repo})`,
    buttonHtml: (username: string, repo: string) => 
      `<a href="https://render.com/deploy?repo=https://github.com/${username}/${repo}"><img src="https://render.com/images/deploy-to-render-button.svg" alt="Deploy to Render"></a>`
  },
  {
    id: 'digitalocean',
    name: 'DigitalOcean',
    logo: 'Droplets',
    color: '#0080FF',
    deployUrl: (username: string, repo: string) => 
      `https://cloud.digitalocean.com/apps/new?repo=https://github.com/${username}/${repo}`,
    buttonMarkdown: (username: string, repo: string) => 
      `[![Deploy to DO](https://www.deploytodo.com/do-btn-blue.svg)](https://cloud.digitalocean.com/apps/new?repo=https://github.com/${username}/${repo})`,
    buttonHtml: (username: string, repo: string) => 
      `<a href="https://cloud.digitalocean.com/apps/new?repo=https://github.com/${username}/${repo}"><img src="https://www.deploytodo.com/do-btn-blue.svg" alt="Deploy to DO"></a>`
  },
  {
    id: 'cloudflare',
    name: 'Cloudflare Workers',
    logo: 'Cloud',
    color: '#F38020',
    deployUrl: (username: string, repo: string) => 
      `https://deploy.workers.cloudflare.com/?url=https://github.com/${username}/${repo}`,
    buttonMarkdown: (username: string, repo: string) => 
      `[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/${username}/${repo})`,
    buttonHtml: (username: string, repo: string) => 
      `<a href="https://deploy.workers.cloudflare.com/?url=https://github.com/${username}/${repo}"><img src="https://deploy.workers.cloudflare.com/button" alt="Deploy to Cloudflare Workers"></a>`
  },
  {
    id: 'codesandbox',
    name: 'CodeSandbox',
    logo: 'Box',
    color: '#151515',
    deployUrl: (username: string, repo: string) => 
      `https://codesandbox.io/p/github/${username}/${repo}`,
    buttonMarkdown: (username: string, repo: string) => 
      `[![Open in CodeSandbox](https://assets.codesandbox.io/github/button-edit-lime.svg)](https://codesandbox.io/p/github/${username}/${repo})`,
    buttonHtml: (username: string, repo: string) => 
      `<a href="https://codesandbox.io/p/github/${username}/${repo}"><img src="https://assets.codesandbox.io/github/button-edit-lime.svg" alt="Open in CodeSandbox"></a>`
  },
  {
    id: 'stackblitz',
    name: 'StackBlitz',
    logo: 'Zap',
    color: '#1389FD',
    deployUrl: (username: string, repo: string) => 
      `https://stackblitz.com/github/${username}/${repo}`,
    buttonMarkdown: (username: string, repo: string) => 
      `[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/${username}/${repo})`,
    buttonHtml: (username: string, repo: string) => 
      `<a href="https://stackblitz.com/github/${username}/${repo}"><img src="https://developer.stackblitz.com/img/open_in_stackblitz.svg" alt="Open in StackBlitz"></a>`
  },
{
  id: 'glitch',
  name: 'Glitch',
  logo: 'Fish',
  color: '#EC0F8B',
  deployUrl: (username: string, repo: string) =>
    `https://glitch.com/edit/#!/import/github/${username}/${repo}`,
  buttonMarkdown: (username: string, repo: string) =>
    `[![Remix on Glitch](https://img.shields.io/badge/Remix_on_Glitch-EC0F8B?logo=glitch&logoColor=white&style=for-the-badge)](https://glitch.com/edit/#!/import/github/${username}/${repo})`,
  buttonHtml: (username: string, repo: string) =>
    `<a
      class="bg-[#EC0F8B] text-white px-4 py-2 rounded flex items-center gap-2 hover:opacity-90"
      href="https://glitch.com/edit/#!/import/github/${username}/${repo}"
      target="_blank"
      rel="noopener noreferrer"
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 512 512" class="w-5 h-5">
        <path d="M277.7 139.9h112.6l-112.6 85.7 112.6 85.8H277.7v57.3L467 307.8V204.2L277.7 82.1v57.8zm-43.3 232.2V82.1L45 204.2v103.6l189.4 114.1v-57.8H121.7l112.7-85.8-112.7-85.7h112.7v103.5z"/>
      </svg>
      Remix on Glitch
    </a>`
},
 {
  id: 'firebase',
  name: 'Firebase Hosting',
  logo: 'Flame',
  color: '#FFA000',
  deployUrl: (username: string, repo: string) =>
    `https://console.firebase.google.com/project/_/hosting/sites`,
  buttonMarkdown: (username: string, repo: string) =>
    `[![Deploy to Firebase](https://img.shields.io/badge/Deploy_to_Firebase-FFA000?logo=firebase&logoColor=white&style=for-the-badge)](https://console.firebase.google.com/project/_/hosting/sites)`,
  buttonHtml: (username: string, repo: string) =>
    `<a
      class="bg-[#FFA000] text-white px-4 py-2 rounded flex items-center gap-2 hover:opacity-90 whitespace-nowrap text-sm"
      href="https://console.firebase.google.com/project/_/hosting/sites"
      target="_blank"
      rel="noopener noreferrer"
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 256 351" class="w-5 h-5 flex-shrink-0">
        <path d="M1.92 270.47L50.29 2.67c.57-3.17 4.76-4.06 6.42-1.26L105.44 99.7c.37.63 1.32.5 1.46-.2L124.55 2.4c.39-2.2 3.33-2.9 4.76-1.13l123.24 171.4c1.07 1.45.04 3.5-1.74 3.5H141.5c-.72 0-1.34.49-1.5 1.19L116.63 347.3c-.46 2.02-3.26 2.49-4.34.69L1.99 274.09a2 2 0 01-.07-3.62z"/>
      </svg>
      Deploy to Firebase
    </a>`
}
];

















