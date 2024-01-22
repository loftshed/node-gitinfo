const gitCommands = require('./gitCommands');
const fs = require('fs').promises;

/**
 * Retrieves git information by resolving promises from various git commands.
 *
 * @returns {Promise<Object>} A promise that resolves to an object containing git information such as branch name, commit ID, author name, author email, commit messages, and commit time.
 */
const getGitInfo = async () => {
  const gitPromises = {
    branch: gitCommands.getBranch(),
    commitId: gitCommands.getCommitId(),
    commitUserName: gitCommands.getCommitUserName(),
    commitUserEmail: gitCommands.getCommitUserEmail(),
    commitMessageFull: gitCommands.getCommitMessageFull(),
    commitMessageShort: gitCommands.getCommitMessageShort(),
    commitTime: gitCommands.getCommitTime(),
  };

  const gitInfo = {};
  for (const [key, promise] of Object.entries(gitPromises)) {
    gitInfo[key] = await promise;
  }
  return gitInfo;
};

/**
 * Formats the git information object into a string suitable for writing to a properties file.
 * Each git property is converted into a key-value pair separated by an equals sign,
 * with each pair on a new line.
 *
 * @param {Object} git - The object containing git information.
 * @returns {string} A formatted string representing the git properties.
 */
const formatGitInfo = (git) => {
  const properties = {
    'git.commit.id.abbrev': git.commitId.substring(0, 7),
    'git.commit.user.email': git.commitUserEmail,
    'git.commit.message.full': git.commitMessageFull.replace(/(?:\r\n|\r|\n)/g, '\\n'),
    'git.commit.id': git.commitId,
    'git.commit.message.short': git.commitMessageShort,
    'git.commit.user.name': git.commitUserName,
    'git.branch': git.branch,
    'git.commit.time': git.commitTime,
  };
  return Object.entries(properties)
    .map(([key, value]) => `${key}=${value}\n`)
    .join('');
};

/**
 * @param destinationPath   Directory to save git.properties file to (directory must already exist).
 */
const writeGitInfo = async (destinationPath) => {
  destinationPath = destinationPath || process.cwd();
  try {
    const git = await getGitInfo();
    const gitPropertiesFormatted = formatGitInfo(git);
    const destinationPathCleaned = destinationPath.replace(/\/?$/, '/');

    await fs.writeFile(`${destinationPathCleaned}git.properties`, gitPropertiesFormatted);
    console.log('[node-git-info] git.properties was successfully created.');
  } catch (err) {
    console.error("[node-git-info][ERROR]: can't create git.properties file.", err);
    throw err; // This will cause the promise to be rejected with the error
  }
};

module.exports = {
  write: writeGitInfo,
};
