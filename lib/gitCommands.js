const { exec: execCallback } = require('child_process');
const { promisify } = require('util');

const exec = promisify(execCallback);

/**
 * Executes a git command and returns the trimmed output.
 * @param {string} command - The git command to execute.
 * @returns {Promise<string>} The trimmed output from the git command.
 */
const executeGitCommand = async (command) => {
  const result = await exec(command);
  return result.stdout.trim();
};

const gitCommands = {
  getBranch: () => executeGitCommand('git symbolic-ref HEAD | sed -e "s/refs\\/heads\\//"/'),
  getCommitId: () => executeGitCommand('git rev-parse HEAD'),
  getCommitUserName: () => executeGitCommand('git log -1 --pretty=format:%an'),
  getCommitUserEmail: () => executeGitCommand('git log -1 --pretty=format:%ae'),
  getCommitMessageFull: () => executeGitCommand('git log -1 --pretty=format:%B'),
  getCommitMessageShort: () => executeGitCommand('git log -1 --pretty=format:%s'),
  getCommitTime: async () => {
    const commitTimeSeconds = parseInt(
      await executeGitCommand('git log -1 --pretty=format:%ct'),
      10
    );
    const commitDate = new Date(commitTimeSeconds * 1000);
    return commitDate.toISOString();
  },
};

module.exports = gitCommands;
