import { spawn } from 'child_process';

/* test utility methods */

const deleteFilesRecursivelyByName = (appRootDir, fileName) => {
  const shellSyntaxCommand = `find ${appRootDir} -name ${fileName} -type f | xargs rm -f`;
  spawn('sh', ['-c', shellSyntaxCommand], { stdio: 'inherit' });
};

export { deleteFilesRecursivelyByName };

/* end test utility methods */
