#!/usr/bin/env node
'use strict';
const shell = require('shelljs');
const path = require('path');
const config = require('./config');
const Log = require('./log');

const log = new Log();

var SWAGGER_UI_DIST = require("swagger-ui-dist").getAbsoluteFSPath();
var SHARED_UI_PATH = path.join(config.root, 'shared', config.uiRoot);
var SWAGGER_JSON_PATH = path.join(config.branchPath, 'swagger.json');

const getAssets = function() {
    shell.rm('-rf', SHARED_UI_PATH);
    shell.mkdir('-p', path.join(config.root, 'shared'));
    shell.cp('-R', SWAGGER_UI_DIST, SHARED_UI_PATH);
};

const setupUI = function() {
    getAssets()
    var uiPath = path.join(config.branchPath, config.uiRoot);
    shell.mkdir('-p', uiPath);
    log.log(`Copying Swagger UI index to '${uiPath}'`);
    shell.cp(path.join(SHARED_UI_PATH, 'index.html'), `${uiPath}/`);
    log.preview({
        'title': 'Swagger UI folder contents',
        'text': shell.ls(uiPath).stdout
    });
    log.log(`Updating API spec path for '${path.join(uiPath, 'index.html')}'`);
    shell.sed(
        '-i',
        /\.\//,
        `${path.relative(uiPath, SHARED_UI_PATH)}/`,
        [path.join(uiPath, 'index.html')]
    );
    var swagger_spec = require(`${SWAGGER_JSON_PATH}`);
    shell.sed(
        '-i',
        'url: "https://petstore.swagger.io/v2/swagger.json"',
        `spec: ${JSON.stringify(swagger_spec)}`,
        [path.join(uiPath, 'index.html')]
    );
};

setupUI()
module.exports.getAssets = getAssets;
module.exports.setupUI = setupUI;