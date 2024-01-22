const gitProperties = require('./lib/gitProperties.js');

/**
 * Processes command line arguments starting from the third argument.
 * @returns {Object} The options object with the directory path if provided.
 */
const processArguments = () => {
  const args = process.argv.slice(2);
  const options = {};

  args.forEach((arg, index, array) => {
    if (arg.startsWith('-d') || arg.startsWith('--directory')) {
      options.directory = array[index + 1];
    }
  });

  return options;
};

const onWriteComplete = (writeSuccess) => {
  process.exit(writeSuccess ? 0 : 1);
};

/**
 * Executes the main functionality of the script.
 * It processes command line arguments to configure options and writes the git.properties file.
 */
const execute = function () {
  const options = processArguments();
  gitProperties.write(options.directory, onWriteComplete);
};

execute();

module.exports = execute;
