import { execSync } from 'child_process';
import { statSync } from 'fs';

export default function getModifiedTime(filepath: string) {
  let lastModified = '';
  let dateCreated = '';

  try {
    // Get the last modified date (most recent commit)
    lastModified = execSync(`git log -1 --pretty="format:%cI" "${filepath}"`)
      .toString()
      .trim()
      .split('\n')[0];
  } catch {
    // Git not available or no commits yet
  }

  // Use FS as backup
  if (!lastModified) {
    lastModified = statSync(filepath).mtime.toISOString();
  }

  try {
    // Get the created date (first commit that introduced the file)
    dateCreated = execSync(
      `git log --diff-filter=A --follow --format=%aI -- "${filepath}"`,
    )
      .toString()
      .trim()
      .split('\n')[0];
  } catch {
    // Git not available or no commits yet
  }

  // Use FS as backup
  if (!dateCreated) {
    dateCreated = statSync(filepath).ctime.toISOString();
  }

  return { lastModified, dateCreated };
}
