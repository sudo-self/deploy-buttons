/**
 * Validates a GitHub username according to GitHub's rules
 * @param username The username to validate
 * @returns Whether the username is valid
 */
export const isValidGithubUsername = (username: string): boolean => {
  // GitHub usernames allow alphanumeric characters and hyphens
  // Cannot have multiple consecutive hyphens
  // Cannot begin or end with a hyphen
  // Maximum is 39 characters
  const regex = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i;
  return regex.test(username);
};

/**
 * Validates a GitHub repository name according to GitHub's rules
 * @param repo The repository name to validate
 * @returns Whether the repository name is valid
 */
export const isValidGithubRepo = (repo: string): boolean => {
  // GitHub repo names can contain alphanumeric characters, hyphens, dots, and underscores
  // Cannot start with a dot
  // Cannot contain consecutive dots
  // Cannot end with a dot
  // Cannot contain spaces
  const regex = /^[a-z\d](?:[a-z\d]|[-_.](?=[a-z\d])){0,99}$/i;
  return regex.test(repo);
};

/**
 * Truncates a string to a certain length and adds ellipsis if needed
 * @param str The string to truncate
 * @param length The maximum length
 * @returns The truncated string
 */
export const truncate = (str: string, length: number): string => {
  if (str.length <= length) return str;
  return str.slice(0, length) + '...';
};