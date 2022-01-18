import { merge } from 'lodash';
import path from 'path';
import envConfig from './environment'
import fs from 'fs';
import cliOpts from './cli';

/*eslint no-process-env:0*/

// All configurations will extend these options
// ============================================

const userConfig = fs.existsSync(cliOpts.config) ? JSON.parse(fs.readFileSync(cliOpts.config)) : {};
const localConfig = {
  docsRoot: userConfig.docsRoot || 'docs',
  uiRoot: userConfig.uiRoot || 'swagger-ui',
  redocRoot: userConfig.redocRoot || 'redoc-ui',
  redocTheme: userConfig.redocTheme || 'default',
  defaultBranch: userConfig.defaultBranch || 'master',
  branchPathBase: userConfig.branchPath || 'preview',
  contactUrl: userConfig.contactUrl || '',
  buildPages : userConfig.buildPages || [
    {
      'apiSpecPath': 'openapi/openapi.yaml',
      'htmlOutfile': 'index.html',
      'yamlOutfile': 'openapi.yaml',
      'jsonOutfile': 'openapi.json'
    }
  ],
  workingDir: process.env.PWD,
  outputDir: cliOpts.outputDir || 'publish'
};

const constructBranchPath = (workingDir, outputDir, branchPathBase, currentBranch) => {
  return path.join(workingDir, outputDir, branchPathBase, currentBranch.toLowerCase())
};

const deployConfig = {
  branchPath: constructBranchPath(
    localConfig.pwd,
    localConfig.outputDir,
    localConfig.branchPathBase,
    envConfig.branch
  )
};
// Export the config object based on the NODE_ENV
// ==============================================
const config = merge(
  localConfig,
  envConfig,
  deployConfig
);

export default config;