const _ = require('lodash');
const Logger = require('./log');
const Config = require('./config');
const { fetchPages } = require('./gh-pages');
const { bundleSpec } = require('./bundle');
// TODO: switch to setupUI exported from redoc-ui
const { setupUI } = require('./swagger-ui');

const runTasks = function(opts, di) {
  let container = {};

  try {
    Object.assign(container, di);
    container.config = container.config || Config;

    container.log = container.log || new Logger();
    const { log } = container;

    console.log(container.config);
    log.obtrusive(`Preparing docs for API spec at '${container.config.apiSpecPath}' (${container.config.branch})`);
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

module.exports = runTasks;