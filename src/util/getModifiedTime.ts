import { execSync } from 'child_process';
import { statSync } from 'fs';

/**
 * Resolves the creation and last-modified timestamps for a content file.
 *
 * @param filepath File path passed to Git and filesystem lookups.
 * @returns An object containing ISO-8601 timestamps for the latest modification and the original creation date.
 * @throws {Error} Thrown when the file does not exist and the filesystem fallback cannot stat it.
 *
 * Side effects/runtime constraints: Executes synchronous Git commands, which can block
 * the Node.js event loop during build time. Falls back to filesystem timestamps when Git
 * metadata is unavailable, such as in shallow clones or uncommitted files.
 */
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

  // Builds still need deterministic timestamps outside a Git checkout.
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

  // ctime is the best local fallback when repository history cannot answer creation time.
  if (!dateCreated) {
    dateCreated = statSync(filepath).ctime.toISOString();
  }

  return { lastModified, dateCreated };
}
