#!/usr/bin/env node
'use strict';
const shell = require('shelljs');
const path = require('path');
const config = require('./config');
const Log = require('./log');

const log = new Log();

var OPENAPI_JSON_PATH = path.join(config.branchPath, 'openapi.json');
var OPENAPI_YAML_PATH = path.join(config.branchPath, 'openapi.yaml');

const bundleSpec = async function() {
    shell.mkdir('-p', 'spec');

    var specPath = path.join(config.root, config.apiSpecPath);
    var baseDir = path.dirname(specPath);
    shell.cp(specPath, 'spec/openapi.yaml');

    log.log("\nBundling API spec...");
    shell.exec(
        `npm run swagger bundle --        -o ${OPENAPI_JSON_PATH}`
    );
    shell.exec(
        `npm run swagger bundle -- --yaml -o ${OPENAPI_YAML_PATH}`
    );
    shell.rm('-rf', 'spec');
};

module.exports.bundleSpec = bundleSpec;