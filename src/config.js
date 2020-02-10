const _ = require('lodash');
const path = require('path');
const envConfig = require('./environment').default
/*eslint no-process-env:0*/

// All configurations will extend these options
// ============================================
const userConfig = require(`${envConfig.root}/.spec-docs.json`) || {};
localConfig = {
  apiSpecPath: userConfig.apiSpecPath || '',
  docsRoot: userConfig.docsRoot || 'docs',
  uiRoot: userConfig.uiRoot || 'swagger-ui',
  defaultBranch: userConfig.defaultBranch || 'master',
  branchPathBase: userConfig.branchPath || 'preview',
  contactUrl: userConfig.contactUrl || ''
};

const constructBranchPath = function(defaultBranch, currentBranch, root, branchPathBase) {
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
const config = _.merge(
  localConfig,
  envConfig,
  deployConfig
);

console.log(config);
module.exports = config;
