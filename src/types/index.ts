export interface DeployPlatform {
  id: string;
  name: string;
  logo: string;
  color: string;
  deployUrl: (username: string, repo: string) => string;
  buttonMarkdown: (username: string, repo: string) => string;
  buttonHtml: (username: string, repo: string) => string;
}

export interface FormState {
  username: string;
  repo: string;
}