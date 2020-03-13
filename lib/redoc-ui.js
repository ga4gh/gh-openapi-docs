#!/usr/bin/env node
'use strict';
const shell = require('shelljs');
const path = require('path');
const config = require('./config');
const Log = require('./log');

const log = new Log();

var OPENAPI_YAML_PATH = path.join(config.branchPath, 'openapi.yaml');

const setupUI = function() {
    var uiPath = path.join(config.branchPath, config.docsRoot);
    shell.mkdir('-p', uiPath);
    var indexPath = path.join(uiPath, 'index.html');
    log.log(`Generating OpenAPI docs index at '${indexPath}'`);
    shell.exec(
        `npm run redoc -- ${OPENAPI_YAML_PATH} --output ${indexPath}`
    );
    log.preview({
        'title': 'OpenAPI docs folder contents',
        'text': shell.ls(uiPath).stdout
    });
};

module.exports.setupUI = setupUI;