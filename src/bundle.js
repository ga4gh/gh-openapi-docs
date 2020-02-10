#!/usr/bin/env node
'use strict';
const shell = require('shelljs');
const path = require('path');
const config = require('./config');
const Log = require('./log');

const log = new Log();

var SWAGGER_JSON_PATH = path.join(config.branchPath, 'swagger.json');
var SWAGGER_YAML_PATH = path.join(config.branchPath, 'swagger.yaml');

const bundleSpec = function() {
    shell.mkdir('-p', 'spec');
    shell.mkdir('-p', 'web_deploy');

    var specPath = path.join(config.root, config.apiSpecPath);
    shell.cp(specPath, 'spec/swagger.yaml');

    log.log("Bundling API spec...");
    shell.exec(
        `npm run swagger bundle --        -o ${SWAGGER_JSON_PATH}`,
        {silent:true}
    );
    shell.exec(
        `npm run swagger bundle -- --yaml -o ${SWAGGER_YAML_PATH}`,
        {silent:true}
    );
    shell.rm('-rf', 'spec');
};

bundleSpec()
// module.exports.bundleSpec = bundleSpec;