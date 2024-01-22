const fs = require('fs/promises');
const { existsSync } = require('fs');
const path = require('path');
const os = require('os');
const gitProperties = require('../../../lib/gitProperties.js');
const { expect, beforeAll, afterAll } = require('@jest/globals');

// Helper function to read the properties file
const readPropertiesFile = async (filePath) => {
  const content = await fs.readFile(filePath, 'utf8');
  return content.split('\n').reduce((acc, line) => {
    const [key, value] = line.split('=');
    acc[key] = value;
    return acc;
  }, {});
};

// Helper function to check the contents of the git.properties file
const checkGitPropertiesFileHasExpectedData = async (filePath) => {
  expect(existsSync(filePath)).toBe(true);

  const data = await readPropertiesFile(filePath);
  expect(data['git.commit.id.abbrev']).toBeDefined();
  expect(data['git.commit.user.email']).toBeDefined();
  expect(data['git.commit.message.full']).toBeDefined();
  expect(data['git.commit.id']).toBeDefined();
  expect(data['git.commit.message.short']).toBeDefined();
  expect(data['git.commit.user.name']).toBeDefined();
  expect(data['git.branch']).toBeDefined();
  expect(data['git.commit.time']).toBeDefined();
};

describe('executing write method', () => {
  const gitPropertiesFileName = 'git.properties';
  let tmpTestOutputFolder;
  let gitPropertiesExpectedDefaultFileName;

  beforeAll(async () => {
    tmpTestOutputFolder = await fs.mkdtemp(path.join(os.tmpdir(), 'git-properties-'));
    gitPropertiesExpectedDefaultFileName = path.join(process.cwd(), gitPropertiesFileName);
  });

  beforeEach(async () => {
    // Clean up the git.properties file before each test
    await fs.rm(gitPropertiesExpectedDefaultFileName, { force: true });
  });

  afterAll(async () => {
    // Clean up the temporary directory after all tests
    await fs.rm(tmpTestOutputFolder, { recursive: true, force: true });
  });

  it('should create a git.properties file', async () => {
    await gitProperties.write();
    await checkGitPropertiesFileHasExpectedData(gitPropertiesExpectedDefaultFileName);
  });

  it('should create a git.properties file in the destination directory given', async () => {
    await gitProperties.write(tmpTestOutputFolder);
    const gitPropertiesDestination = path.join(tmpTestOutputFolder, gitPropertiesFileName);
    await checkGitPropertiesFileHasExpectedData(gitPropertiesDestination);
  });

  it('should return an error status if destination directory given does not exist', async () => {
    const destinationPath = path.join(tmpTestOutputFolder, 'non_existent_directory');

    await expect(gitProperties.write(destinationPath)).rejects.toThrow();

    const gitPropertiesDestination = path.join(destinationPath, gitPropertiesFileName);
    expect(existsSync(gitPropertiesDestination)).toBe(false);
  });
});
