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
      'apiSpecPath': '',
      'htmlOutfile': 'index.html',
      'yamlOutfile': 'openapi.yaml',
      'jsonOutfile': 'openapi.json'
    }
  ]
};

const constructBranchPath = (defaultBranch, currentBranch, root, branchPathBase) => {
  if (currentBranch == defaultBranch) {
    return root;
  } else {
    return path.join(root, branchPathBase, currentBranch.toLowerCase())
  }
};

const deployConfig = {
  branchPath: constructBranchPath(
    localConfig.defaultBranch,
    envConfig.branch,
    envConfig.root,
    localConfig.branchPathBase
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