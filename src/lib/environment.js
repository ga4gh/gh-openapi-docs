import _ from 'lodash';
import origin from 'remote-origin-url';
import getRepoInfo from 'git-repo-info';
/*eslint no-process-env:0*/

var repoInfo = getRepoInfo();

const env = process.env.NODE_ENV;
const repoOrigin = origin.sync();
const environment = _.merge(repoInfo, {
    env,
    repoOrigin
});

export default environment;
