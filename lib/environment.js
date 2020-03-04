const path = require('path');
const _ = require("lodash");
const origin = require('remote-origin-url');
const getRepoInfo = require("git-repo-info");
/*eslint no-process-env:0*/

var repoInfo = getRepoInfo();

const env = process.env.NODE_ENV;
const repoOrigin = origin.sync();

exports.default = _.merge(repoInfo, {
  env,
  repoOrigin
});
