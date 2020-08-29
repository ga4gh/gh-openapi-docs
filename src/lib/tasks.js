import Logger from '@lib/log';
import Config from '@lib/config';
import { fetchPages } from '@lib/gh-pages';
import bundleSpec from '@lib/bundle';
import { setupUI } from '@lib/redoc-ui';

const runTasks = (opts, di) => {
  let container = {};

  try {
    Object.assign(container, di);
    container.config = container.config || Config;

    container.log = container.log || new Logger();
    const { log } = container;

    log.info(`Preparing docs for API spec at '${container.config.apiSpecPath}' (${container.config.branch})`);
    fetchPages();
    bundleSpec();
    setupUI();

    log.log(`Done (in ${Math.floor(process.uptime())}s.)`);

    return { };
  } catch (err) {
    const { log } = container;
    log ? log.error(err.message || err) : console.error(err); // eslint-disable-line no-console
    throw err;
  }
};

export default runTasks;
