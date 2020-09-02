import { merge } from 'lodash';
import origin from 'remote-origin-url';
import getRepoInfo from 'git-repo-info';
/*eslint no-process-env:0*/

var repoInfo = getRepoInfo();
repoInfo.branch = repoInfo.branch || process.env.TRAVIS_BRANCH || "undefined";

const env = process.env.NODE_ENV;
const repoOrigin = origin.sync();
const environment = merge(repoInfo, {
    env,
    repoOrigin
});

export default environment;
