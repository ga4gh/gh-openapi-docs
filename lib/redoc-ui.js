#!/usr/bin/env node
'use strict';
const shell = require('shelljs');
const path = require('path');
const config = require('./config');
const Log = require('./log');

const log = new Log();

var SHARED_UI_PATH = path.join(config.root, 'shared', config.redocRoot);
var SWAGGER_YAML_PATH = path.join(config.branchPath, 'swagger.yaml');

const getAssets = function() {
    shell.rm('-rf', SHARED_UI_PATH);
    shell.mkdir('-p', SHARED_UI_PATH);
};

const setupUI = function() {
    getAssets()
    var uiPath = path.join(config.branchPath, config.redocRoot);
    shell.mkdir('-p', uiPath);
    var indexPath = path.join(uiPath, 'index.html');
    log.log(`Generating ReDoc UI index at '${indexPath}'`);
    shell.exec(
        `npm run redoc -- ${SWAGGER_YAML_PATH} --output ${indexPath}`
    );
    log.preview({
        'title': 'ReDoc UI folder contents',
        'text': shell.ls(uiPath).stdout
    });
};

// setupUI()
module.exports.getAssets = getAssets;
module.exports.setupUI = setupUI;